import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { post } from '../../../utils'
import * as DeleteActions from '../../actions/deleteCall'
class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          checkedItem: [],
          thisLine: []
        }
    }

    _headerGen(content){
      let genHead=[]
      if(content.length>0){
        var head = Object.keys(content[0])
        genHead = head.map(item=>{
          if (item == 'id') {
            return (<td key= {item} style={{display: 'none'}}>{item}</td>)
          } else {
            return (<td key= {item}>{item}</td>)
          }
        })
        genHead.unshift((<td key='checkbox'><input type='checkbox'/></td>))
      }
        return genHead
    }

    _contentGen(content){
      var result = []

      for(var i=0 ;i<content.length;i++){
          let eachRow = this._getEachVal(content[i],'content')
          // working on here -> detect click in each row and send id to rowClicked function
          let itemId = content[i].id
          result.push((<tr className = {this.props.type =="Quotation"||this.props.type == "Sales Order"||this.props.type == "Purchase Order" ? 'clickable-item':''} onClick={()=>this.rowClicked(itemId)} key = {i}>{eachRow}</tr>))
      }
      return result
    }

    _getEachVal(obj,type){
      var result=[]
      for(var o in obj){
        if (o == 'id') {
          result.push((<td key={o} style={{display: 'none'}}>{obj[o]}</td>))
        } else {
          result.push((<td key={o}>{obj[o]}</td>))
        }
      }
      if(type !== 'line'){
        result.unshift((<td key='checkbox'><input onChange = {()=>this.ifChecked(obj.id, type)} type = 'checkbox' value = {obj.id} ref = {type+'_'+obj.id} /></td>))
      }
      return result
    }

    rowClicked(i) {
      console.log("row click " + i)
      if(this.props.type == 'Quotation'){
        post('/api/sales/quotation/line', {'quotation_id':i})
          .then(response=>this.setState({thisLine:response}))
      }
      else if(this.props.type == "Sales Order"){
        console.log('triggered');
        post('/api/sales/order/line', {'order_id':i})
          .then(response=>
            this.setState({thisLine:response})
          )
      }
      else if(this.props.type == "Purchase Order"){
        console.log('triggered');
        post('/api/purchase/line', {'pucchase_id':i})
          .then(response=>
            this.setState({thisLine:response})
          )
      }

      //this.setState({thisLine:i})
    }


    ifChecked(ids, type){
      let id = type + '_' + ids
      if(this.refs[id].checked){
        if(this.state.checkedItem.find((i) => i==this.refs[id].value)==undefined){
          let mergeItem = this.state.checkedItem.concat([this.refs[id].value])
          this.setState({
            checkedItem:mergeItem
          })
        }

        if(this.state.checkedItem.length==0){
          //send existing state checked id state

          this.props.checkedSingleItem(this.refs[id].value)
        }

      }
      else{   //if checked item that not want it will return wrong val
          var array = this.state.checkedItem;
          var index = array.indexOf(this.refs[id].value)
          array.splice(index, 1);
          this.setState({checkedItem: array });

          if(this.state.checkedItem.length==1){
            this.props.checkedSingleItem(this.state.checkedItem[0])
          }
          else{
            this.props.checkedSingleItem(this.state.checkedItem[0])
          }
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
      if(nextProps.deleteCall.purchase=='active'){
        let obj = {purchase_id:this.state.checkedItem}
        this.props.deleteItem(obj,'Purchase Order')
      }
    }

    render() {
      return (<div>
          <table>
              <thead>
                  <tr>
                      {this._headerGen(this.props.content)}
                  </tr>
              </thead>
              <tbody>
                  {this._contentGen(this.props.content)}
              </tbody>
          </table>
          <div>{this.renderLine(this.props.type)}</div>
        </div>)
    }

    renderLine(item){
      switch (item) {
        case 'Quotation':
          return this.renderQuotationLine()
          break;
        case 'Sales Order':
          return this.renderSalesOrderLine()
          break;
        case 'Purchase Order':
          return this.renderPurchaseOrder()
        default:

      }
    }
    renderQuotationLine() {
      return (<div>
          <div className='action-bar'>
              <h2>Quotation Line(s)</h2>
          </div>
          <table>
              <thead>
                  <tr>
                      {this._headerQuotationGen(this.state.thisLine)}
                  </tr>
              </thead>
              <tbody>
                  {this._quotationLineGen(this.state.thisLine)}
              </tbody>
          </table>
        </div>)
    }


    renderSalesOrderLine() {
      return (<div>
          <div className='action-bar'>
              <h2>Sales Order Line(s)</h2>
          </div>
          <table>
              <thead>
                  <tr>
                      {this._headerQuotationGen(this.state.thisLine)}
                  </tr>
              </thead>
              <tbody>
                   {this._salesOrderLineGen(this.state.thisLine)}
              </tbody>
          </table>
        </div>)
    }

    renderPurchaseOrder(){
      return (<div>
          <div className='action-bar'>
              <h2>Purchase Order Line(s)</h2>
          </div>
          <table>
              <thead>
                  <tr>
                      {this._headerQuotationGen(this.state.thisLine)}
                  </tr>
              </thead>
              <tbody>
                   {this._salesOrderLineGen(this.state.thisLine)}
              </tbody>
          </table>
        </div>)
    }


    // _headerQuotationGen(content){
    //   var result = []
    //   for(var i=0 ;i<content.length;i++){
    //     let eachRow = this._getEachVal(content[i])
    //     result.push((<tr key = {i}>{eachRow}</tr>))
    //   }
    //   return result
    // }

    _headerQuotationGen(content){
      let genHead=[]
      if(content.length>0){
        var head = Object.keys(content[0])
        genHead = head.map(item=>{
          if (item == 'id') {
            return (<td key= {item} style={{display: 'none'}}>{item}</td>)
          } else {
            return (<td key= {item}>{item}</td>)
          }
        })
        // genHead.unshift((<td key='checkbox'><input type='checkbox'/></td>))
      }
        return genHead
    }

    _headerSalesOrderGen(content){
      // var result = []
      // for(var i=0 ;i<content.length;i++){
      //   let eachRow = this._getEachVal(content[i])
      //   result.push((<tr key = {i}>{eachRow}</tr>))
      // }
      // return result
    }

    _salesOrderLineGen(content){
      console.log("Boob COntent Line Order")
      console.log(content)
      var result = []
      for(var i=0 ;i<content.length;i++){
        let eachRow = this._getEachVal(content[i],'line')
        result.push((<tr key = {i}>{eachRow}</tr>))
      }
      return result
    }

    _quotationLineGen(content){
      var result = []
      for(var i=0 ;i<content.length;i++){
        let eachRow = this._getEachVal(content[i],'line')
        result.push((<tr key = {i}>{eachRow}</tr>))
      }
      return result
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
