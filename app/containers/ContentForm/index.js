import React from 'react';
import './style.scss';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import * as DeleteActions from '../../actions/deleteCall'
class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          checkedItem:[]
        }
    }

    componentDidMount(){
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
        let eachRow = this._getEachVal(content[i])
        result.push((<tr key = {i}>{eachRow}</tr>))
      }
      return result
    }

    _getEachVal(obj){
      var result=[]
      for(var o in obj){
        if (o == 'id') {
          result.push((<td key={o} style={{display: 'none'}}>{obj[o]}</td>))
        } else {
          result.push((<td key={o}>{obj[o]}</td>))
        }
      }
      result.unshift((<td key='checkbox'><input onChange = {()=>this.ifChecked(obj.id)} type = 'checkbox' value = {obj.id} ref = {obj.id} /></td>))
      return result
    }

    ifChecked(id){
      if(this.refs[id].checked){
        if(this.state.checkedItem.find((i) => i==this.refs[id].value)==undefined){
          this.setState({
            checkedItem:this.state.checkedItem.concat([this.refs[id].value])
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



    }

    getSecondSection(type){
      if(type ==='Quotation'){
        return this.renderQuotationLine()
      }
      else if(type ==='Sales Order'){
        return this.renderSalesOrderLine()
      }
      else if(type === 'Purchase Order'){
        return this.renderPurchaseOrder()
      }
      else {
        return ''
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
          <div>
            {
              this.getSecondSection(this.props.type)
            }
          </div>
        </div>)
    }

    renderQuotationLine() {
      return (<div>
          <div className='action-bar'>
            <h2>Quotation Line(s)</h2>
          </div>
          <table>
              <thead>
                  <tr>
                      {this._headerQuotationGen(this.props.content)}
                  </tr>
              </thead>
              <tbody>
                  {this._quotationLineGen(this.props.content)}
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
                      {this._headerSalesOrderGen(this.props.content)}
                  </tr>
              </thead>
              <tbody>
                  {this._salesOrderLineGen(this.props.content)}
              </tbody>
          </table>
        </div>)
    }

    renderPurchaseOrder(){
      return(
        <div>
          <div className='action-bar'>
            <h2>Purchase Order Line(s)</h2>
          </div>
          <table>
              <thead>
                  <tr>
                      {this.getHeaderPurchaseOrderLine(this.props.content)}
                  </tr>
              </thead>
              <tbody>
                  {this.getPurchaseOrderLineContent(this.props.content)}
              </tbody>
          </table>
          <div className="flex flex-space-between">
            <div className="flex flex-col remark">
              Remark :
              <div>
                <textarea ref="remarkText"></textarea>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col" style={{marginRight:'10px',textAlign:"end"}}>
                <div>
                  Total Before Discount :
                </div>
                <div>
                  Discount :
                </div>
                <div>
                  Taxes : <input type="text" ref="tax" /> %
                </div>
                <div>
                  Withholding Taxes <input type="text" ref="holdingtax" /> %
                </div>
                <div>
                  Total :
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  7500
                </div>
                <div>
                  <input type="text" ref="discount" />
                </div>
                <div>
                  490
                </div>
                <div>
                  blank space
                </div>
                <div>
                  7490
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    getHeaderPurchaseOrderLine(content){
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
      }
      return genHead
    }

    getPurchaseOrderLineContent(content){
      return ''
    }

    _headerQuotationGen(content){
      // var result = []
      // for(var i=0 ;i<content.length;i++){
      //   let eachRow = this._getEachVal(content[i])
      //   result.push((<tr key = {i}>{eachRow}</tr>))
      // }
      // return result
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
      // var result = []
      // for(var i=0 ;i<content.length;i++){
      //   let eachRow = this._getEachVal(content[i])
      //   result.push((<tr key = {i}>{eachRow}</tr>))
      // }
      // return result
    }

    _quotationLineGen(content){
      // var result = []
      // for(var i=0 ;i<content.length;i++){
      //   let eachRow = this._getEachVal(content[i])
      //   result.push((<tr key = {i}>{eachRow}</tr>))
      // }
      // return result
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
