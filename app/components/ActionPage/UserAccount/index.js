import React, {PropTypes} from 'react';
import './style.scss';
class UserAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <div>
              <div>
                <label>Firstname</label>
                <input type="text"/>
              </div>
              <div>
                <label>Lastname</label>
                <input type="text"/>
              </div>
            </div>
            <div>
              <div>
                <label>Username</label>
                <input type="text"/>
              </div>
              <div>
                <label>Password</label>
                <input type="text"/>
              </div>
            </div>
            <div>
              <div>
                <label>Email</label>
                <input type="text"/>
              </div>
              <div>
                <label>Role</label>
                <input type="text"/>
              </div>
            </div>
          </div>)
    }
}

export default UserAccount;
