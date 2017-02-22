import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class Brand extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Brand'
      }
      else if(type=='edit'){
        return 'Edit - Brand'
      }
    }

    createBrand(){
      let brand_code = this.refs.brand_code.value
      let brand_name = this.refs.brand_name.value
      if(brand_code&&brand_name){
        post('/api/brand/create',{"brand_code":brand_code, "brand_name":brand_name})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          // Not sure what to do
          // this.props.getContent('User account')
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
                      <button onClick={()=>this.props.getContent('User account')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createBrand()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Brand Code :</i></label>
                      <input className='flex' type="text" ref = 'brand_code'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Brand Name :</i></label>
                      <input className='flex' type="text" ref = 'brand_name'/>
                  </div>

              </div>

          </div>)
    }
}

export default Brand;
