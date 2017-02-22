import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class FilmType extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Film Type'
      }
      else if(type=='edit'){
        return 'Edit - Film Type'
      }
    }

    createFilmType(){
      let film_code = this.refs.film_code.value
      let film_name = this.refs.film_name.value
      if(film_code&&film_name){
        post('/api/film/create',{"film_code":film_code, "film_name":film_name})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('Film Type')
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
                      <button onClick={()=>this.props.getContent('Film Type')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createFilmType()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Film Type Code:</i></label>
                      <input className='flex' type="text" ref='film_code'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Film Type Name :</i></label>
                      <input className='flex' type="text" ref='film_name'/>
                  </div>

              </div>

          </div>)
    }
}

export default FilmType;
