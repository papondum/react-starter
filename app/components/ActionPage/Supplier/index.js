import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class Supplier extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Supplier'
      }
      else if(type=='edit'){
        return 'Edit - Supplier'
      }
    }

    createSupplier(){
      let code = this.refs.code.value
      let name = this.refs.name.value
      let address = this.refs.address.value
      let email = this.refs.email.value
      let tel = this.refs.tel.value
      let fax = this.refs.fax.value
      let contact = this.refs.contact.value
      if(code&&name){
        post('/api/supplier/create',
          {
            "code":code,
            "name":name,
            "address":address,
            "email":email,
            "tel":tel,
            "fax":fax,
            "contact":contact
          }
        )
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          // Notify added
          this.props.getContent('Supplier')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('Invalid Input');
      }
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('Supplier')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createSupplier()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                <div className='input-box flex left'>
                    <label>Code :</label>
                    <input className='flex' type="text" ref = 'code'/>
                </div>
                <div className='input-box flex'>
                    <label>Tel :</label>
                    <input className='flex' type="text" ref = 'tel'/>
                </div>
                <div className='input-box flex'>
                    <label>Contact Name :</label>
                    <input className='flex' type="text" ref = 'contact'/>
                </div>
              </div>
              <div className='flex'>
                <div className='input-box flex left'>
                    <label>Supplier Name :</label>
                    <input className='flex' type="text" ref = 'name'/>
                </div>
                <div className='input-box flex'>
                    <label>Fax :</label>
                    <input className='flex' type="text" ref = 'fax'/>
                </div>
              </div>
              <div className='flex'>
                <div className='input-box flex left'>
                    <label>Address :</label>
                    <input className='flex' type="text" ref = 'address'/>
                </div>
                <div className='input-box flex'>
                    <label>Email :</label>
                    <input className='flex' type="text" ref = 'email'/>
                </div>
            </div>
          </div>)
    }
}

export default Supplier;
