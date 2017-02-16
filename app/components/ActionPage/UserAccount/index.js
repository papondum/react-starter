import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
class UserAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - User account'
      }
      else if(type=='edit'){
        return 'Edit - User account'
      }
    }

    render() {
        return(
          <div className='page-style'>
            <div className='page-head'>
              <h2>{this._genHeader(this.props.type)}</h2>
              <div className='action-group-btn'>
                <button onClick={()=>this.props.getContent('User account')}><img src={cancelIcon}/><p>Cancel</p></button>
                <button><img src={saveIcon}/><p>Save</p></button>
              </div>
            </div>
            <hr/>



            <div className='flex'>
              <div className='input-box left flex'>
                <label>Firstname:</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box flex'>
                <label>Lastname:</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left flex'>
                <label>Username:</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box flex'>
                <label>Password:</label>
                <input className='flex' type="password"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left flex'>
                <label>Email:</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box flex'>
                <label>Role:</label>
                  <select style={{'width': '173px'}}>
                      <option value="Administrator">Administrator</option>
                      <option value="User">User</option>
                    </select>
              </div>
            </div>
          </div>)
    }
}

export default UserAccount;
