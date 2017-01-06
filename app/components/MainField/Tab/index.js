import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    generateTab() {
        const ss = ['s', 'ss'];
        const tab = ss.map(item=><div>{item}</div>);
        // const tab = this.props.tabs.map(item=><div>{item}</div>);
        return tab;
    }

    render() {
        return(
    <div>
        {this.generateTab()}
    </div>);}
}

Tab.propTypes = {
    tabs: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};
export default connect(
    mapStateToProps
)(Tab);
