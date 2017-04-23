import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../../utils'
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
      else if(type=='copy'){
        return 'Copy - Brand'
      }
    }

    createBrand(){
      let brand_code = this.refs.brand_code.value
      let brand_name = this.refs.brand_name.value
      let url = this.props.type=='create'||this.props.type=='copy'? '/api/brand/create':'/api/brand/update'

      let data = {}

      if (this.props.type=='create'||this.props.type=='copy') {
        data = {"brand_code":brand_code, "brand_name":brand_name}
      } else {
        let id = this.refs.id.value
        data = {"brand_code":brand_code, "brand_name":brand_name, "id": id}
      }

      if(brand_code&&brand_name){
        post(url,data)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('Brand')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('Invalid Input');
      }
    }

    getInitialVal(){        //Edit    2
      post('/api/brand/id',{"brand_id":this.props.editItem})
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
      this.props.type=='edit'||this.props.type=='copy'? this.getInitialVal():''    //Edit    1
    }

    setEditItem(obj){         //Edit    3
      if(obj){
        this.refs['brand_code'].value = obj[0].brand_code
        this.refs['brand_name'].value = obj[0].brand_name
        this.refs['id'].value = obj[0].id
      }
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('Brand')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createBrand()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <input type="hidden" ref = 'id' />
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
