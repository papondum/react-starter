import React, {PropTypes} from 'react';
import cancelIcon from '../../resource/Icon/button_cancel.png'
import saveIcon from '../../resource/Icon/button_save.png'
class ActionSubMenu extends React.Component {

  // how to pass ref for each create page to this page??

    constructor(props) {
        super(props);
        this.state={
          saveFuntion:''
        }
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
      let brand_code = this.refs.brand_code.value     //null
      let brand_name = this.refs.brand_name.value     //null
      if(brand_code&&brand_name){
        post('/api/brand/create',{"brand_code":brand_code, "brand_name":brand_name})
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
    _selectPageSave(){
      switch (this.props.activePage) {
        case 'User account':
          this.setState({
            saveFuntion:()=>this.createBrand()
          })
          break;
        case 'User role':
          this.setState({
          })
          break;
        case 'Customer':
          this.setState({
          })
          break;
        case 'Supplier':
          this.setState({
          })
          break;
        case 'Price list':
          this.setState({
          })
          break;
        case 'Product':
          this.setState({
          })
          break;
        case 'Brand':
          this.setState({
            saveFuntion:()=>this.createBrand()
          })
          break;
        case 'Film Type':
          this.setState({
          })
          break;
        case 'Grade':
          this.setState({
          })
          break;
        case 'Quotation':
          this.setState({
          })
          break;
        default:
      }
    }

    render() {
    console.log(this.props);
        return(
          <div className='page-head'>
              <h2>{this._genHeader(this.props.type)}</h2>
              <div className='action-group-btn'>
                  <button onClick={()=>this.props.getContent(this.props.activePage)}><img src={cancelIcon}/><p>Cancel</p></button>
                  <button onClick = {() => this.saveFuntion()} ><img src={saveIcon}/><p>Save</p></button>
              </div>
          </div>
        )
  }
}

export default ActionSubMenu
