import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
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
                      <select style={{'width': '173px'}}>
                          <option value="Administrator">CE</option>
                          <option value="User">User</option>
                      </select>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Film Type Code :</i></label>
                      <input className='flex' type="text"/>
                  </div>

              </div>

          </div>)
    }
}

export default FilmType;
