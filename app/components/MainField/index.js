import React, {PropTypes} from 'react';
import Tab from './Tab';
import { connect } from 'react-redux';
class MainField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
    <div className="mainContent">
      <Tab tab={this.props.tab}/>
      <div>main</div>
    </div>);}
}

MainField.propTypes = {
    tab: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};

export default connect(
    mapStateToProps
)(MainField);
