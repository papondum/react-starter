import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../../utils'
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
      let url = this.props.type=='create'? '/api/grade/create':'/api/grade/update'
      let data = {}

      if (this.props.type=='create') {
        data = {"grade_code":grade_code, "grade_name":grade_name}
      } else {
        let grade_id = this.refs.grade_id.value
        data = {"grade_code":grade_code, "grade_name":grade_name, "id": grade_id}
      }

      if(grade_code&&grade_name){
        post(url,data)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          // Notify added
          this.props.getContent('Grade')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('Invalid Input');
      }
    }
    getInitialVal(){        //Edit    2
      post('/api/grade/id',{"grade_id":this.props.editItem})
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setEditItem(response)
      })
      .catch(err=>console.log(err))
    }

    componentDidMount(){
      this.getInitialVal()
    }


    setEditItem(obj){
      if(obj){
        this.refs['grade_code'].value = obj[0].grade_code
        this.refs['grade_name'].value = obj[0].grade_name
        this.refs['grade_id'].value = obj[0].id
      }
    }


    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('Grade')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createGrade()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <input type="hidden" ref = 'grade_id' />
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
