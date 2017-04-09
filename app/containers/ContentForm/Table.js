import React, { PropTypes } from 'react'
import { DatePicker, LocaleProvider, Select, Dropdown, Menu, Icon } from 'antd';
import './fontIcon/style.css'
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.min.css'
import moment from 'moment'
import fuzzysearch from 'fuzzysearch';

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
      columns: [],
      bodyFilters: {
        sorting: {
          key: '',
          sort: 'asc',
        },
        filter: {
          key: '',
          type: '',
        },
        columns: ['id'],
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {
    var $table = $('table.scroll'),
    $bodyCells = $table.find('thead tr:first').children(),
    colWidth;
    console.log($bodyCells)

    // Adjust the width of thead cells when window resizes
    $(window).resize(function() {

      // Get the tbody columns width array

      colWidth = $bodyCells.map(function() {
        return $(this).width();
      })
      // Set the width of thead columns
      $table.find('tbody tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
      });
      $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
      });
    }).resize(); // Trigger resize handler
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.content.length > 0) {
      this.setState({
        columns: Object.keys(nextProps.content[0]).map(key => key).filter(key => key !== 'id'),
      })
    }
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
    this.setState({
      bodyFilters: {
        sorting: {
          key: '',
          sort: 'asc',
        },
        filter: {
          key: '',
          type: '',
        },
        columns: ['id'],
      },
      filters: {},
    })
  }
  sortingMenu(key, value) {
    if (value.keyPath.includes('filter')) {
      this.setState({
        bodyFilters: Object.assign(this.state.bodyFilters, { filter: { key, type: value.key } })
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
                  value={this.state.filters[item] && moment(this.state.filters[item], 'DD/MM/YYYY')}
                  format="DD/MM/YYYY"
                  onChange={date => this.setFilterState([item], date ? date.format('DD/MM/YYYY') : '')}
                  />
              </td>
            );
          } else if (['Document Status', 'Salesperson'].includes(item)) {
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
                <input value={this.state.filters[item] || ''} onChange={e => this.setFilterState([item], e.target.value)} className="filter-input" />
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
  get headers() {
    const { content } = this.props;
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
    .filter(this.filterColumn.bind(this))
    .sort(this.sorting.bind(this))
    return this.convertContent(rows, true)
  }
  get body() {
    return this.convertContent(this.state.selected.map(id => this.props.content.find(c => c.id === id)));
  }
  filterRow(row) {
    const result = Object.keys(row).map(key => fuzzysearch((this.state.filters[key] || '').toLowerCase(), row[key].toLowerCase()));
    return result.every(r => r === true);
  }
  filterColumn(row) {
    const { filter } = this.state.bodyFilters;
    if (filter.key === '') {
      return true;
    }
    const { key, type } = filter;
    switch (type) {
      case 'equal': {
        return row[key] === this.state.filters[key]
      }
      case 'not equal': {
        return row[key] !== this.state.filters[key]
      }
      case 'less than': {
        return row[key] < this.state.filters[key]
      }
      case 'greater than': {
        return row[key] > this.state.filters[key]
      }
      case 'less than or': {
        return row[key] <= this.state.filters[key]
      }
      case 'greater than or': {
        return row[key] >= this.state.filters[key]
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
        const isSelected = this.state.selected.includes(id)
        if (isSelected) {
          this.setState({ selected: this.state.selected.filter(s => s !== id) });
        } else {
          this.select(id);
        }
      }}
      type='checkbox'
      value={obj.id}
      checked={this.state.selected.includes(obj.id)}
      /></td>))
    }
    result.push(<td></td>)
    return result
  }
  render () {
    console.log(this.props.content)
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <div>
            <table className="scroll">
              <thead>
                {this.filterHeaders}
              </thead>
              <tbody>
                {this.filterBody}
              </tbody>
            </table>
          </div>
          <div className='action-bar'>
            <h2>Purchase Order Line(s)</h2>
          </div>
          <table>
            <thead>
              {this.headers}
            </thead>
            <tbody>
              {this.body}
            </tbody>
          </table>
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
