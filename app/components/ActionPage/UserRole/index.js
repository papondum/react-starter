import React, {PropTypes} from 'react';
import './style.scss';
class UserRole extends React.Component {
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
                <button onClick={()=>this.props.getContent('User account')}>Cancel</button>
                <button>Save</button>
              </div>
            </div>
            <hr/>



            <div className='flex'>
              <div className='input-box left'>
                <label>Firstname</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Lastname</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Username</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Password</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Email</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Role</label>
                <input className='flex' type="text"/>
              </div>
            </div>
          </div>)
    }
}

export default UserRole;
