import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../Header';
import { connect } from 'react-redux';
import Login from '../../containers/Login'
import {loginUser} from '../../actions/login'
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      const { errorMessage ,dispatch} = this.props
      if(!this.props.auth.isAutenticated){

        return (
          <Login
                errorMessage={errorMessage}
                onLoginClick={ (creds) => loginUser(creds) }
              />
        )
      }
      else{
        return (
          <div className="flex-col flex">
            <Header/>
            { this.props.children }
            <div>
                <Link to="/">Filterable Table</Link>
                <Link to="/about">About</Link>
            </div>
          </div>
      );
      }


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.login.auth
    };
};

export default connect(
    mapStateToProps
)(App);
