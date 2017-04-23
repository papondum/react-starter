import React, {PropTypes} from 'react';
import TabList from './TabList';
import { connect } from 'react-redux';
import { openTab ,closeTab} from '../../actions/tab';
import Content from './Content';
// import ActionMenu from '../ActionMenu'
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
        get(url)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          this.setState({'mainContent': response})
        })
        .catch(err=>console.log(err))
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
          break;
        case 'Delivery Order':
          this.getJson('/api/inventory/do/all')
          break;
        case 'Good Receipt':
          this.getJson('/api/inventory/gr/all')
          break;
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

    render() {
        return(

          <div className="mainContent">
              <TabList tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)} closeTab= {(tab) => this.props.closeTab(tab)}/>


              {/* content will recieve some prop that from ticked */}
              <Content
                  contentHeader = {this.state.openedTab}
                  mainContent={this.state.mainContent}
                  checkedSingleItem={(item)=>this.checkedSingleItem(item)}
                  activePage={this.props.tab.activeTabs}
                  getContent={(item)=>this._getContent(item)}
                  setContent={(item)=>this.setContent(item)}
                  showModal={()=>this.showModal()}
                  editItem = {this.state.editItem}
                  get = {(url)=>get(url)}
                  blockBtn = {this.props.blockBtn}
              />
              <div className='bottom-counter'>Found {this.state.mainContent.length} objects</div>
              <Modal show = {this.state.showModal.show} options = {this.state.showModal.show}/>
          </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        tab: state.tab,
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
