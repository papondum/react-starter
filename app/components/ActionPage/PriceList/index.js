import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'

import attachIcon from '../../../resource/Icon/button_create.png'
import emailIcon from '../../../resource/Icon/button_email.png'
import printIcon from '../../../resource/Icon/button_print.png'
import exportIcon from '../../../resource/Icon/button_export.png'
import { post ,get } from '../../../../utils'
class PriceList extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        stateRole:[{

          name:'Sales',
          subitem:[{
            name:'Sale Quotation',
            value:{view:false, email:false, print:false, export:false, edit:false}},{
            name:'Sale Order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]}, {

          name:'Purchase',
          subitem:[{
            name:'Purchase Order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]},{

          name:'Inventory',
          subitem:[{
            name:'Good Receipt',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'Deliver order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]},{

          name:'Master File',
          subitem:[{
            name:'User account',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'User role',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'Customer',
            value:{view:false, email:false, print:false, export:false, edit:false}}]}
        ]
      }
  }
  _genHeader(type){
    if(type=='create'){
      return 'Create - Price List'
    }
    else if(type=='edit'){
      return 'Edit - Price List'
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
                              <input className='flex-1' type='checkbox' value={j.view}/>
                              <input className='flex-1' type='checkbox' value={j.email}/>
                              <input className='flex-1' type='checkbox' value={j.print}/>
                              <input className='flex-1' type='checkbox' value={j.export}/>
                              <input className='flex-1' type='checkbox' value={j.edit}/>
                          </div>
                      </div>
                  </div>)}
          </div>
      </div>)
    return result
  }

  createPriceList(){
    let name = this.refs.name.value
    let status = "In Process"
    if(name&&status){
      post('/api/price_list/create',{"name":name, "status":status})
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        //Notify fn value added
        this.props.getContent('Price list')
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
                    <button><img src={emailIcon}/> <p>Email</p></button>
                    <button><img src={printIcon}/> <p>Print</p></button>
                    <button><img src={exportIcon}/> <p>Export</p></button>
                    <button onClick={()=>this.props.getContent('Price list')}><img src={cancelIcon}/><p>Cancel</p></button>
                    <button onClick = {() => this.createPriceList()} ><img src={saveIcon}/><p>Save</p></button>
                </div>
            </div>
            <hr/>
            <div className='flex'>
                <div className='input-box left flex'>
                    <label>Name:*</label>
                    <input className='flex' type="text" ref='name'/>
                </div>
            </div>

            <hr/>

            <div className='flex price-line'>
                <h2>Price List Line(s) </h2>
                <button>Input Price</button>
            </div>

            <div className='flex role-head'>
                <div style={{'flex':5}} className='flex'>
                    <span ><input type='checkbox'/>No.</span>
                    <span className='flex-1'>Film Type</span>
                    <span className='flex-1'>Brand</span>
                    <span className='flex-1'>Thickness</span>
                    <span className='flex-1'>Average Cost</span>
                    <span className='flex-1'>Unit Price(THB/Kg)</span>
                </div>
            </div>
            <div>
                {this._genBodyRole()}
            </div>
        </div>
      )
  }
}


export default PriceList;
