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
            this.props.checkedSingleItem(this.refs[id].value)
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
        this.props.deleteItem(obj,'Price')
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

    render() {
      //flow >> click delete  >> get checked value >>  send to delete
      // how delete fn get checked value from this?
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
          </table></div>)
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
