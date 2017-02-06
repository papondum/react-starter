import React from 'react';
import './style.scss';
import LogoIcon from '../../resource/Icon/codex_logo.png'
import {logoutUser} from '../../actions/login'
import { connect } from 'react-redux';
import logoutIcon from '../../resource/Icon/logout.png'
import settingtIcon from '../../resource/Icon/setting.png'
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          mainHeader:'codex',
          subHeader:''
        }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.head!=undefined){
        this.setState({
          mainHeader:nextProps.head
        })
      }
      if(nextProps.sub!=undefined){
        this.setState({
          subHeader:nextProps.sub
        })
      }
    }

    render() {
        return (
          <div className="header flex">
            <img className = 'codex-icon' src={LogoIcon}/>
            <div className='header-text'>
              <p>{this.state.mainHeader}</p>
              <p className="sub-text">{this.state.subHeader}</p>
            </div>
            <div className='flex-1'>&nbsp;</div>
            <div className = "action-group-btn" >
              <button>
                <img className='icon' src={settingtIcon}/>
                <p>Setting</p>
              </button>
              <button onClick={() => this.props.logoutUser()}>
                <img className='icon' src={logoutIcon}/>
                <p>Logout</p>
              </button>
            </div>
          </div>
      );
    }
}
const mapStateToProps = (state) => {
  return {
      user: state.login.auth.user,
      head: state.tab.mainHeadText,
      sub:  state.tab.subHeadText
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
