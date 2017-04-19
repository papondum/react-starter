import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ContentForm from '../../../containers/ContentForm'
import ActionMenu from '../../ActionMenu'
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import nextIcon from '../../../resource/Icon/button_next.png'
import ActionSubMenu from '../../ActionSubMenu'
import './style.scss'
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      subContent: '',
      selected: [],
      activePage: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.activePage !== this.state.activePage) {
      this.setState({
        selected: [],
        activePage: nextProps.activePage,
      })
    }

  }

  pageChecker(){
    if(this.props.mainContent.length != undefined){
      if(this.props.isChooser){
        return <div>
            <div className='page-head'>
                <h2>Create - Good Reciept - Choose Purchase Order</h2>
                <div className='action-group-btn'>
                    <button  onClick = {()=>this.props.getContent('Good Receipt')}><img src={cancelIcon}/><p>Cancel</p></button>
                    <button ><img src={nextIcon}/><p>Next</p></button>
                </div>
            </div>
            <ContentForm
                setSelected={selected => this.setState({ selected })}
                type={'Choose GoodReceipt'}
                content={this.props.mainContent}
                checkedSingleItem={(item)=>this.props.checkedSingleItem(item)}
                isFromCreate = {true}
            />
        </div>
      }
      else{
        return <div>
            <ActionMenu
                setSelected={selected => this.setState({ selected })}
                selected={this.state.selected}
                activePage={this.props.activePage}
                getContent={item => this.props.getContent(item)}
                setContent={item => this.props.setContent(item)}
                checkedSingleItem={(item)=>this.props.checkedSingleItem(item)}
                showModal={()=>this.props.showModal()}
                editItem = {this.props.editItem}/>
            <ContentForm
                setSelected={selected => this.setState({ selected })}
                type={this.props.contentHeader}
                content={this.props.mainContent}
                checkedSingleItem={(item)=>this.props.checkedSingleItem(item)}/>
        </div>
      }
    }
    else{
      // <ActionSubMenu type='edit' getContent={(item)=>this.props.getContent(item)} editItem={this.props.editItem} activePage={this.props.activePage}/>
      // * sub menu + content
      return  <div>
          {this.props.mainContent}
      </div>
    }
  }

  render() {
    return(
      // <div className='content-style'>
      <div className = {this.props.isChooser? '':'content-style'}>
          {this.pageChecker()}
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
