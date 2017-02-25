import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roleList: [],
          inputValid:true
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - User account'
      }
      else if(type=='edit'){
        return 'Edit - User account'
      }
    }

    updateUser(){
      let firstname = this.refs.firstname.value
      let lastname = this.refs.lastname.value
      let username = this.refs.username.value
      let password = this.refs.password.value
      let email = this.refs.email.value
      let role = this.refs.role.value
      if(firstname&&lastname&&password&&email&&role){
        post('/user/create',{"firstname":firstname, "lastname":lastname, "username":username, "password":password, "email":email, "role": role})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('User account')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('invalid Input');
      }
    }

    getRoleList(){
      let url = '/api/role/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({roleList:response})
      })
      .catch(err=>console.log(err))
    }

    roleListToElem(){
      let result = this.state.roleList.map(i=><option key = {i.id} value = {i.id}>{i.name}</option>)
      return result
    }

    componentDidMount(){
      this.getRoleList()
    }



    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick = {() => this.props.getContent('User account')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.updateUser()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>

              <div className='flex'>
                  <div className='input-box left flex'>
                      <label><i>Firstname : </i></label>
                      <input className='flex' type="text" ref = 'firstname'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Lastname : </i></label>
                      <input className='flex' type="text" ref = 'lastname'/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box left flex'>
                      <label><i>Username : </i></label>
                      <input className='flex' type="text" ref = 'username'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Password : </i></label>
                      <input className='flex' type="password" ref = 'password'/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box left flex'>
                      <label><i>Email : </i></label>
                      <input className='flex' type="text" ref = 'email'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Role : </i></label>
                      <select style={{'width': '173px'}} ref = 'role'>
                          {this.roleListToElem()}
                      </select>
                  </div>
              </div>
          </div>)
    }
}


export default UserAccount;
