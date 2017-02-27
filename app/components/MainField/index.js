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
            mainField: '',
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
            mainField: item
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
        default:
          this.setState({'mainContent':''})
          break;
      }
    }

    componentWillReceiveProps(nextProps) {
      this._getContent(nextProps.tab.activeTabs)
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
        return <ActionMenu activePage={this.props.tab.activeTabs} getContent={(item)=>this._getContent(item)} setContent={(item)=>this.setContent(item)} showModal={()=>this.showModal()} editItem = {this.state.editItem}/>
      }
    }

    render() {
        return(

          <div className="mainContent">
              <TabList tab = {this.props.tab} openContent = {(item) => this._getMainFieldFromTab(item)} closeTab= {(tab) => this.props.closeTab(tab)}/>


              {this.showActionMenu()}

              {/* content will recieve some prop that from ticked */}
              <Content contentHeader = {this.state.mainField} mainContent={this.state.mainContent} checkedSingleItem = {(item)=>this.checkedSingleItem(item)}/>
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
