import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../../utils'
class Customer extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Customer'
      }
      else if(type=='edit'){
        return 'Edit - Customer'
      }
    }

    createCustomer(){
      let code = this.refs.code.value
      let name = this.refs.name.value
      let address = this.refs.ship_to.value
      let invoice_to = this.refs.invoice_to.value
      let telephone = this.refs.telephone.value
      let fax = this.refs.fax.value
      let email = this.refs.email.value
      let contact_person = this.refs.contact_person.value
      let create_by = 1
      let url = this.props.type=='create'? '/api/customer/create':'/api/customer/update'
      console.log(url)

      let data = {}

      if (this.props.type=='create') {
        data = {
          "code":code,
          "name":name,
          "address":address,
          "invoice_to":invoice_to,
          "telephone":telephone,
          "fax":fax,
          "email":email,
          "contact_person":contact_person,
          "create_by":create_by
        }
      } else {
        let id = this.refs.id.value
        data = {
          "code":code,
          "name":name,
          "address":address,
          "invoice_to":invoice_to,
          "telephone":telephone,
          "fax":fax,
          "email":email,
          "contact_person":contact_person,
          "id": id,
          "create_by":create_by
        }
      }
      console.log(data)
      if(code&&name){
        post(url,data)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('Customer')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('Invalid Input');
      }
    }


    getInitialVal(){        //Edit    2
      console.log(this.props.editItem)
      post('/api/customer/id',{"customer_id":this.props.editItem})
      .then((response)=> {
        console.log(response)
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setEditItem(response)
      })
      .catch(err=>console.log(err))
    }
    componentDidMount(){
      this.getInitialVal()    //Edit    1
    }
    setEditItem(obj){         //Edit    3
      console.log(obj);
      if(obj){
        this.refs['id'].value = obj[0].id
        this.refs['code'].value = obj[0].code
        this.refs['telephone'].value = obj[0].telephone
        this.refs['invoice_to'].value = obj[0].invoice_to
        this.refs['name'].value = obj[0].name
        this.refs['fax'].value = obj[0].fax
        this.refs['ship_to'].value = obj[0].address
        this.refs['contact_person'].value = obj[0].contact_person
        this.refs['email'].value = obj[0].email
      }
    }


    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('Customer')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createCustomer()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <input type="hidden" ref = 'id' />
                  <div className='input-box flex left'>
                      <label>Code :</label>
                      <input className='flex' type="text" ref='code'/>
                  </div>
                  <div className='input-box flex'>
                      <label>Tel :</label>
                      <input className='flex' type="text" ref='telephone'/>
                  </div>
                  <div className='input-box flex'>
                      <label>Invoice To :</label>
                      <input className='flex' type="text" ref='invoice_to'/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label>Customer Name :</label>
                      <input className='flex' type="text" ref='name'/>
                  </div>
                  <div className='input-box flex'>
                      <label>Fax :</label>
                      <input className='flex' type="text" ref='fax'/>
                  </div>
                  <div className='input-box flex'>
                      <label>Ship To :</label>
                      <input className='flex' type="text" ref='ship_to'/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label>Contact Name :</label>
                      <input className='flex' type="text" ref='contact_person'/>
                  </div>
                  <div className='input-box flex'>
                      <label>Email :</label>
                <input className='flex' type="text" ref='email'/>
              </div>
            </div>
          </div>)
    }
}

export default Customer;
