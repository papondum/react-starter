import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import { post ,get } from '../../../../utils'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          gradeList: [],
          filmList: [],
          brandList: []
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Product'
      }
      else if(type=='edit'){
        return 'Edit - Product'
      }
    }

    getGradeList(){
      let url = '/api/grade/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({gradeList:response})
      })
      .catch(err=>console.log(err))
    }

    gradeListToElem(){
      let result = this.state.gradeList.map(i=><option key = {i.id} value = {i.id}>{i.grade_name}</option>)
      return result
    }

    getBrandList(){
      let url = '/api/brand/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({brandList:response})
      })
      .catch(err=>console.log(err))
    }

    brandListToElem(){
      let result = this.state.brandList.map(i=><option key = {i.id} value = {i.id}>{i.brand_name}</option>)
      return result
    }

    getFilmList(){
      let url = '/api/film/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({filmList:response})
      })
      .catch(err=>console.log(err))
    }

    filmListToElem(){
      let result = this.state.filmList.map(i=><option key = {i.id} value = {i.id}>{i.film_name}</option>)
      return result
    }

    componentDidMount(){
      this.getGradeList()
      this.getBrandList()
      this.getFilmList()
    }

    createProduct(){
      let film = this.refs.film.value
      let brand = this.refs.brand.value
      let grade = this.refs.grade.value
      let width = this.refs.width.value
      let density = this.refs.density.value
      let decimal = this.refs.decimal.value
      let thickness = this.refs.thickness.value
      let rounding = this.refs.rounding.value
      let product_length = this.refs.product_length.value

      if(width&&density&&decimal&&thickness&&rounding&&product_length){
        post('/api/product/create',{
          "film":film,
          "brand":brand,
          "grade":grade,
          "width":width,
          "density":density,
          "decimal": decimal,
          "thickness": thickness,
          "rounding": rounding,
          "product_length": product_length,
          "set_alarm": 0,
          "weight": 0
        })
        .then((response)=> {
          if (response.status >= 400) {
            console.log(response)
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('Product')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('invalid Input');
      }
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button onClick={()=>this.props.getContent('Product')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createProduct()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <hr/>



              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Film Type :</i></label>
                      <select style={{'width': '173px'}} ref = 'film'>
                          {this.filmListToElem()}
                      </select>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Width :</i></label>
                      <input className='flex' type="text" ref = 'width'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Density :</i></label>
                      <input className='flex' type="text" ref = 'density'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Decimal Digit :</i></label>
                      <input className='flex' type="text" ref = 'decimal'/>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Brand :</i></label>
                      <select style={{'width': '173px'}} ref = 'brand'>
                          {this.brandListToElem()}
                      </select>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Thickness :</i></label>
                      <input className='flex' type="text" ref = 'thickness'/>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Rounding Methode :</i></label>
                      <select style={{'width': '173px'}} ref = 'rounding'>
                          <option value='up'>Up</option>
                          <option value='down'>Down</option>
                      </select>
                  </div>
              </div>
              <div className='flex'>
                  <div className='input-box flex left'>
                      <label><i>Grade :</i></label>
                      <select style={{'width': '173px'}} ref = 'grade'>
                          {this.gradeListToElem()}
                      </select>
                  </div>
                  <div className='input-box flex'>
                      <label><i>Length :</i></label>
                      <input className='flex' type="text" ref = 'product_length'/>
                  </div>
            </div>
          </div>)
    }
}

export default Product;
