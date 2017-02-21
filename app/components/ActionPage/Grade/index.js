import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
class Grade extends React.Component {
    constructor(props) {
        super(props);
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Grade'
      }
      else if(type=='edit'){
        return 'Edit - Grade'
      }
    }

    createGrade(){
      let grade_code = this.refs.grade_code.value
      let grade_name = this.refs.grade_name.value
      if(grade_code&&grade_name){
        post('/api/grade/create',{"grade_code":grade_code, "grade_name":grade_name})
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
                      <button onClick = {() => this.createGrade()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Grade Code :</i></label>
                      <input className='flex' type="text" ref='grade_code'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Grade Name :</i></label>
                      <input className='flex' type="text" ref='grade_name'/>
                  </div>

              </div>

          </div>)
    }
}

export default Grade;
