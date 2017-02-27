import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ContentForm from '../../../containers/ContentForm'
import CreateUser from '../../ActionPage/UserAccount'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state={'content':[],subContent:''
        }
    }

    render() {
        return(
    // <div className='content-style'>
    <div style={{overflow: 'scroll', height: 'calc(100% - 98px)'}}>
        {this.props.mainContent.length!=undefined? (<ContentForm type = {this.props.contentHeader} content = {this.props.mainContent} checkedSingleItem = {(item)=>this.props.checkedSingleItem(item)}/>):this.props.mainContent}
    </div>);}
}
const mapStateToProps = (state) => {
    return {
        tab: state.tab,
        masterfile:state.masterfile
    };
};

export default connect(
    mapStateToProps
)(Content);
