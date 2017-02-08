import React, {PropTypes} from 'react';
import './style.scss';
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
                <label>Contact Name</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Supplier Name</label>
                <input className='flex' type="text"/>
              </div>
              <div className='input-box'>
                <label>Fax</label>
                <input className='flex' type="text"/>
              </div>
            </div>
            <div className='flex'>
              <div className='input-box left'>
                <label>Address</label>
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

export default Supplier;
