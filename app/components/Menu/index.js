import React from 'react';
import LeftMenu from '../LeftMenu';
import MainField from '../MainField';
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [
            {'name': 'Sales', 'icon': 's', 'submenu': [{'key': 1, 'uniq': 11}, {'key': 2, 'uniq': 12}, {'key': 3, 'uniq': 13}, {'key': 4, 'uniq': 14}]},
            {'name': 'Purchase', 'icon': 'h', 'submenu': [{'key': 3, 'uniq': 18}, {'key': 2, 'uniq': 17}, {'key': 3, 'uniq': 16}, {'key': 1, 'uniq': 15}]},
            {'name': 'Inventory', 'icon': 'a', 'submenu': [{'key': 1, 'uniq': 19}, {'key': 2, 'uniq': 20}, {'key': 2, 'uniq': 21}, {'key': 4, 'uniq': 22}]},
            {'name': 'Master file', 'icon': 'q', 'submenu': [
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
            {'name': 'Report', 'icon': 'w', 'submenu': [{'key': 1, 'uniq': 27}, {'key': 2, 'uniq': 28}, {'key': 1, 'uniq': 29}]},
            {'name': 'Dashboard', 'icon': 'g', 'submenu': [{'key': 3, 'uniq': 33}, {'key': 4, 'uniq': 30}]},
            ]
        };
    }

    render() {
        return(
    <div className="box">
        <div className="row content">
            <LeftMenu menu={this.state.menu}/>
            <MainField/>
        </div>
    </div>);}
}

export default Menu;
