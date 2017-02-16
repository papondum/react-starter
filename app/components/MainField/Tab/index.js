import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { closeTab } from '../../../actions';
import './style.scss';
class Tab extends React.Component {
    constructor(props) {
        super(props);
    }


    generateTab() {
        const tab = this.props.tab.tabs;
        const tabs = tab.map(item=><div key={item} onClick={()=>this.props.openContent(item)} className="tab-style">{item}<span onClick={()=>this.props.closeTab(item)}>x</span></div>);
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
