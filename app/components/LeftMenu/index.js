import React, { PropTypes }from 'react';
class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    openSubmenu(item) {
        console.log(item);
    }

    menuGenerate() {
        const menu = (this.props.menu).map((i)=><div onClick={()=>this.openSubmenu(i.name)} key={i.name}>{i.name}</div>);
        return menu;
    }

    render() {
        return (
          <div className="left-menu">
            <div className="flex-col flex">{this.menuGenerate()}</div>
          </div>
      );
    }
}

LeftMenu.propTypes = {
    menu: PropTypes.array
};

export default LeftMenu;
