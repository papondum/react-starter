import React, {PropTypes} from 'react';
import { post ,get } from '../../../../../utils'
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import './style.scss'
class Quotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          customerList: [],
          inputValid:true
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Quotaion'
      }
      else if(type=='edit'){
        return 'Edit - Quotation'
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

    getCustomerList(){
      let url = '/api/customer/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({customerList:response})
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
      this.getCustomerList()
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
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button><p>Email</p></button>
                      <button><p>Print</p></button>
                      <button onClick={()=>this.props.getContent('Customer')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createCustomer()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>

              <div>
                  <div className='flex flex-row'><div className='tab-quo'>General</div><div className='tab-quo'>Contact</div></div>
                  <hr/>
                  <div className="flex flex-row">
                      <div className='flex flex-1 flex-col'>
                          <div className='input-box flex'>
                              <label>Customer :</label>
                              <input className='flex' type="text" ref='customer'/>
                          </div>
                          <div className='input-box flex'>
                              <label>Date :</label>
                              <input className='flex' type="date" ref='date'/>
                          </div>
                          <div className='input-box flex'>
                              <label>Payment Term :</label>
                              <input className='flex' type="text" ref='payment'/>
                          </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                          <div className='input-box flex'>
                              <label>Deliver Term :</label>
                              <input className='flex' type="text" ref='deliver'/>
                          </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                          <div className='input-box flex'>
                              <label>Status :</label>
                              <input className='flex' type="text" ref='status'/>
                          </div>
                          <div className='input-box flex'>
                              <label>Saleperson :</label>
                              <input className='flex' type="text" ref='saleprtson'/>
                          </div>
                          <div className='input-box flex'>
                              <label>Price list :</label>
                              <input className='flex' type="text" ref='pricelist'/>
                          </div>
                      </div>
                  </div>
              </div>
              <hr/>
              <div className="flex flex-row"><div className='tab-quo'>Contact</div><div>+</div></div>

          </div>)
        }
    }


export default Quotation;
