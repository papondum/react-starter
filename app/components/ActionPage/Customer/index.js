import React, {PropTypes} from 'react';
import './style.scss';
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
                <label>Code</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Tel</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Invoice To</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Customer Name</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Fax</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Ship To</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Contact Name</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Email</label>
                <input className='flex' type="text"/>
              </div>
            </div>
          </div>)
    }
}

export default Customer;
