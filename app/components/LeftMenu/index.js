import React, { PropTypes }from 'react';
import { connect } from 'react-redux';
import { openTab } from '../../actions';

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
        const subMenu = item.submenu.map((i)=><div className="menu-item" key={i.name} onClick={()=>this.openTab(i.name)}>{i.name}</div>);
        this.setState({'submenu': subMenu});
    }

    menuGenerate() {
        const menu = (this.props.menu).map((i)=><div className="menu-item" onClick={()=>this.openSubmenu(i)} key={i.name}>{i.name}</div>);
        return menu;
    }

    openTab(item) {
        this.props.onOpenTab([item]);
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
    menu: PropTypes.array,
    onOpenTab: PropTypes.func,
    tab: PropTypes.object
};

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
