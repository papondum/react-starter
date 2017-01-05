import React from 'react';
import { connect } from 'react-redux';
class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
    <div>
    Tab
    </div>);}
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};
export default connect(
    mapStateToProps
)(Tab);
