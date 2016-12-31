import React, { PropTypes }from 'react';
import './style.scss';
class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'submenu': []};
    }

    openSubmenu(item) {
        this._getSubItemMenuFromName(item);
    }

    _getSubItemMenuFromName(item) {
        const subMenu = item.submenu.map((i)=><div className="menu-item" key={i.uniq}>{i.key}</div>);
        this.setState({'submenu': subMenu});
    }

    menuGenerate() {
        const menu = (this.props.menu).map((i)=><div className="menu-item" onClick={()=>this.openSubmenu(i)} key={i.name}>{i.name}</div>);
        return menu;
    }

    render() {
        return (
          <div className="left-menu">
            <div className="flex-col flex menu">{this.menuGenerate()}</div>
            <div className="sub-menu">{this.state.submenu}</div>
          </div>
      );
    }
}

LeftMenu.propTypes = {
    menu: PropTypes.array
};

export default LeftMenu;
