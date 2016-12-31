import React from 'react';
import Test from './Test';
import LeftMenu from './LeftMenu';
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menu': [
            {'name': 'Sales', 'icon': 's'},
            {'name': 'Purchase', 'icon': 's'},
            {'name': 'Inventory', 'icon': 's'},
            {'name': 'Master file', 'icon': 's'},
            {'name': 'Report', 'icon': 's'},
            {'name': 'Dashboard', 'icon': 's'},
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
        <Test/>
    </div>);}
}

export default About;
