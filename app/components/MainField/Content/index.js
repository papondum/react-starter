import React, {PropTypes} from 'react';
import {getJsonFromUtil} from '../../../utils'
import { connect } from 'react-redux';
import ContentForm from '../../../containers/ContentForm'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state={'content':[]
        }
    }

    getJson(url){
          fetch(url)
          .then((response)=> {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data)=> {
            this.setState({'content': data})            // get content from link
          })
    }

    _getContent(category){
      switch (category) {
        case 'User account':
          this.getJson('http://localhost:4040/users')
          break;
        case 'User role':
          this.getJson('http://localhost:4040/roles')
          break;
        case 'Customer':
          this.getJson('http://localhost:4040/customer')
          break;
        case 'Supplier':
          this.getJson('http://localhost:4040/users')
          break;
        case 'Price list':
          this.getJson('http://localhost:4040/users')
          break;
        case 'Product':
          this.getJson('http://localhost:4040/products')
          break;
        case 'Brand':
          this.getJson('http://localhost:4040/brands')
          break;
        case 'Film Type':
          this.getJson('http://localhost:4040/film')
          break;

        default:
          this.setState({'content':''})
          break;
      }
    }
    componentDidMount(){
      this._getContent(this.props.tab.activeTabs)
    }
    componentWillReceiveProps() {
      this._getContent(this.props.tab.activeTabs)
      // this.setState({'content': this.getJson('http://localhost:4040/users')})
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
