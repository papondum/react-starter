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
      checkedItem: [],
      thisLine: [],
      subContent: [],
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.type!==nextProps.type){
      this.setState({checkedItem:[],thisLine:[]})
    }
    if(nextProps.deleteCall.userAcc=='active'){
      let obj = {user_id:this.state.checkedItem}
      this.props.deleteItem(obj,'User account')
    }
    if(nextProps.deleteCall.userRole=='active'){
      let obj = {role_id:this.state.checkedItem}
      this.props.deleteItem(obj,'User role')
    }
    if(nextProps.deleteCall.customer=='active'){
      let obj = {customer_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Customer')
    }
    if(nextProps.deleteCall.supplier=='active'){
      let obj = {supplier:this.state.checkedItem}
      this.props.deleteItem(obj,'Supplier')
    }
    if(nextProps.deleteCall.price=='active'){
      let obj = {pricelist_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Price list')
    }
    if(nextProps.deleteCall.product=='active'){
      let obj = {product_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Product')
    }
    if(nextProps.deleteCall.brand=='active'){
      let obj = {brand_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Brand')
    }
    if(nextProps.deleteCall.film=='active'){
      let obj = {film_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Film Type')
    }
    if(nextProps.deleteCall.grade=='active'){
      let obj = {grade_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Grade')
    }
    if(nextProps.deleteCall.quotation=='active'){
      let obj = {quotation_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Quotation')
    }
    if(nextProps.deleteCall.sales=='active'){
      let obj = {order_id:this.state.checkedItem}
      this.props.deleteItem(obj,'Sales Order')
    }
  }

  get subContentHeader() {
    switch (this.props.type) {
      case 'Quotation': return 'Quotation Line(s)'
      case 'Sales Order': return 'Sales Order Line(s)'
      case 'Purchase Order': return 'Purchase Order Line(s)'
      default: return ''
    }
  }

  rowClicked(id) {
    switch (this.props.type) {
      case 'Quotation': {
        return post('/api/sales/quotation/line', {'quotation_id': id })
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      case 'Sales Order' : {
        return post('/api/sales/order/line', {'order_id': id})
        .then(subContent => this.setState({ subContent: [] }, () => this.setState({ subContent })))
      }
      default: return this.setState({ subContent: [] })
    }
  }

  render() {
    if (this.props.content.length === 0) {
      return <div></div>
    }
    return (<div>
      <Table
        header={this.subContentHeader}
        checkedSingleItem={this.props.checkedSingleItem}
        rowClicked={id => this.rowClicked(id)}
        content={this.props.content || []}
        subContent={this.state.subContent}
        type={this.props.type}
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


export default connect(mapStateToProps,mapDispatchToProps)(ContentForm)
