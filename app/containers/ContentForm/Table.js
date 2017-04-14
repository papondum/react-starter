import React, { PropTypes } from 'react'
import { DatePicker, LocaleProvider, Select, Dropdown, Menu, Icon } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.min.css'
import moment from 'moment'
import fuzzysearch from 'fuzzysearch';
import { post } from '../../../utils'

const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const OverlayMenu = ({ onClick, columns, unselected }) => (
  <Menu onClick={onClick}>
    <Menu.Item key="asc"><Icon type="arrow-up" /> Sort Ascending</Menu.Item>
    <Menu.Item key="desc"><Icon type="arrow-down" /> Sort Descending</Menu.Item>
    <SubMenu key="filter" title={[<Icon type="filter" />, <span>Filter using</span>]}>
      <MenuItemGroup>
        <Menu.Item key="equal">Equal</Menu.Item>
        <Menu.Item key="not equal">Not equal</Menu.Item>
        <Menu.Item key="less than">Less than</Menu.Item>
        <Menu.Item key="greater than">Greater than</Menu.Item>
        <Menu.Item key="less than or">Less than or equal to</Menu.Item>
        <Menu.Item key="greater than or">Greater than or equal to</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    <SubMenu key="columns" title={[<Icon type="layout" />, <span>Column</span>]}>
      <MenuItemGroup>
        {columns.map(column => {
          return <Menu.Item key={column}><input type="checkbox" checked={!unselected.includes(column)} /> {column}</Menu.Item>
        })}
      </MenuItemGroup>
    </SubMenu>
  </Menu>
);

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      selected: [],
      columns: props.columns,
      bodyFilters: {
        sorting: {
          key: '',
          sort: 'asc',
        },
        filters: {},
        columns: ['id'],
      }
    }
    this.inputs = {}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
    })
  }
  componentDidMount() {
    $('.table-wrapper > table').floatThead({
      autoReflow: true,
      position: 'fixed'
    })
    $('.table-content-wrapper > table').floatThead({
      autoReflow: true,
      position: 'fixed'
    })
  }
  componentDidUpdate(prevProps, prevState) {
    $('.table-content-wrapper > table').floatThead('destroy')
    $('.table-content-wrapper > table').floatThead({
      autoReflow: true,
      position: 'fixed'
    })
  }

  getSelected() {
    return this.state.selected;
  }
  setFilterState(key, value) {
    const filters = Object.assign({}, this.state.filters);
    filters[key] = value;
    this.setState({ filters });
  }
  clearFilter() {
    this.state.columns.forEach((column) => {
      if(this.inputs[column]) {
        this.inputs[column].value = ''
      }
    })
    this.setState({
      bodyFilters: {
        sorting: {
          key: '',
          sort: 'asc',
        },
        filters: {},
        columns: ['id'],
      },
      filters: {},
    })
  }
  sortingMenu(key, value) {
    if (value.keyPath.includes('filter')) {
      this.setState({
        bodyFilters: Object.assign(this.state.bodyFilters, { filters: { ...this.state.bodyFilters.filters, [key]: value.key} })
      })
    } else if (value.keyPath.includes('columns')) {
      const { columns } = this.state.bodyFilters;
      if (columns.includes(value.key)) {
        this.setState({
          bodyFilters: Object.assign(this.state.bodyFilters, { columns: columns.filter(c => c !== value.key) })
        })
      } else {
        this.setState({
          bodyFilters: Object.assign(this.state.bodyFilters, { columns: columns.concat(value.key).reduce(getUnique, []) })
        })
      }
    } else {
      this.setState({
        bodyFilters: Object.assign(this.state.bodyFilters, { sorting: { key, sort: value.key } })
      })
    }
  }
  get filterHeaders() {
    const { content } = this.props;
    const genHead = []
    const filterHead = []
    if (content.length > 0) {
      const head = Object.keys(content[0]).filter(key => !this.state.bodyFilters.columns.includes(key))
      head.forEach(item => {
        let header;
        let filter;
        if (item == 'id') {
          // header = (<td key= {item} style={{display: 'none'}}>{item}</td>);
        } else {
          header = (
            <td key= {item}>
              <Dropdown.Button overlay={<OverlayMenu onClick={e => this.sortingMenu(item, e)} columns={this.state.columns} unselected={this.state.bodyFilters.columns} />}>{item}</Dropdown.Button>
            </td>
          );
          if (item.includes('Date')) {
            filter = (
              <td style={{ margin: 0, padding: 0 }}>
                <DatePicker
                  value={this.state.filters[item] && moment(this.state.filters[item], 'YYYY-MM-DD')}
                  format="DD/MM/YYYY"
                  onChange={date => this.setFilterState([item], date ? date.format('YYYY-MM-DD') : '')}
                  />
              </td>
            );
          } else if (['Document Status', 'Salesperson', 'Status'].includes(item)) {
            filter = (
              <td style={{ margin: 0, padding: 0 }}>
                <Select
                  value={this.state.filters[item]}
                  onChange={v => this.setFilterState([item], v || '')}
                  allowClear
                  >
                  {content.reduce((p, c) => p.includes(c[item]) ? p : p.concat(c[item]), []).map(c => <Option value={c}>{c}</Option>)}
                </Select>
              </td>
            )
          } else {
            filter = (
              <td style={{ margin: 0, padding: 0 }}>
                <input
                  ref={x => this.inputs[item] = x}
                  onKeyPress={e => {
                    if (e.which === 13) {
                      this.setFilterState([item], e.target.value)
                    }
                  }}
                  className="filter-input" />
              </td>
            );
          }
        }
        filterHead.push(filter)
        genHead.push(header);
      })
    }
    genHead.unshift(
      <td key='checkbox'>
        <input
          onClick={() => {
            const isChecked = this.state.selected.length === this.props.content.length;
            if (isChecked) {
              this.setState({ selected: [] })
            } else {
              this.setState({ selected: this.props.content.map(c => c.id) })
            }
          }}
          type='checkbox'
          checked={this.state.selected.length === this.props.content.length}
          />
      </td>
    )
    filterHead.push((<td><Icon onClick={this.clearFilter.bind(this)} style={{ cursor: 'pointer' }} type="filter" /></td>))
    filterHead.unshift((<td></td>))
    genHead.push(<td></td>)
    return [<tr className="head">{filterHead}</tr>, <tr className="head">{genHead}</tr>]
  }
  get headersContent() {
    const content = this.props.subContent;
    const genHead = []
    if (content.length > 0) {
      const head = Object.keys(content[0]).filter(key => !this.state.bodyFilters.columns.includes(key))
      head.forEach(item => {
        let header;
        if (item == 'id') {
          // header = (<td key= {item} style={{display: 'none'}}>{item}</td>);
        } else {
          header = (<td key= {item}>{item}</td>);
        }
        genHead.push(header);
      })
    }
    return [<tr>{genHead}</tr>]
  }
  get filterBody() {
    const rows = this.props.content
    .filter(this.filterRow.bind(this))
    // .filter(this.filterColumn.bind(this))
    .sort(this.sorting.bind(this))
    console.log(rows)
    return this.convertContent(rows, true)
  }
  get bodySubContent() {
    const content = this.props.subContent;
    return this.convertContent(content);
  }
  filterRow(row) {
    // const result = Object.keys(row).map(key => fuzzysearch((this.state.filters[key] || '').toString(), (row[key] || '').toString()));
    const result = Object.keys(row).map(key => this.filterColumn(row, key))
    return result.every(r => r === true);
    // return true;
  }
  filterColumn(row, key) {
    const { filters } = this.state.bodyFilters;

    const type = filters[key];
    if(!type) return fuzzysearch((this.state.filters[key] || '').toString(), (row[key] || '').toString())
    switch (type) {
      case 'equal': {
        return row[key] === this.state.filters[key].toString()
      }
      case 'not equal': {
        return row[key] !== this.state.filters[key].toString()
      }
      case 'less than': {
        return row[key] < this.state.filters[key].toString()
      }
      case 'greater than': {
        return row[key] > this.state.filters[key].toString()
      }
      case 'less than or': {
        return row[key] <= this.state.filters[key].toString()
      }
      case 'greater than or': {
        return row[key] >= this.state.filters[key].toString()
      }
      default: return true
    }
  }
  sorting(a, b) {
    const { sorting } = this.state.bodyFilters;
    if (sorting.key === '') {
      return true;
    }
    const { key, sort } = sorting;
    if (sort === 'asc') {
      return a[key].localeCompare(b[key]);
    } else {
      return b[key].localeCompare(a[key]);
    }
  }
  select(id) {
    this.setState({
      selected: this.state.selected.concat(id).reduce(getUnique, []),
    })
  }
  convertContent(content, isParent = false) {
    return content.map(row => {
      let eachRow = this._getEachVal(row, isParent);
      return <tr className = {this.props.type =="Quotation"||this.props.type == "Sales Order"||this.props.type == "Purchase Order" ? 'clickable-item':''}
        onClick={() => this.props.rowClicked(row.id)}
        key={row.id}>{eachRow}</tr>
    });
  }
  _getEachVal(obj, isParent){
    const result = [];
    const { id } = obj;
    const columns = Object.keys(obj).filter(key => !this.state.bodyFilters.columns.includes(key))
    columns.forEach(column => {
      if (column === 'id') {
        // result.push((<td key={o} style={{display: 'none'}}>{obj[o]}</td>))
      } else {
        result.push((<td key={column}>{obj[column]}</td>))
      }
    })
    if(isParent === true){
      result.unshift((<td key='checkbox'><input
      onClick={() => {
        this.setState({ editItem: obj.id })
        this.props.checkedSingleItem(obj.id)
      }}
      type='checkbox'
      checked={this.state.editItem === obj.id}
      /></td>))
    }
    result.push(<td></td>)
    return result
  }
  render () {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <div
            style={this.props.subContent.length === 0 ? { height: '80vh' } : null}
            className="table-wrapper"
            >
            <table className="scroll">
              <thead>
                {this.filterHeaders}
              </thead>
              <tbody>
                {this.filterBody}
              </tbody>
            </table>
          </div>
          {this.props.subContent.length > 0 && <div>
            <div className='action-bar'>
              <h2>{this.props.header}</h2>
            </div>
            <div className="table-content-wrapper">
              <table className="scroll">
                <thead>
                  {this.headersContent}
                </thead>
                <tbody>
                  {this.bodySubContent}
                </tbody>
              </table>
            </div>
          </div>}
        </div>
      </LocaleProvider>
    )
  }
}

const getUnique = (p, c) => {
  if (p.includes(c)) return p;
  return p.concat(c);
}

export default Table;
