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

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="arrow-up" /> Sort Ascending
    </Menu.Item>
    <Menu.Item key="1">
      <Icon type="arrow-down" /> Sort Descending
    </Menu.Item>
    <SubMenu key="sub1" title={[<Icon type="filter" />, <span>Filter using</span>]}>
      <MenuItemGroup>
        <Menu.Item key="1">Equal</Menu.Item>
        <Menu.Item key="2">Not equal</Menu.Item>
        <Menu.Item key="3">Less than</Menu.Item>
        <Menu.Item key="4">Greater than</Menu.Item>
        <Menu.Item key="5">Less than or equal to</Menu.Item>
        <Menu.Item key="6">Greater than or equal to</Menu.Item>
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
    }
  }
  setFilterState(key, value) {
    const filters = Object.assign({}, this.state.filters);
    filters[key] = value;
    this.setState({ filters });
  }
  get filterHeaders() {
    const { content } = this.props;
    const genHead = []
    const filterHead = []
    if (content.length > 0) {
      const head = Object.keys(content[0])
      head.forEach(item => {
        let header;
        let filter = (<td></td>)
        if (item == 'id') {
          header = (<td key= {item} style={{display: 'none'}}>{item}</td>);
        } else {
          header = (<td key= {item}><Dropdown.Button overlay={menu}>{item}</Dropdown.Button></td>);
          if (item.includes('Date')) {
            filter = (
              <td style={{ margin: 0, padding: 0 }}>
                <DatePicker
                  format="DD/MM/YYYY"
                  onChange={date => this.setFilterState([item], date ? date.format('DD/MM/YYYY') : '')}
                  />
              </td>
            );
          } else if (['Document Status', 'Salesperson'].includes(item)) {
            filter = (
              <td style={{ margin: 0, padding: 0 }}>
                <Select
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
                <input onChange={e => this.setFilterState([item], e.target.value)} className="filter-input" />
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
    filterHead.unshift((<td></td>))
    return [<tr>{filterHead}</tr>, <tr>{genHead}</tr>]
  }
  get headers() {
    const { content } = this.props;
    const genHead = []
    if (content.length > 0) {
      const head = Object.keys(content[0])
      head.forEach(item => {
        let header;
        if (item == 'id') {
          header = (<td key= {item} style={{display: 'none'}}>{item}</td>);
        } else {
          header = (<td key= {item}>{item}</td>);
        }
        genHead.push(header);
      })
    }
    return [<tr>{genHead}</tr>]
  }
  get filterBody() {
    return this.convertContent(this.props.content.filter(this.filterRow.bind(this)), true)
  }
  get body() {
    return this.convertContent(this.state.selected.map(id => this.props.content.find(c => c.id === id)));
  }
  filterRow(row) {
    const result = Object.keys(row).map(key => fuzzysearch((this.state.filters[key] || '').toLowerCase(), row[key].toLowerCase()));
    return result.every(r => r === true);
  }
  select(id) {
    this.setState({
      selected: this.state.selected.concat(id).reduce(getUnique, []),
    })
  }
  convertContent(content, isParent = false){
    var result = []
    for(var i = 0 ; i < content.length ; i++){
      let eachRow = this._getEachVal(content[i], isParent)
      let { id } = content[i]
      result.push(
        <tr className = {this.props.type =="Quotation"||this.props.type == "Sales Order"||this.props.type == "Purchase Order" ? 'clickable-item':''}
          key={i}>{eachRow}</tr>
      )
    }
    return result
  }
  _getEachVal(obj, isParent){
    const result = [];
    const { id } = obj;
    for(var o in obj){
      if (o == 'id') {
        result.push((<td key={o} style={{display: 'none'}}>{obj[o]}</td>))
      } else {
        result.push((<td key={o}>{obj[o]}</td>))
      }
    }
    if(isParent === true){
      result.unshift((<td key='checkbox'><input
      onClick={() => {
        const isSelected = this.state.selected.includes(id)
        console.log(isSelected)
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
    return result
  }
  render () {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <i className="icon-sort-alpha-asc" />stststt\
            <span className="icon-sort-alpha-asc"> </span>
          <table>
            <thead>
              {this.filterHeaders}
            </thead>
            <tbody>
              {this.filterBody}
            </tbody>
          </table>
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
