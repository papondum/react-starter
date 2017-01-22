import React, {PropTypes} from 'react';
import './style.scss';
class TabList extends React.Component {
    constructor(props) {
        super(props);
    }


    generateTab() {
        const tab = this.props.tab.tabs;
        const tabs = tab.map(item=><div key={item} onClick={()=>this.props.openContent(item)} className={this.props.tab.activeTabs==item? 'active-tab tab-style':"tab-style"}>{item}</div>);
        return tabs;
    }

    render() {
        return(
    <div className="flex tablist-style">
        {this.generateTab()}
    </div>);}
}

export default TabList;
