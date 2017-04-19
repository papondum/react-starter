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
import Content from '../MainField/Content';
import UserAccount from '../ActionPage/MasterFile/UserAccount'
import Customer from '../ActionPage/MasterFile/Customer'
import Userrole from '../ActionPage/MasterFile/UserRole'
import Supplier from '../ActionPage/MasterFile/Supplier'
import PriceList from '../ActionPage/MasterFile/PriceList'
import Product from '../ActionPage/MasterFile/Product'
import Brand from '../ActionPage/MasterFile/Brand'
import FilmType from '../ActionPage/MasterFile/FilmType'
import Grade from '../ActionPage/MasterFile/Grade'
import Quotation from '../ActionPage/Sales/Quotation'
import Salesorder from '../ActionPage/Sales/SalesOrder'
import Purchase from '../ActionPage/Purchase'
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
      mainContent:''
      // showCreateModal:{
      //   show:false
      // },
    };
  }
  getConfirm(){
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

  // showCreateGoodReceipt(){
  //   this.setState({
  //     showCreateModal:{
  //       show:true,
  //       header:'Please select',
  //       close:()=>{
  //         this.setState({
  //           showCreateModal:{
  //             show:false
  //           }
  //         })
  //       },
  //       confirm:()=>{
  //         this.props.deleteTrig(this.props.activePage)  //state change to active delete  >> go to ContentForm
  //         this.props.getContent(this.props.activePage)
  //         this.setState({showCreateModal:{show:false}})
  //       },
  //       submitTxt:'SUMMIT'
  //     }
  //   })
  // }

  componentDidMount(){
    this._setActionCategory()
    this.getConfirm()
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
    setTimeout(() => {
      switch (this.props.activePage) {
        case 'User account':
        this.setState({
          createAction:()=>this.props.setContent((<UserAccount type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<UserAccount type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
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
          editAction:()=>this.props.setContent((<Userrole type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshActiosn:'',
        })
        break;
        case 'Customer':
        this.setState({
          createAction:()=>this.props.setContent((<Customer type='create' getContent={(item)=>this.props.getContent(item)}/>)),   //set new content when click this menu
          editAction:()=>this.props.setContent((<Customer type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(), //no need change contnt just popup modal cover old
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Supplier':
        this.setState({
          createAction:()=>this.props.setContent((<Supplier type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Supplier type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Price list':
        this.setState({
          createAction:()=>this.props.setContent((<PriceList type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<PriceList type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Product':
        this.setState({
          createAction:()=>this.props.setContent((<Product type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Product type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Brand':
        this.setState({
          createAction:()=>this.props.setContent((<Brand type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Brand type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Film Type':
        this.setState({
          createAction:()=>this.props.setContent((<FilmType type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<FilmType type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Grade':
        this.setState({
          createAction:()=>this.props.setContent((<Grade type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Grade type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Quotation':
        this.setState({
          createAction:()=>this.props.setContent((<Quotation type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Quotation type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Sales Order':
        this.setState({
          createAction:()=>this.props.setContent((<Salesorder type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Salesorder type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Purchase Order':
        this.setState({
          createAction:()=>this.props.setContent((<Purchase type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Purchase type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Delivery Order':
        this.setState({
          createAction:()=>this.props.setContent((<Delivery type='create' getContent={(item)=>this.props.getContent(item)}/>)),
          editAction:()=>this.props.setContent((<Delivery type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        case 'Good Receipt':
        // content form :: create >> slect type ::>> track on content-form
        // create dialog modal selector then set content to good Receipt with selected value
        this.setState({
          createAction:()=>this.props.setContent((<Content
              contentHeader = {this.state.openedTab}
              isChooser= {true}
              mainContent={this.state.mainContent}
              activePage={this.props.tab.activeTabs}
              getContent={(item)=>this._getContent(item)}
              setContent={(item)=>this.setContent(item)}
              editItem = {this.state.editItem}
              get = {(url)=>get(url)}
                                                  />)),
          // createAction:()=> this.showCreateGoodReceipt(),
          editAction:()=>this.props.setContent((<GoodReceipt type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} objFromFetch={this.props}/>)),
          copyAction:'',
          deleteAction:()=>this.showDeleteModal(),
          emailAction:'',
          printAction:'',
          exportAction:'',
          refreshAction:'',
        })
        break;
        default:
      }
    }, 100);
  }

  _addNotification(event , type) {
    this.state._notificationSystem.addNotification({
      message: event+' ' + 'item was deleted',
      level: type
    })
  }

  // createGoodReceiptSelect(type){
  //   if(type=='withRef'){
  //
  //   }
  //   else if(type=='withoutRef'){
  //     this.props.setContent((<GoodReceipt type='create' getContent={(item)=>this.props.getContent(item)}/>))
  //   }
  //   else{
  //     console.log(type);
  //   }
  // }

  render() {
    console.log(this.props.selected)
    return(
      <div className='flex action-bar' >
          <h2>{typeof this.props.activePage!='object'? this.props.activePage:''}</h2>
          <div className='action-group-btn'>
              <button onClick={() =>this.state.createAction() }><img src={createIcon}/> <p>Create</p></button>
              <button
                  onClick={() => this.state.editAction()}
                  disabled={this.props.selected.length !== 1 || (this.props.activePage === 'Quotation' && ['Complete', 'Canceled'].includes(this.props.selected[0].Status))}
              >
                  <img src={editIcon}/> <p>Edit</p>
              </button>
              <button onClick={() =>this.state.createAction() }><img src={copyIcon}/> <p>Copy</p></button>
              <button onClick={() =>this.state.deleteAction()} disabled = {this.props.editItem? false:true}><img src={deleteIcon}/> <p>Delete</p></button>
              <button onClick={() =>this.state.createAction() }><img src={emailIcon}/> <p>Email</p></button>
              <button onClick={() =>this.state.createAction() }><img src={printIcon}/> <p>Print</p></button>
              <button onClick={() =>this.state.createAction() }><img src={exportIcon}/> <p>Export</p></button>
              <button onClick={() =>this.state.createAction() }><img src={refreshIcon}/> <p>Refresh</p></button>
          </div>

          <ModalC show = {this.state.showModal.show} options = {this.state.showModal}/>
          {/* <Modal show = {this.state.showCreateModal.show} options = {this.state.showCreateModal}>
              <div>
              <div className = 'modal-content-body'>
              <div className = 'top-content modal-selector'>
              <select ref = {'createType'} value = {this.state.eFilmType}  >
              <option  value = {'withoutRef'}>{'Create without reference'}</option>
              </select>
              </div>
              </div>
              <div className = 'modal-content-bot actions button'>
              <button className = 'material-btn confirm-style' onClick ={()=>this.createGoodReceiptSelect(this.refs['createType'].value)}>Next ></button>
              </div>
              </div>
          </Modal> */}
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
