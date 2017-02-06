import React, {PropTypes} from 'react';
import './style.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import createIcon from '../../resource/Icon/button_create.png'
import editIcon from '../../resource/Icon/button_edit.png'
import deleteIcon from '../../resource/Icon/button_delete.png'
import copyIcon from '../../resource/Icon/button_copy.png'

import attachIcon from '../../resource/Icon/button_create.png'
import emailIcon from '../../resource/Icon/button_create.png'

import printIcon from '../../resource/Icon/button_print.png'
import exportIcon from '../../resource/Icon/button_export.png'
import * as UserAccountActions from '../../actions/useraccount'
import refreshIcon from '../../resource/Icon/button_create.png'
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

    componentWillReceiveProps(){
      this._setActionCategory()
    }
    _setActionCategory(){
      switch (this.props.activePage) {
        case 'User account':
        console.log('invoked');
          this.setState({
            createAction:()=>this.props.showCreateUser(),
            editAction:()=>this.props.showEditUser(),
            copyAction:'',
            deleteAction:()=>this.props.showDeleteUser(),
            attachAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'User role':

          break;
        case 'Customer':

          break;
        case 'Supplier':

          break;
        case 'Price list':

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
          <button onClick={() =>this.state.createAction() }><img src={editIcon}/> <p>Edit</p></button>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, UserAccountActions), dispatch)
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(ActionMenu);
