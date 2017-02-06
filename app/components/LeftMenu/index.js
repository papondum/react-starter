import React, { PropTypes }from 'react';
import { connect } from 'react-redux';
import { openTab ,setHeader ,setSubHeader} from '../../actions/tab';
import SaleIcon from '../../resource/Icon/menu_sales.png'
import PurchaseIcon from '../../resource/Icon/menu_purchase.png'
import InventoryIcon from '../../resource/Icon/menu_inventory.png'
import MasterIcon from '../../resource/Icon/menu_masterfile.png'
import ReportIcon from '../../resource/Icon/menu_report.png'
import DashIcon from '../../resource/Icon/menu_dashboard.png'
import submenuIcon from '../../resource/Icon/submenu.png'
import './style.scss';
class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'submenu': [],',menuActive':''};
    }

    openSubmenu(item) {
        this.props.setHeader(item.name)
        this._getSubItemMenuFromName(item);
        this.setState({'menuActive':item.name})
    }

    _getSubItemMenuFromName(item) {
        const subMenu = item.submenu.map((i) => {
          return (<div className="submenu-item" key={i.name} onClick={()=>this.openTab(i.name)} value={i.type}>
                      <img src={submenuIcon}/>
                      <span>{i.name}</span>
                  </div>)});
        let result = this._genMasterFileGroup(subMenu)
        this.setState({'submenu': result});
    }

    _genMasterFileGroup(item){
      let clusteringFromSet = {user:[],business:[],price:[],product:[]}
      for (var i = 0; i < item.length; i++) {
        switch (item[i].props.value) {
          case 'User':
            clusteringFromSet.user.push(item[i])
            break;
          case 'Business Partner':
            clusteringFromSet.business.push(item[i])
            break;
          case 'Pricing':
            clusteringFromSet.price.push(item[i])
            break;
          case 'Product':
            clusteringFromSet.product.push(item[i])
            break;
          default:

        }
      }
      return (
        <div>
          <div>
            <div className="sub-head-text">User</div>
            {clusteringFromSet.user}
          </div>
          <div>
            <div className="sub-head-text">Business Partner</div>
            {clusteringFromSet.business}
          </div>
          <div>
            <div className="sub-head-text">Pricing</div>
            {clusteringFromSet.price}
          </div>
          <div>
            <div className="sub-head-text">Product</div>
            {clusteringFromSet.product}
          </div>
        </div>)
    }


    _genGroup(item){
      switch (item.type) {
        case 'User':
          //push to user set
          break;
        case 'Business Partner':
          //push to user set
          break;
        case 'Pricer':
          //push to user set
          break;
        case 'Product':
          //push to user set
          break;
        default:

      }
    }


    _getIconFromName(name){
      switch (name) {
        case 'Sales':
          return (<img src={SaleIcon}/>)
          break;
        case 'Purchase':
          return (<img src={PurchaseIcon}/>)
          break;
        case 'Inventory':
          return (<img src={InventoryIcon}/>)
          break;
        case 'Master file':
          return (<img src={MasterIcon}/>)
          break;
        case 'Report':
          return (<img src={ReportIcon}/>)
          break;
        case 'Dashboard':
          return (<img src={DashIcon}/>)
          break;
        default:
          console.log('default');
      }
    }

    menuGenerate() {
        const menu = (this.props.menu).map((i)=>
        <div className={this.state.menuActive==i.name? 'menu-item active-menu':"menu-item"} onClick={()=>this.openSubmenu(i)} key={i.name}>
          {this._getIconFromName(i.name)}
          <p>{i.name}</p>
        </div>);
        return menu;
    }

    openTab(item) {
        this.props.setSubHeader(item)
        this.props.onOpenTab([item]);
    }

    render() {
        return (
          <div className="left-menu">
              <div className="flex-col flex menu flex-1">{this.menuGenerate()}</div>
              <div className="sub-menu">{this.state.submenu}</div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenTab: tab => dispatch(openTab(tab)),
        setHeader: tab => dispatch(setHeader(tab)),
        setSubHeader: tab => dispatch(setSubHeader(tab))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu);
