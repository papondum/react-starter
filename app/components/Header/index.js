import React from 'react';
import './style.scss';
import LogoIcon from '../../resource/Icon/codex_logo.png'
class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className="header">
            <img className = 'codex-icon' src={LogoIcon}/>
            Headser
          </div>
      );
    }
}

export default Header;
