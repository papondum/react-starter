import React from 'react';
import { connect } from 'react-redux';
import Tab from './Tab';
class MainField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
    <div className="mainContent">
      <Tab/>
      <div>main</div>
    </div>);}
}
const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};
export default connect(
    mapStateToProps
)(MainField);
