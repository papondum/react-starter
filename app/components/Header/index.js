import React from 'react';
import './style.scss';
import LogoIcon from '../../resource/Icon/codex_logo.png'
import {logoutUser} from '../../actions/login'
import { connect } from 'react-redux';
class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className="header flex">
            <img className = 'codex-icon' src={LogoIcon}/>
            Headser
            <div className='flex-1'>&nbsp;</div>
            
            <div>Seting</div>
            <div onClick={() => this.props.logoutUser()}>Logout</div>
          </div>
      );
    }
}
const mapStateToProps = (state) => {
  return {
      user: state.login.auth.user
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
