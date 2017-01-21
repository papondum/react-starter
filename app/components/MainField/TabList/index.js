import React, {PropTypes} from 'react';
import './style.scss';
class TabList extends React.Component {
    constructor(props) {
        super(props);
    }


    generateTab() {
        const tab = this.props.tab.tabs;
        const tabs = tab.map(item=><div key={item} onClick={()=>this.props.openContent(item)} className="tab-style">{item}</div>);
        return tabs;
    }

    render() {
        return(
    <div className="flex">
        {this.generateTab()}
    </div>);}
}

export default TabList;
