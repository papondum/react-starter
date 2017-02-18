import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Product'
      }
      else if(type=='edit'){
        return 'Edit - Product'
      }
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('User account')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Film Type :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Width :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Density :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Decimal Digit :</i></label>
                      <input className='flex' type="text"/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Brand :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Thickness :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Rounding Methode :</i></label>
                      <input className='flex' type="text"/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Grade :</i></label>
                      <input className='flex' type="text"/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Length :</i></label>
                      <input className='flex' type="text"/>
                  </div>
            </div>
          </div>)
    }
}

export default Product;
