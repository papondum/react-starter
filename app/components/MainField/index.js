import React, {PropTypes} from 'react';
import Tab from './Tab';
import { connect } from 'react-redux';
import Content from './Content';
class MainField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainField: null
        };
    }

    _getMainFieldFromTab(item) {
        this.setState({
            mainField: item
        });
    }

    render() {
        return(
    <div className="mainContent">
        <Tab tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)}/>
        <Content content = {this.state.mainField}/>
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
