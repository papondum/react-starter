import React from 'react';
import LeftMenu from '../LeftMenu';
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [
            {'name': 'Sales', 'icon': 's', 'submenu': [{'key': 1, 'uniq': 11}, {'key': 2, 'uniq': 12}, {'key': 3, 'uniq': 13}, {'key': 4, 'uniq': 14}]},
            {'name': 'Purchase', 'icon': 'h', 'submenu': [{'key': 3, 'uniq': 18}, {'key': 2, 'uniq': 17}, {'key': 3, 'uniq': 16}, {'key': 1, 'uniq': 15}]},
            {'name': 'Inventory', 'icon': 'a', 'submenu': [{'key': 1, 'uniq': 19}, {'key': 2, 'uniq': 20}, {'key': 2, 'uniq': 21}, {'key': 4, 'uniq': 22}]},
            {'name': 'Master file', 'icon': 'q', 'submenu': [{'key': 7, 'uniq': 26}, {'key': 2, 'uniq': 25}, {'key': 2, 'uniq': 24}, {'key': 9, 'uniq': 23}]},
            {'name': 'Report', 'icon': 'w', 'submenu': [{'key': 1, 'uniq': 27}, {'key': 2, 'uniq': 28}, {'key': 1, 'uniq': 29}]},
            {'name': 'Dashboard', 'icon': 'g', 'submenu': [{'key': 3, 'uniq': 33}, {'key': 4, 'uniq': 30}]},
            ]
        };
    }

    render() {
        return(
    <div className="box">
        Jusst a dummy page to showcase react-router!
        <div className="row content">
            <LeftMenu menu={this.state.menu}/>
            <div className="mainContent">MainField</div>
        </div>
    </div>);}
}

export default Menu;
