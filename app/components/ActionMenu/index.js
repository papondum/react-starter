import React, {PropTypes} from 'react';
import './style.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import createIcon from '../../resource/Icon/button_create.png'
import editIcon from '../../resource/Icon/button_edit.png'
import deleteIcon from '../../resource/Icon/button_delete.png'
import copyIcon from '../../resource/Icon/button_copy.png'
import attachIcon from '../../resource/Icon/button_create.png'
import printIcon from '../../resource/Icon/button_print.png'
import emailIcon from '../../resource/Icon/button_email.png'
import exportIcon from '../../resource/Icon/button_export.png'
import refreshIcon from '../../resource/Icon/button_create.png'
import UserAccount from '../ActionPage/UserAccount'
import Customer from '../ActionPage/Customer'
import Userrole from '../ActionPage/UserRole'
import Supplier from '../ActionPage/Supplier'
import PriceList from '../ActionPage/PriceList'
class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainField: null,
            createAction:'',
            editAction:'',
            copyAction:'',
            deleteAction:'',
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
        };
    }
    componentDidMount(){
      this._setActionCategory()
    }
    componentWillReceiveProps(nextProps){
      this._setActionCategory()
    }
    _setActionCategory(){
      switch (this.props.activePage) {
        case 'User account':
          this.setState({
            createAction:()=>this.props.actionFn((<UserAccount type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.actionFn((<UserAccount type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.actionFn(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'User role':
          this.setState({
            createAction:()=>this.props.actionFn((<Userrole type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.actionFn((<Userrole type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.actionFn(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Customer':
          this.setState({
            createAction:()=>this.props.actionFn((<Customer type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.actionFn((<Customer type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.actionFn(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Supplier':
          this.setState({
            createAction:()=>this.props.actionFn((<Supplier type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.actionFn((<Supplier type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.actionFn(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Price list':
          this.setState({
            createAction:()=>this.props.actionFn((<PriceList type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.actionFn((<PriceList type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.actionFn(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Product':

          break;
        case 'Brand':

          break;
        case 'Film type':

          break;
        default:
      }
    }


    render() {
        return(
          <div className='action-group-btn'>
          <button onClick={() =>this.state.createAction() }><img src={createIcon}/> <p>Create</p></button>
          <button onClick={() =>this.state.editAction() }><img src={editIcon}/> <p>Edit</p></button>
          <button onClick={() =>this.state.createAction() }><img src={copyIcon}/> <p>Copy</p></button>
          <button onClick={() =>this.state.createAction() }><img src={deleteIcon}/> <p>Delete</p></button>
          <button onClick={() =>this.state.createAction() }><img src={attachIcon}/> <p>Attach</p></button>
          <button onClick={() =>this.state.createAction() }><img src={emailIcon}/> <p>Email</p></button>
          <button onClick={() =>this.state.createAction() }><img src={printIcon}/> <p>Print</p></button>
          <button onClick={() =>this.state.createAction() }><img src={exportIcon}/> <p>Export</p></button>
          <button onClick={() =>this.state.createAction() }><img src={refreshIcon}/> <p>Refresh</p></button>
          </div>)
        }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};

export default connect(
    mapStateToProps
)(ActionMenu);
