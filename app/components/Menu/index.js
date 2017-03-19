import React from 'react';
import LeftMenu from '../LeftMenu';
import MainField from '../MainField';
import NotificationContainer from '../Notification'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
            ]
        };
    }

    render() {
        return(
    <div className="box">
        <div className="row content">
            <LeftMenu menu={this.state.menu}/>
            <MainField/>
            <NotificationContainer notification={this.props.notification} removeNotification={this.props.removeNotification}/>
        </div>
    </div>);}
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},NotificationAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
