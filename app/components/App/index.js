import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Login from '../../containers/Login'
import {loginUser} from '../../actions/login'
import './style.scss'
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      if(!this.props.auth.isAuthenticated){
        return (
          <Login onLoginClick={ (creds) => this.props.loginUser(creds) }/>
        )
      }
      else{
        return (
          <div className="flex-col flex">
              <Header/>
              { this.props.children }
          </div>
      );
      }


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.login.auth
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: creds => dispatch(loginUser(creds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
