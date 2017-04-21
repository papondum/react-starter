import React, { PropTypes } from 'react'
import { Table, DatePicker, LocaleProvider, Select, Dropdown, Menu, Icon } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'antd/dist/antd.min.css'
import moment from 'moment'
import fuzzysearch from 'fuzzysearch';
import { post } from '../../../utils'

const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const OverlayMenu = ({ onClick, columns, unselected, isSorting }) => (
  <Menu key="menu" onClick={onClick} selectedKeys={[]}>
    <Menu.Item key="asc"><Icon type="arrow-up" /> Sort Ascending</Menu.Item>
    <Menu.Item key="desc"><Icon type="arrow-down" /> Sort Descending</Menu.Item>
    {isSorting && <Menu.Item key="clear"><Icon /> Clear Sort</Menu.Item>}
    <SubMenu key="filter" title={[<Icon type="filter" />, <span>Filter using</span>]}>
      <MenuItemGroup key="sub">
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

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      selected: [],
      columns: props.columns,
      columnActive: null,
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
  sortingMenu(column, value) {
    if (value.key === 'clear') {
      return this.setState({
        columnActive: null,
        bodyFilters: Object.assign(this.state.bodyFilters, { sorting: { key: '', sort: 'asc'} })
      })
    }
    if (value.keyPath.includes('filter')) {
      const { filters } = this.state.bodyFilters
      if (filters[column] === value.key) {
        const newFilters = Object.keys(filters).filter(key => key !== column).reduce((p, c) => Object.assign(p, c) , {})
        return this.setState({
          columnActive: null,
          bodyFilters: Object.assign(this.state.bodyFilters, { filters: newFilters })
        })
      }
      return this.setState({
        columnActive: null,
        bodyFilters: Object.assign(this.state.bodyFilters, { filters: { ...this.state.bodyFilters.filters, [column]: value.key} })
      })
    } else if (value.keyPath.includes('columns')) {
      const { columns } = this.state.bodyFilters;
      if (columns.includes(value.key)) {
        return this.setState({
          columnActive: null,
          bodyFilters: Object.assign(this.state.bodyFilters, { columns: columns.filter(c => c !== value.key) })
        })
      }
      return this.setState({
        columnActive: null,
        bodyFilters: Object.assign(this.state.bodyFilters, { columns: columns.concat(value.key).reduce(getUnique, []) })
      })
    }
    return this.setState({
      columnActive: null,
      bodyFilters: Object.assign(this.state.bodyFilters, { sorting: { key: column, sort: value.key } })
    })
  }

  get filterBody() {
    return this.props.content
    .filter(this.filterRow.bind(this))
    .map(row => ({ ...row, key: row.id }))
    .sort(this.sorting.bind(this));
  }
  filterRow(row) {
    const result = Object.keys(row).map(key => this.filterColumn(row, key))
    return result.every(r => r === true);
  }
  filterColumn(row, key) {
    const { filters } = this.state.bodyFilters;
    const type = filters[key];
    if(!type) return fuzzysearch((this.state.filters[key] || '').toString(), (row[key] || '').toString())
    switch (type) {
      case 'equal': {
        return row[key] === (this.state.filters[key] || '').toString()
      }
      case 'not equal': {
        return row[key] !== (this.state.filters[key] || '').toString()
      }
      case 'less than': {
        return row[key] < (this.state.filters[key] || '').toString()
      }
      case 'greater than': {
        return row[key] > (this.state.filters[key] || '').toString()
      }
      case 'less than or': {
        return row[key] <= (this.state.filters[key] || '').toString()
      }
      case 'greater than or': {
        return row[key] >= (this.state.filters[key] || '').toString()
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
      return a[key].toString().localeCompare(b[key].toString());
    } else {
      return b[key].toString().localeCompare(a[key].toString());
    }
  }
  renderColumn(column) {
    if (column.includes('Date') || column.includes('ETA') || column.includes('ETD')) {
      return <DatePicker
        value={this.state.filters[column] && moment(this.state.filters[column], 'YYYY-MM-DD')}
        format="DD/MM/YYYY"
        onChange={date => this.setFilterState([column], date ? date.format('YYYY-MM-DD') : '')}
        />
    }
    if (['Document Status', 'Salesperson', 'Status'].includes(column)) {
      return <Select
        style={{ width: 300 }}
        value={this.state.filters[column]}
        onChange={v => this.setFilterState([column], v || '')}
        >
        {this.props.content.reduce((p, c) => p.includes(c[column]) ? p : p.concat(c[column]), []).map(c => <Option key = {c} value={c}>{c}</Option>)}
      </Select>
    }
    return <input
      ref={x => this.inputs[column] = x}
      onKeyPress={e => {
        if (e.which === 13) {
          this.setFilterState([column], e.target.value)
        }
      }}
      className="filter-input" />
  }
  get columns() {
    const filterColumns = this.state.bodyFilters.columns
    const columns = this.props.columns.filter(column => !filterColumns.includes(column))
    return columns.map((column, index) => ({
      title: (
        <div key = {index}>
          <div>
            {this.renderColumn(column)}
          </div>
          <div className="column-title">
            {column}
            {this.state.bodyFilters.sorting.key === column && <Icon type={this.state.bodyFilters.sorting.sort === 'asc' ? 'arrow-up' : 'arrow-down'} />}
            <div className={this.state.columnActive === column ? "column-icon active" : "column-icon"}>
              <Dropdown
                trigger={['click']}
                placement="bottomLeft"
                onVisibleChange={isVisible => this.setState({ columnActive: isVisible ? column : null })}
                overlay={<OverlayMenu
                  key={column}
                  isSorting={this.state.bodyFilters.sorting.key === column }
                  onClick={e => this.sortingMenu(column, e)}
                  columns={this.state.columns}
                  unselected={this.state.bodyFilters.columns} />}
                  ><div className="icon"><Icon type="caret-down" /></div>
              </Dropdown>
            </div>
          </div>
        </div>
      ),
      dataIndex: column,
      key: column,
      width: `${1 / columns.length * 100}%`,
      onCellClick: record => this.props.rowClicked(record.id),
      render: (t, record) => index === 0 ? (
        <div key={t}>
          <input
            onClick={() => this.props.toggleItem(record)}
            type='checkbox'
            checked={this.props.selected.includes(record.id)}
            />
          <span style={{ marginLeft: 10 }}>{t}</span>
        </div>
      ) : <div key={t}>{t}</div>
    }))
    .concat({
      title: <div><div><Icon onClick={this.clearFilter.bind(this)} style={{ cursor: 'pointer' }} type="filter" /></div><br /></div>,
      render: () => ''
    })
  }
  render () {
    return (
      <LocaleProvider locale={enUS}>
        <div>
          <Table
            pagination={false}
            scroll={{ x: 120, y: this.props.subContent.length > 0 ? '40vh' : '73vh' }}
            columns={this.columns}
            dataSource={this.filterBody}
            />
          {this.props.subContent.length > 0 &&
            <div className="subcontent-table">
              <div className='action-bar' style={{ paddingBottom: 10 }}>
                <h2 style={{ marginTop: 0 }}>{this.props.header}</h2>
              </div>
              <Table
                pagination={false}
                scroll={{ x: 120, y: '20vh' }}
                columns={Object.keys(this.props.subContent[0]).map(key => ({
                  title: <div style={{ padding: '5px 5px',
                    border: '0.5px #ccc solid',
                  }}>{key}</div>,
                  key,
                  dataIndex: key,
                  width: `${1/Object.keys(this.props.subContent[0]).length * 100}%`
                }))}
                dataSource={this.props.subContent}
                />
            </div>
          }
        </div>
      </LocaleProvider>
    )
  }
}


const getUnique = (p, c) => {
  if (p.includes(c)) return p;
  return p.concat(c);
}

export default CustomTable;
