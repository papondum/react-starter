import React from 'react';
import './style.scss';
import LogoIcon from '../../resource/Icon/codex_logo.png'
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
            <div>Accout name</div>
              <div>Seting</div>
            <div>Logout</div>
          </div>
      );
    }
}

export default Header;
