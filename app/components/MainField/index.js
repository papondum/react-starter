import React, {PropTypes} from 'react';
import TabList from './TabList';
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
        <TabList tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)}/>
        <Content contentHeader = {this.state.mainField}/>
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
