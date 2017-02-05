import React, { Component, PropTypes } from 'react'

class Login extends Component {
  constructor(props){
    super(props)
  }
  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    return (
      <div>
        <input type='text' ref='username' className="form-control" placeholder='Username' required/>
        <input type='password' ref='password' className="form-control" placeholder='Password' required/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
      </div>
    )
  }

}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
export default Login
