import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ContentForm from '../../../containers/ContentForm'
import ActionMenu from '../../ActionMenu'
import ActionSubMenu from '../../ActionSubMenu'
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
      return <div>
          <ActionMenu
              setSelected={selected => this.setState({ selected })}
              selected={this.state.selected}
              activePage={this.props.activePage}
              getContent={item => this.props.getContent(item)}
              setContent={item => this.props.setContent(item)}
              showModal={()=>this.props.showModal()}
              editItem = {this.props.editItem}/>
          <ContentForm
          setSelected={selected => this.setState({ selected })}
          type={this.props.contentHeader}
          content={this.props.mainContent}
          checkedSingleItem={(item)=>this.props.checkedSingleItem(item)}/>
      </div>
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
      <div style={{overflow: 'scroll', height: 'calc(100% - 98px)'}}>
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
