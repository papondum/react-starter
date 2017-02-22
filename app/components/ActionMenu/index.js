import React, {PropTypes} from 'react';
import './style.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import createIcon from '../../resource/Icon/button_create.png'
import editIcon from '../../resource/Icon/button_edit.png'
import deleteIcon from '../../resource/Icon/button_delete.png'
import copyIcon from '../../resource/Icon/button_copy.png'
import printIcon from '../../resource/Icon/button_print.png'
import emailIcon from '../../resource/Icon/button_email.png'
import exportIcon from '../../resource/Icon/button_export.png'
import refreshIcon from '../../resource/Icon/button_create.png'
import * as DeleteAction from '../../actions/deleteCall'
import Modal from '../Modal/Custom'
import ModalC from '../Modal/Confirm'

import UserAccount from '../ActionPage/UserAccount'
import Customer from '../ActionPage/Customer'
import Userrole from '../ActionPage/UserRole'
import Supplier from '../ActionPage/Supplier'
import PriceList from '../ActionPage/PriceList'
import Product from '../ActionPage/Product'
import Brand from '../ActionPage/Brand'
import FilmType from '../ActionPage/FilmType'
import Grade from '../ActionPage/Grade'
class ActionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainField: null,
            createAction:'',
            editAction:'',
            copyAction:'',
            deleteAction:'',
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
            showModal:{
              show:false
            }
        };
    }

    showDeleteModal(){
      this.setState({
        showModal:{
          show:true,
          header:'Delete item(s)',
          message:'Are you sure you want to delete selected item(s)?',
          close:()=>{
            this.setState({
              showModal:{
                show:false
              }
            })
          },
          confirm:()=>{
            this.props.deleteTrig(this.props.activePage)  //state change to active delete  >> go to ContentForm
            this.props.getContent(this.props.activePage)
          },
          submitTxt:'SUMMIT'
        }
      })
    }

    componentDidMount(){
      this._setActionCategory()
    }

    componentWillReceiveProps(nextProps){
      this._setActionCategory()
      if(nextProps.userAcc=='idle'){
        this.setState({
          showModal:{
            show:false
          }
        })
      }
    }
    _setActionCategory(){
      switch (this.props.activePage) {
        case 'User account':
          this.setState({
            createAction:()=>this.props.setContent((<UserAccount type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<UserAccount type='edit' getContent={(item)=>this.props.getContent(item)} objFromFetch={this.props}/>)),
            copyAction:'',
            deleteAction:()=>this.showDeleteModal(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'User role':
          this.setState({
            createAction:()=>this.props.setContent((<Userrole type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<Userrole type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshActiosn:'',
          })
          break;
        case 'Customer':
          this.setState({
            createAction:()=>this.props.setContent((<Customer type='create' getContent={(item)=>this.props.getContent(item)}/>)),   //set new content when click this menu
            editAction:()=>this.props.setContent((<Customer type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(), //no need change contnt just popup modal cover old
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Supplier':
          this.setState({
            createAction:()=>this.props.setContent((<Supplier type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<Supplier type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Price list':
          this.setState({
            createAction:()=>this.props.setContent((<PriceList type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<PriceList type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Product':
          this.setState({
            createAction:()=>this.props.setContent((<Product type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<Product type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Brand':
          this.setState({
            createAction:()=>this.props.setContent((<Brand type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<Brand type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Film Type':
          this.setState({
            createAction:()=>this.props.setContent((<FilmType type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<FilmType type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        case 'Grade':
          this.setState({
            createAction:()=>this.props.setContent((<Grade type='create' getContent={(item)=>this.props.getContent(item)}/>)),
            editAction:()=>this.props.setContent((<Grade type='edit' getContent={(item)=>this.props.getContent(item)}/>)),
            copyAction:'',
            deleteAction:()=>this.props.setContent(),
            emailAction:'',
            printAction:'',
            exportAction:'',
            refreshAction:'',
          })
          break;
        default:
      }
    }


    render() {
        return(
          <div className='flex action-bar' >
              <h2>{typeof this.props.activePage!='object'? this.props.activePage:''}</h2>
              <div className='action-group-btn'>
                  <button onClick={() =>this.state.createAction() }><img src={createIcon}/> <p>Create</p></button>
                  <button onClick={() =>this.state.editAction() }><img src={editIcon}/> <p>Edit</p></button>
                  <button onClick={() =>this.state.createAction() }><img src={copyIcon}/> <p>Copy</p></button>
                  <button onClick={() =>this.state.deleteAction() }><img src={deleteIcon}/> <p>Delete</p></button>
                  <button onClick={() =>this.state.createAction() }><img src={emailIcon}/> <p>Email</p></button>
                  <button onClick={() =>this.state.createAction() }><img src={printIcon}/> <p>Print</p></button>
                  <button onClick={() =>this.state.createAction() }><img src={exportIcon}/> <p>Export</p></button>
                  <button onClick={() =>this.state.createAction() }><img src={refreshIcon}/> <p>Refresh</p></button>
              </div>
              <ModalC show = {this.state.showModal.show} options = {this.state.showModal}/>
          </div>)
              }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab,
        deleteCall: state.deleteCall
    };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, DeleteAction), dispatch)
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(ActionMenu);
