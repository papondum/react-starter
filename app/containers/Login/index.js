import React, { Component, PropTypes } from 'react'
import './style.scss'
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
        <div className='input-group'>
          <h2>Log in to Codex ERP</h2>
          <p>Please enter your credentials to access system.</p>
          <input type='text' ref='username' className="form-control" placeholder='Username' required/>
          <input type='password' ref='password' className="form-control" placeholder='Password' required/>
          <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
            Log in
          </button>
        </div>
        <footer>
          <p>
          Copyright &#169; 2016 Digital Partner Co.,Ltd All right reserved
        </p>
        </footer>
      </div>
    )
  }

}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
export default Login
