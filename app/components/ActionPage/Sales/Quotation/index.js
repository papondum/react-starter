import React, {PropTypes} from 'react';
import { post ,get } from '../../../../../utils'
class Quotation extends React.Component {
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
      let url = this.props.type=='create'? '/api/user/create':'/api/user/update'

      if(firstname&&lastname&&password&&email&&role){
        post(url,{"firstname":firstname, "lastname":lastname, "username":username, "password":password, "email":email, "role": role})
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

    getInitialVal(){        //Edit    2
      post('/api/user/id',{"user_id":this.props.editItem})
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        //Notify fn value added
        // this.setState({editItem:response})
        this.setEditItem(response)
      })
      .catch(err=>console.log(err))
    }

    componentDidMount(){
      this.getRoleList()
      this.getInitialVal()    //Edit    1
    }


    setEditItem(obj){         //Edit    3
      if(obj){
        this.refs['firstname'].value = obj[0].firstname
        this.refs['lastname'].value = obj[0].lastname
        this.refs['username'].value = obj[0].username
        this.refs['password'].value = obj[0].password
        this.refs['email'].value = obj[0].email
        this.refs['role'].value = obj[0].role_id
      }
    }


    render() {
        return(
          <div className='page-style'>
          </div>)
    }
}


export default Quotation;
