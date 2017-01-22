import React, {PropTypes} from 'react';
import TabList from './TabList';
import { connect } from 'react-redux';
import { openTab } from '../../actions';
import Content from './Content';
import ActionMenu from '../ActionMenu'
import './style.scss'
class MainField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainField: null
        };
    }

    _getMainFieldFromTab(item) {
        this.props.onOpenTab([item])
        this.setState({
            mainField: item
        });
    }

    render() {
        return(
          <div className="mainContent">
              <TabList tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)}/>
              <ActionMenu/>
              <Content contentHeader = {this.state.mainField}/>
          </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onOpenTab: tab => dispatch(openTab(tab))
    };
};
export default connect(
    mapStateToProps,mapDispatchToProps
)(MainField);
