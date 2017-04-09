import React, {PropTypes} from 'react';
import TabList from './TabList';
import { connect } from 'react-redux';
import { openTab ,closeTab} from '../../actions/tab';
import Content from './Content';
import ActionMenu from '../ActionMenu'
import Modal from '../Modal/Confirm'
import ModalCustom from '../Modal/Custom'
import {get } from '../../../utils'
import './style.scss'
class MainField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedTab: '',
            mainContent:'',
            showModal:{
              show:false
            },
            editItem:''
        };
    }

    showModal(){
      this.setState({
        showModal:{
          show:true,
          close:()=>
          this.setState({
            showModal:{
              show:false
            }
          }),
          submitTxt:'SUBMIT'
        }
      })
    }
    _getMainFieldFromTab(item) {
        this.props.onOpenTab([item])
        this.setState({
            openedTab: item
        });
    }

    getJson(url){
      console.log('getcontent');
      if(url === 'Purchase Order'){
        this.setState({
          'mainContent': [
            {
              "P/O No." : "DEC5910/261",
              "Order Date": "11/10/2017",
              ETD: '',
              ETA: '',
              "Supplier Name" : 'TGCH Inc.',
              Buyer : 'Admin',
              "Total Amount (THB)" : "150,000.50",
              "Document Status" : "Released",
              "Receiving Status" : "0%",
              id:'0001'
            },
            {
              "P/O No." : "DEC5910/260",
              "Order Date": "11/10/2017",
              ETD: '',
              ETA: '',
              "Supplier Name" : 'TGCH Inc.',
              Buyer : 'Admin',
              "Total Amount (THB)" : "150,000.50",
              "Document Status" : "Released",
              "Receiving Status" : "0%",
              id:'0002'
            }
          ]
        })
      }
      else if (url === 'Sales Order') {
        this.setState({
          'mainContent': [
            {
              "Order No." : 'SQ0001',
              "Order Date": new Date('2015-05-11').toString(),
              "P/O No.": "SN59",
              "Request Date": new Date('2015-05-11').toString(),
              "Customer Name" : "TPBG Inc.",
              Salesperson : 'Admin',
              "Total Amount (THB)" : "150,000.50",
              "Document Status" : "Released",
              "Shipping Status" : "0%",
              id:'1'
            },
            {
              "Order No." : 'SQ0002',
              "Order Date": new Date('2015-05-11').toString(),
              "P/O No.": "SN59",
              "Request Date": new Date('2015-05-11').toString(),
              "Customer Name" : "TPBG Inc.",
              Salesperson : 'Admin',
              "Total Amount (THB)" : "150,000.50",
              "Document Status" : "Released",
              "Shipping Status" : "0%",
              id:'2'
            }
          ]
        })
      }
      else{
        get(url)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          this.setState({'mainContent': response})
        })
        .catch(err=>console.log(err))
      }
    }

    _getContent(category){

      switch (category) {
        case 'User account':
          this.getJson('/api/user/all')
          break;
        case 'User role':
          this.getJson('/api/role/all')
          break;
        case 'Customer':
          this.getJson('/api/customer/all')
          break;
        case 'Supplier':
          this.getJson('/api/supplier/all')
          break;
        case 'Price list':
          this.getJson('/api/price_list/all')
          break;
        case 'Product':
          this.getJson('/api/product/all')
          break;
        case 'Brand':
          this.getJson('/api/brand/all')
          break;
        case 'Film Type':
          this.getJson('/api/film/all')
          break;
        case 'Grade':
          this.getJson('/api/grade/all')
          break;
        case 'Quotation':
          this.getJson('/api/sales/quotation/all')
          break;
        case 'Sales Order':
          this.getJson('/api/sales/order/all')
          break;
        case 'Purchase Order':
          this.getJson('/api/purchase/all')
          // this.getJson('Purchase Order')
          break;
        //case 'Delivery Order':
          //this.getJson('/api/inventory/delivery/all')
          //break;
        //case 'Good Receipt':
          //this.getJson('/api/inventory/good/all')
          //break;
        default:
          this.setState({'mainContent':''})
          break;
      }
    }

    openContentWhenActiveTabChange(nextProps){
      this._getContent(nextProps.tab.activeTabs)
      this.setState({
          openedTab: nextProps.tab.activeTabs
      });
    }

    componentWillReceiveProps(nextProps) {
      this.openContentWhenActiveTabChange(nextProps)
    }

    setContent(content){
      this.setState({
        mainContent:content
      })
    }

    checkedSingleItem(item){
      this.setState({
        editItem:item
      })
    }

    showActionMenu(){
      if(this.state.mainContent.length==undefined){
        return ''
      }
      else{
        return <ActionMenu
            activePage={this.props.tab.activeTabs}
            getContent={(item)=>this._getContent(item)}
            setContent={(item)=>this.setContent(item)}
            showModal={()=>this.showModal()}
            editItem = {this.state.editItem}/>
      }
    }

    render() {
      //mainContent is raw data from api return as array object
        // {this.showActionMenu()}
        return(

          <div className="mainContent">
              <TabList tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)} closeTab= {(tab) => this.props.closeTab(tab)}/>


              {/* content will recieve some prop that from ticked */}
              <Content
                  contentHeader = {this.state.openedTab}
                  mainContent={this.state.mainContent}
                  checkedSingleItem = {(item)=>this.checkedSingleItem(item)}
                  activePage={this.props.tab.activeTabs}
                  getContent={(item)=>this._getContent(item)}
                  setContent={(item)=>this.setContent(item)}
                  showModal={()=>this.showModal()}
                  editItem = {this.state.editItem}/>
              <div className='bottom-counter'>Found {this.state.mainContent.length} objects</div>
              <Modal show = {this.state.showModal.show} options = {this.state.showModal.show}/>
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
        onOpenTab: tab => dispatch(openTab(tab)),
        closeTab: tab => dispatch(closeTab(tab))
    };
};
export default connect(
    mapStateToProps,mapDispatchToProps
)(MainField);
