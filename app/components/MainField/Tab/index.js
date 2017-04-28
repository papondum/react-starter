import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { closeTab } from '../../../actions';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png';

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }


    generateTab() {
      console.log('test');
        const tab = this.props.tab.tabs;
        const tabs = tab.map(item=><div key={item} onClick={()=>this.props.openContent(item)} className="tab-style">{item}<span lassName="tab-close" onClick={()=>this.props.closeTab(item)}><img src={cancelIcon}/></span></div>);
        return tabs;
    }

    render() {
        return(
    <div className="flex">
        {this.generateTab()}
    </div>);}
}

Tab.propTypes = {
    tab: PropTypes.object,
    openContent: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeTab: tab => dispatch(closeTab(tab))
    };
};

export default connect(
    mapDispatchToProps
)(Tab);
