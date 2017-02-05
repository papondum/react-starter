import React, {PropTypes} from 'react';
import {getJsonFromUtil} from '../../../utils'
import { connect } from 'react-redux';
import ContentForm from '../../../containers/ContentForm'
import {get } from '../../../../utils'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state={'content':[]
        }
    }

    getJson(url){
          get(url)
          .then((response)=> {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            this.setState({'content': response})
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
          this.getJson('/api/organization/all')
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

        default:
          this.setState({'content':''})
          break;
      }
    }

    componentWillReceiveProps() {
      this._getContent(this.props.tab.activeTabs)
      // this.setState({'content': this.getJson('/users')})
    }

    render() {
        return(
    <div className='content-style'>
        <ContentForm type = {this.props.contentHeader} content = {this.state.content}/>
    </div>);}
}
const mapStateToProps = (state) => {
    return {
        tab: state.tab
    };
};

export default connect(
    mapStateToProps
)(Content);
