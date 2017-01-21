import React, {PropTypes} from 'react';
// import {getJson} from '../../../utils'
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
            this.setState({'content': data})
          })
    }


    componentDidMount() {
      this.setState({'content': this.getJson('http://localhost:4040/users')})
    }


    render() {
        return(
    <div className="flex">
        {this.props.content}
        {console.log(this.state.content)}
    </div>);}
}

export default Content;
