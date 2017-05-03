import React from 'react';
import LeftMenu from '../LeftMenu';
import MainField from '../MainField';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { post } from '../../../utils'
import { browserHistory,Link } from 'react-router'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [
            {'name': 'Sales', 'submenu': [
              {'name': 'Quotation', type: 'General'},
              {'name': 'Sales Order', type: 'General'}
            ]},
            {'name': 'Inventory', 'submenu': [
              {'name': 'Delivery Order', type: 'General'},
              {'name': 'Good Receipt', type: 'General'}
            ]},
            {'name': 'Master file', 'submenu': [
              {'name': 'User account', 'type': 'User'},
              {'name': 'User role', 'type': 'User'},
            ]},
          ],
          blockViewList: [],
          blockBtn: {},
        };
    }

    _getUserRole(){
        post('/api/role/id',{"role_id":this.props.roleId})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          var myobj = JSON.parse(response[0].role_detail)
          this._getBlockBtn(myobj)
          this._getBlockViewPage(myobj)
        })
        .catch(err=>console.log(err))
    }

    _getBlockBtn(items){
      let emailList = []
      let editList = []
      let exportList = []
      let printList = []
      for(let i in items){
        if(items[i].email==false){
           emailList.push(i)
        }
        if(items[i].edit==false){
           editList.push(i)
        }
        if(items[i].export==false){
           exportList.push(i)
        }
        if(items[i].print==false){
           printList.push(i)
        }
      }
      emailList= this.transformData(emailList)
      editList= this.transformData(editList)
      exportList= this.transformData(exportList)
      printList= this.transformData(printList)
      let result = Object.assign({},{emailList: emailList}, {editList: editList}, {exportList: exportList}, {printList: printList})
      this.setState({blockBtn: result})
    }

    transformData(items){
      let result = items.map(i=>{
        switch (i) {
          case 'customer':
            return 'Customer'
            break;
          case 'deliver_ord':
            return 'Delivery Order'
            break;
          case 'good_rec':
            return 'Good Receipt'
            break;
          case 'purchase_ord':
            return 'Purchase Order'
            break;
          case 'sale_ord':
            return 'Sales Order'
            break;
          case 'sale_quo':
            return 'Quotation'
            break;
          case 'user_acc':
            return 'User account'
            break;
          case 'user_rol':
            return 'User role'
            break;
          default:''

        }
      })
      return result
    }

    _getBlockViewPage(item){
      let result = []
      for(let i in item){
        if(item[i].view==false){
          result.push(i)
        }
      }
      let transform = this.transformData(result)
      this.setState({blockViewList:transform})
    }

    _getPermission(){
      this._getUserRole()
    }

    componentDidMount(){
      this._getPermission()
    }

    render() {
        return(
    <div className="box">
        <div className="row content">
            <LeftMenu menu={this.state.menu} blockViewList= {this.state.blockViewList}/>
            <MainField blockBtn = {this.state.blockBtn}/>
        </div>
    </div>);}
}

function mapStateToProps(state) {
  return {
    roleId: state.login.auth.role_id,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
