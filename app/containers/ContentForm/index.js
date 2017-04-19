import React from 'react';
import fuzzysearch from 'fuzzysearch';
import './style.scss';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from './Table';
import { post } from '../../../utils'
import * as DeleteActions from '../../actions/deleteCall'

class ContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      subContent: [],
    }
  }
  get selectedId() {
    return this.state.selected.map(record => record.id)
  }
  componentWillReceiveProps(nextProps){
    if(this.props.type !== nextProps.type){
      this.setState({ selected:[], subContent: [] })
    }
    if(nextProps.deleteCall.userAcc === 'active'){
      let obj = { user_id: this.selectedId }
      this.props.deleteItem(obj, 'User account')
    }
    if(nextProps.deleteCall.userRole === 'active'){
      let obj = { role_id: this.selectedId }
      this.props.deleteItem(obj, 'User role')
    }
    if(nextProps.deleteCall.customer === 'active'){
      let obj = { customer_id:this.selectedId }
      this.props.deleteItem(obj, 'Customer')
    }
    if(nextProps.deleteCall.supplier === 'active'){
      let obj = { supplier: this.selectedId }
      this.props.deleteItem(obj, 'Supplier')
    }
    if(nextProps.deleteCall.price === 'active'){
      let obj = { pricelist_id:  this.selectedId }
      this.props.deleteItem(obj, 'Price list')
    }
    if(nextProps.deleteCall.product === 'active'){
      let obj = { product_id:  this.selectedId }
      this.props.deleteItem(obj, 'Product')
    }
    if(nextProps.deleteCall.brand === 'active'){
      let obj = { brand_id: this.selectedId }
      this.props.deleteItem(obj, 'Brand')
    }
    if(nextProps.deleteCall.film === 'active'){
      let obj = { film_id: this.selectedId }
      this.props.deleteItem(obj, 'Film Type')
    }
    if(nextProps.deleteCall.grade === 'active'){
      let obj = { grade_id: this.selectedId }
      this.props.deleteItem(obj, 'Grade')
    }
    if(nextProps.deleteCall.quotation === 'active'){
      let obj = { quotation_id: this.selectedId }
      this.props.deleteItem(obj, 'Quotation')
    }
    if(nextProps.deleteCall.sales === 'active'){
      let obj = { order_id: this.selectedId }
      this.props.deleteItem(obj, 'Sales Order')
    }
    if(nextProps.deleteCall.purchase === 'active'){
      let obj = { purchase_id: this.selectedId }
      this.props.deleteItem(obj, 'Purchase Order')
    }
  }
  toggleItem(item) {
    const stateSelected = this.state.selected
    let selected
    if (stateSelected.includes(item)) {
      selected = stateSelected.filter(s => s.id !== item.id)
    } else {
      selected = stateSelected.concat(item).reduce(getUnique, [])
    }
    this.setState({
      selected,
    }, () => {
      console.log(this.state.selected)
      this.props.setSelected(this.state.selected)
      this.props.checkedSingleItem(this.state.selected[0].id || null)
    })
  }
  rowClicked(id) {
    console.log(this.props.type);
    switch (this.props.type) {
      case 'Quotation': {
        return post('/api/sales/quotation/line', {'quotation_id': id })
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Sales Order' : {
        return post('/api/sales/order/line', {'order_id': id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Purchase Order': {
        return post('/api/purchase/line', {'purchase_id':id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Delivery Order': {
        return post('/api/inventory/do/line', {'inventory_id':id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Good Receipt': {
        //post('/api/purchase/line', {'purchase_id':id})
        return post('/api/inventory/gr/line', {'inventory_id':id})
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
      case 'Quotation': return 'Quotation Line(s)'
      case 'Sales Order': return 'Sales Order Line(s)'
      case 'Purchase Order': return 'Purchase Order Line(s)'
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
  return bindActionCreators(Object.assign({},DeleteActions), dispatch)
}

const getUnique = (p, c) => {
  if (p.includes(c)) return p;
  return p.concat(c);
}

export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(ContentForm)
