import React, { PropTypes }from 'react';
import { connect } from 'react-redux';
import { openTab } from '../../actions';
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
        this._getSubItemMenuFromName(item);
        this.setState({'menuActive':item.name})
    }

    _getSubItemMenuFromName(item) {
        const subMenu = item.submenu.map((i)=><div className="submenu-item" key={i.name} onClick={()=>this.openTab(i.name)}><img src={submenuIcon}/><span>{i.name}</span></div>);
        this.setState({'submenu': subMenu});
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
        onOpenTab: tab => dispatch(openTab(tab))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu);
