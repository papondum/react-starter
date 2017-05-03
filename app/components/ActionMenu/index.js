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
import refreshIcon from '../../resource/Icon/button_refresh.png'
import Modal from '../Modal/Custom'
import ModalC from '../Modal/Confirm'
import Content from '../MainField/Content';
import UserAccount from '../ActionPage/MasterFile/UserAccount'
import Userrole from '../ActionPage/MasterFile/UserRole'
import Delivery from '../ActionPage/Inventory/Delivery'
import GoodReceipt from '../ActionPage/Inventory/GoodReceipt'
import {get } from '../../../utils'
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
      },
      mainContent:'',
      disableDelete:false,
      disableEdit:false,
      userId:'',
    };
  }
  _getConfirm(){
    get('/api/inventory/gr/list_confirmed_po')
    .then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      this.setState({'mainContent': response})
    })
    .catch(err=>console.log(err))
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
          this.setState({showModal:{show:false}})
        },
        submitTxt:'SUMMIT'
      }
    })
  }

  _getUserId(){
    let url = '/api/user/all'
    get(url)
    .then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      let userId = response.find(i=>i.Firstname==this.props.username);
      this.setState({userId:userId.id})
    })
    .catch(err=>console.log(err))
  }

  componentDidMount(){
    this._setActionCategory()
    this._getConfirm()
    this._getUserId()
    this.disabledDeleteCheck('init')
    this.disabledEditCheck('e')
    this._permissionBlock()
  }

  _permissionBlock(){
    console.log(this.props.blockBtn);
  }

  componentWillReceiveProps(nextProps){
    this.disabledDeleteCheck(nextProps)
    this.disabledEditCheck(nextProps)
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
    setTimeout(() => {
      switch (this.props.activePage) {
        case 'User account':
        this.setState({
          createAction:()=>this.props.setContent((<UserAccount type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction: ()=>this.props.setContent((<UserAccount type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction: ()=>this.props.setContent((<UserAccount type='copy' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:()=>this.props.getContent('User account'),
        })
        break;
        case 'User role':
        this.setState({
          createAction:()=>this.props.setContent((<Userrole type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Userrole type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction: ()=>this.props.setContent((<Userrole type='copy' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshActiosn:()=>this.props.getContent('User role'),
        })
        break;
        case 'Delivery Order':
        this.setState({
          createAction: ()=>this.props.setContent((<Delivery type='create' getContent={(item)=>this.props.getContent(item)} username = {this.state.userId}/>)),
          editAction: ()=>this.props.setContent((<Delivery type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction: ()=>this.props.setContent((<Delivery type= 'copy' getContent={(item)=> this.props.getContent(item)} editItem= {this.props.editItem} objFromFetch= {this.props}/>)),
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:()=>this.props.getContent('Delivery Order'),
        })
        break;
        case 'Good Receipt':
        this.setState({
          createAction:()=>this.props.setContent((<Content
              contentHeader = {this.state.openedTab}
              isChooser= {true}
              checkedSingleItem={(item)=>this.props.checkedSingleItem(item)}
              mainContent={this.state.mainContent}
              activePage={this.props.tab.activeTabs}
              getContent={(item)=>this.props.getContent(item)}
              setContent={(item)=>this.props.setContent(item)}
              editItem = {this.props.editItem}
              get = {(url)=>get(url)}
              username = {this.state.userId}
                                                  />)),
          editAction:()=>this.props.setContent((<GoodReceipt type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction: ()=>this.props.setContent((<GoodReceipt type='copy' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:()=>this.props.getContent('Good Receipt'),
        })
        break;
        default:
      }
    }, 100);
  }

  disabledDeleteCheck(next){
    if(this.props.tab.activeTabs=='Delivery Order'||
      this.props.tab.activeTabs=='Delivery Order'||
      this.props.tab.activeTabs=='User account'||
      this.props.tab.activeTabs=='Customer'||
      this.props.tab.activeTabs=='Supplier'||
      this.props.tab.activeTabs=='Product'||
      this.props.tab.activeTabs=='Brand'||
      this.props.tab.activeTabs=='Film Type'||
      this.props.tab.activeTabs=='Grade' ){
      this.setState({disableDelete:true})
    }
    else if(next=='init'){
      this.setState({disableDelete:true})
    }
    else{
      if(next.editItem){
        this.setState({disableDelete:false})
      }
      else {
        this.setState({disableDelete:true})
      }
    }
  }

  disabledEditCheck(){

  }

  _blockChecker(name){
    switch (name) {
      case 'email':
      if(this.props.blockBtn.emailList){
        let res = this.props.blockBtn.emailList.find(i=>i==this.props.activePage)
        return res? 'disabledbutton':''}
        break;
      case 'edit':
      if(this.props.blockBtn.editList){
        let res0 = this.props.blockBtn.editList.find(i=>i==this.props.activePage)
        return res0? true:false}
        break;
      case 'export':
      if(this.props.blockBtn.exportList){
        let res1 = this.props.blockBtn.exportList.find(i=>i==this.props.activePage)
          return res1? 'disabledbutton':''}
        break;
      case 'print':
      if(this.props.blockBtn.printList){
        let res2 = this.props.blockBtn.printList.find(i=>i==this.props.activePage)
          return res2? 'disabledbutton':''
        }
        break;
      default:

    }

  }


  render() {
    //edit email export print
    return(
      <div className='flex action-bar' >
          <h2>{typeof this.props.activePage!='object'? this.props.activePage:''}</h2>
          <div className='action-group-btn'>
              <button onClick={() =>this.state.createAction() }><img src={createIcon}/> <p>Create</p></button>
              <button className = {(this.props.selected.length !== 1 || (this.props.activePage === 'Quotation' && ['Complete', 'Canceled'].includes(this.props.selected[0].Status))||this._blockChecker('edit'))? 'disabledbutton':''}
                  onClick={() => this.state.editAction()}
              >
                  <img src={editIcon}/> <p>Edit</p>
              </button>
              <button className = {this.props.selected.length !== 1? 'disabledbutton':''} onClick={() =>this.state.copyAction() } disabled={this.props.selected.length !== 1}><img src={copyIcon}/> <p>Copy</p></button>
              <button className = {this.state.disableDelete? 'disabledbutton':''} onClick={() =>this.state.deleteAction()}><img src={deleteIcon}/> <p>Delete</p></button>
              <button className = {this._blockChecker('email')} onClick={() =>this.state.createAction() }><img src={emailIcon}/> <p>Email</p></button>
              <button className = {this._blockChecker('print')} onClick={() =>this.state.createAction() }><img src={printIcon}/> <p>Print</p></button>
              <button className = {this._blockChecker('export')} onClick={() =>this.state.createAction() }><img src={exportIcon}/> <p>Export</p></button>
              <button onClick={() =>this.state.refreshAction() }><img src={refreshIcon}/> <p>Refresh</p></button>
          </div>

          <ModalC show = {this.state.showModal.show} options = {this.state.showModal}/>

      </div>)
    }
  }

  const mapStateToProps = (state) => {
    return {
      tab: state.tab,
      username: state.login.auth.user,
    };
  };

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}), dispatch)
  }

  export default connect(
    mapStateToProps,mapDispatchToProps
  )(ActionMenu);
