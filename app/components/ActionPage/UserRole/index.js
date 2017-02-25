import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          stateRole:[{

            name:'Sales',
            subitem:[{
              name:'Sale Quotation',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'sale_quo'
            },{
              name:'Sale Order',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'sale_ord'},
            ]}, {
            name:'Purchase',
            subitem:[{
              name:'Purchase Order',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'purchase_ord'
            }]},{

            name:'Inventory',
            subitem:[{
              name:'Good Receipt',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'good_rec'
            }, {
              name:'Deliver order',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'deliver_ord'
            }]},{
            name:'Master File',
            subitem:[{
              name:'User account',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'user_acc'
            }, {
              name:'User role',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'user_rol'
            }, {
              name:'Customer',
              value:{view:false, email:false, print:false, export:false, edit:false},
              id:'customer'
            }]}
          ]
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

    _genBodyRole(){

      let item = this.state.stateRole
      let result  = item.map(i =>
        <div key = {i.name} className='row-item'>
            <div className = 'sub-head'>{i.name}</div>
            <div className='child-item'>
                {i.subitem.map(j=>
                    <div key={j.name} className = 'sub-item'>
                        <div className='flex'>
                            <div style={{'flex':10}}>{j.name}</div>
                            <div className='flex' style={{'flex':5}}>
                                <input className='flex-1' type='checkbox' ref = {j.id+'_view'} value={j.view}/>
                                <input className='flex-1' type='checkbox' ref = {j.id+'_email'} value={j.email}/>
                                <input className='flex-1' type='checkbox' ref = {j.id+'_print'} value={j.print}/>
                                <input className='flex-1' type='checkbox' ref = {j.id+'_export'} value={j.export}/>
                                <input className='flex-1' type='checkbox' ref = {j.id+'_edit'} value={j.edit}/>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>)
      return result
    }

    createRole(){
      let name = this.refs.name.value
      let description = this.refs.description.value
      let result  = {
        "name":name,
        "description":description,
        "sale_quo":{view:this.refs.sale_quo_view.checked,email:this.refs.sale_quo_email.checked,print:this.refs.sale_quo_print.checked,export:this.refs.sale_quo_export.checked,edit:this.refs.sale_quo_edit.checked},
        "sale_rol":{view:this.refs.sale_ord_view.checked,email:this.refs.sale_ord_email.checked,print:this.refs.sale_ord_print.checked,export:this.refs.sale_ord_export.checked,edit:this.refs.sale_ord_edit.checked},
        "purchase_ord":{view:this.refs.purchase_ord_view.checked,email:this.refs.purchase_ord_email.checked,print:this.refs.purchase_ord_print.checked,export:this.refs.purchase_ord_export.checked,edit:this.refs.purchase_ord_edit.checked},
        "good_rec":{view:this.refs.good_rec_view.checked,email:this.refs.good_rec_email.checked,print:this.refs.good_rec_print.checked,export:this.refs.good_rec_export.checked,edit:this.refs.good_rec_edit.checked},
        "deliver_ord":{view:this.refs.deliver_ord_view.checked,email:this.refs.deliver_ord_email.checked,print:this.refs.deliver_ord_print.checked,export:this.refs.deliver_ord_export.checked,edit:this.refs.deliver_ord_edit.checked},
        "user_acc":{view:this.refs.user_acc_view.checked,email:this.refs.user_acc_email.checked,print:this.refs.user_acc_print.checked,export:this.refs.user_acc_export.checked,edit:this.refs.user_acc_edit.checked},
        "user_rol":{view:this.refs.user_rol_view.checked,email:this.refs.user_rol_email.checked,print:this.refs.user_rol_print.checked,export:this.refs.user_rol_export.checked,edit:this.refs.user_rol_edit.checked},
        "customer":{view:this.refs.customer_view.checked,email:this.refs.customer_email.checked,print:this.refs.customer_print.checked,export:this.refs.customer_export.checked,edit:this.refs.customer_edit.checked},
    }
      if(name&&description){
        post('/api/role/create',result)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('User role')
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
                      <button onClick={()=>this.props.getContent('User role')}><img src={cancelIcon}/>Cancel</button>
                      <button onClick = {() => this.createRole()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>
              <div className='flex'>
                  <div className='input-box left flex'>
                      <label><i>User role :</i></label>
                      <input className='flex' type="text" ref = 'name'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Description :</i></label>
                      <input className='flex' type="text" ref = 'description'/>
                  </div>
              </div>


              <div className='flex role-head'>
                  <div style={{'flex':10}}>
                      <span>Document</span>
                  </div>
                  <div style={{'flex':5}} className='flex'>
                      <span className='flex-1' style={{'textAlign':'center'}} >View</span>
                      <span className='flex-1' style={{'textAlign':'center'}} >Email</span>
                      <span className='flex-1' style={{'textAlign':'center'}}>Print</span>
                      <span className='flex-1' style={{'textAlign':'center'}} >Export</span>
                      <span className='flex-1' style={{'textAlign':'center'}} >Edit</span>
                  </div>
              </div>
              <div>
                  {this._genBodyRole()}
              </div>
          </div>
        )
    }
}

export default UserRole;
