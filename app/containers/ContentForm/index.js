import React from 'react';
import fuzzysearch from 'fuzzysearch';
import './style.scss';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from './Table';
import { post } from '../../../utils'

// Bob Test

class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      subContent: [],
      type: '',
    }
  }
  get selectedId() {
    return this.state.selected.map(record => record.id)
  }
  componentWillReceiveProps(nextProps){
    if(this.state.type !== nextProps.type){
      this.table && this.table.clearFilter()
      this.setState({ selected:[], subContent: [], type: nextProps.type })
    }
  }
  toggleItem(item) {
    const stateSelected = this.state.selected
    let selected
    if (this.selectedId.includes(item.id)) {
      selected = stateSelected.filter(s => s.id !== item.id)
    } else {
      selected = stateSelected.concat(item).reduce(getUnique, [])
    }
    this.setState({
      selected,
    }, () => {
      this.props.setSelected(this.state.selected)
      if (this.state.selected[0]) {
        this.props.checkedSingleItem(this.state.selected[0].id || null)
      } else {
        this.props.checkedSingleItem(null)
      }
    })
  }
  rowClicked(id) {
    switch (this.props.type) {
      case 'Delivery Order': {
        return post('/api/inventory/do/line', {'inventory_id':id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Good Receipt': {
        //post('/api/purchase/line', {'purchase_id':id})
        return post('/api/inventory/gr/line', {'good_receipt_id':id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Choose GoodReceipt': {
        return post('/api/purchase/line', {'purchase_id':id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      default: return this.setState({ subContent: [] })
    }
  }

  get subContentHeader() {
    switch (this.props.type) {
      case 'Delivery Order': return 'Delivery Order Line(s)'
      case 'Good Receipt': return 'Good Receipt Line(s)'
      case 'Choose GoodReceipt': return 'Purchase Line(s)'
      default: return ''
    }
  }
  get columns() {
    if (this.props.content.length === 0) {
      return []
    }
    return Object.keys(this.props.content[0]).filter(key => key !== 'id')
  }
  render() {
    if (this.props.content.length === 0) {
      return <div></div>
    }
    return (<div>
        <Table
            ref={table => this.table = table}
            toggleItem={item => this.toggleItem(item)}
            selected={this.selectedId}
            header={this.subContentHeader}
            rowClicked={id => this.rowClicked(id)}
            content={this.props.content || []}
            columns={this.columns}
            subContent={this.state.subContent}
            type={this.props.type}
            isFromCreate= {this.props.isFromCreate}
        />
    </div>)
  }
}
function mapStateToProps(state) {
  return {
    deleteCall: state.deleteCall
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch)
}

const getUnique = (p, c) => {
  if (p.includes(c)) return p;
  return p.concat(c);
}

export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(ContentForm)
