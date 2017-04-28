import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png';

class TabList extends React.Component {
    constructor(props) {
        super(props);
    }


    generateTab() {
        const tab = this.props.tab.tabs;
        const tabs = tab.map(item=>{
          return (<div key={item}  className={this.props.tab.activeTabs==item? 'active-tab tab-style':"tab-style"}>
            <span onClick={()=>this.props.openContent(item)}>{item}</span> <span className="tab-close" onClick={()=>this.props.closeTab(item)}><img src={cancelIcon}/></span>
          </div>)});
        return tabs;
    }

    render() {
        return(
    <div className="flex tablist-style">
        {this.generateTab()}
    </div>);}
}

export default TabList;
