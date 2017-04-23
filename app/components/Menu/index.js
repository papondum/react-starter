import React from 'react';
import LeftMenu from '../LeftMenu';
import MainField from '../MainField';
import NotificationContainer from '../Notification'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { post } from '../../../utils'
import { browserHistory,Link } from 'react-router'
import * as NotificationAction from '../../actions/notification'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [
            {'name': 'Sales', 'submenu': [
              {'name': 'Quotation', type: 'General'},
              {'name': 'Sales Order', type: 'General'}
            ]},
            {'name': 'Purchase', 'submenu': [
              {'name': 'Purchase Order', type: 'General'}
            ]},
            {'name': 'Inventory', 'submenu': [
              {'name': 'Delivery Order', type: 'General'},
              {'name': 'Good Receipt', type: 'General'}
            ]},
            {'name': 'Master file', 'submenu': [
              {'name': 'User account', 'type': 'User'},
              {'name': 'User role', 'type': 'User'},
              {'name': 'Customer', 'type': 'Business Partner'},
              {'name': 'Supplier', 'type': 'Business Partner'},
              {'name': 'Price list', 'type': 'Pricing'},
              {'name': 'Product', 'type': 'Product'},
              {'name': 'Brand', 'type': 'Product'},
              {'name': 'Film Type', 'type': 'Product'},
              {'name': 'Grade', 'type': 'Product'},
            ]},
            {'name': 'Report', 'submenu': [
              {'name': 'Stock Balance', type: 'General'},
              {'name': 'Shelf Life', type: 'General'},
              {'name': 'Stock on Hand', type: 'General'}
            ]},
            {'name': 'Dashboard', 'submenu': [
              {'name': 'Sales - Purchase - Profit', 'type': 'Overall'},
              {'name': 'Top 10 Customers', 'type': 'Sales'},
              {'name': 'Top 10 Salesperson', 'type': 'Sales'},
              {'name': 'Top 10 Profitable Product', 'type': 'Sales'},
              {'name': 'Sales Amount of each Brand', 'type': 'Sales'},
              {'name': 'Sales Amount of each Film Type', 'type': 'Sales'},
              {'name': 'Top 10 Suppliers', 'type': 'Purchase'},
              {'name': 'Sales Amount of each Brand', 'type': 'Purchase'},
              {'name': 'Sales Amount of each Film Type', 'type': 'Purchase'},
            ]},
          ],
          blockViewList:[],
        };
    }

    _getUserRole(){
        post('/api/role/id',{"role_id":this.props.roleId})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          var myobj = JSON.parse(response[0].role_detail)
          this._getBlockViewPage(myobj)
        })
        .catch(err=>console.log(err))
    }

    _getBlockViewPage(item){
      let result = []
      for(let i in item){
        if(item[i].view==false){
          result.push(i)
        }
      }
      let transform = result.map(i=>{
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
            <MainField/>
            <NotificationContainer notification={this.props.notification} removeNotification={this.props.removeNotification}/>
        </div>
    </div>);}
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
    roleId: state.login.auth.role_id,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},NotificationAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
