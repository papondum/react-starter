import React, {PropTypes} from 'react';
import './style.scss';
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import ModalCustom from '../../Modal/Custom'
import attachIcon from '../../../resource/Icon/button_create.png'
import emailIcon from '../../../resource/Icon/button_email.png'
import printIcon from '../../../resource/Icon/button_print.png'
import exportIcon from '../../../resource/Icon/button_export.png'
import { post ,get } from '../../../../utils'
class PriceList extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        stateRole:[{

          name:'Sales',
          subitem:[{
            name:'Sale Quotation',
            value:{view:false, email:false, print:false, export:false, edit:false}},{
            name:'Sale Order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]}, {

          name:'Purchase',
          subitem:[{
            name:'Purchase Order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]},{

          name:'Inventory',
          subitem:[{
            name:'Good Receipt',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'Deliver order',
            value:{view:false, email:false, print:false, export:false, edit:false}}]},{

          name:'Master File',
          subitem:[{
            name:'User account',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'User role',
            value:{view:false, email:false, print:false, export:false, edit:false}}, {
            name:'Customer',
            value:{view:false, email:false, print:false, export:false, edit:false}}]}
        ],
        mainContent:'',
        inputModal:{
          show:false
        },
        checkedItem:[]
      }
  }
  _genHeader(type){
    if(type=='create'){
      return 'Create - Price List'
    }
    else if(type=='edit'){
      return 'Edit - Price List'
    }
  }

  _headerGen(content){
    let genHead=[]
    if(content.length>0){
      var head = Object.keys(content[0])
      genHead = head.map(item=>{
        return (<td key= {item}>{item}</td>)
      })
      genHead.unshift((<td key='checkbox'><input type='checkbox'/></td>))
    }
      return genHead
  }

  _contentGen(content){
    var result = []
    for(var i=0 ;i<content.length;i++){
      let eachRow = this._getEachVal(content[i])
      result.push((<tr key = {i}>{eachRow}</tr>))
    }
    return result
  }

  _getEachVal(obj){
    var result=[]
    for(var o in obj){
      result.push((<td key={o}>{obj[o]}</td>))
    }
    result.unshift((<td key='checkbox'><input onChange = {()=>this.ifChecked(obj.id)} type = 'checkbox' value = {obj.id} ref = {obj.id} /></td>))
    return result
  }

  componentDidMount(){
    this.getProduct()
  }

  getProduct(){
    // get('/api/price_list/create')
    get('/api/product/all')
    .then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      this.setState({'mainContent': response})
    })
    .catch(err=>console.log(err))
  }

  _genBodyRole(){
    let item = this.state.stateRole
    let result  = item.map(i =>
      <div key = {i.name} className='row-item'>
          <div className = 'sub-head'>{i.name}</div>
          <div className='child-item'>
              {i.subitem.map(j=>
                  <div key={j.name} className = 'sub-item'>
                      <div className='flex'>
                          <div style={{'flex':10}}>{j.name}</div>
                          <div className='flex' style={{'flex':5}}>
                              <input className='flex-1' type='checkbox' value={j.view}/>
                              <input className='flex-1' type='checkbox' value={j.email}/>
                              <input className='flex-1' type='checkbox' value={j.print}/>
                              <input className='flex-1' type='checkbox' value={j.export}/>
                              <input className='flex-1' type='checkbox' value={j.edit}/>
                          </div>
                      </div>
                  </div>)}
          </div>
      </div>)
    return result
  }

  createPriceList(){
    let name = this.refs.name.value
    let status = "In Process"
    let obj = {name,status,list_item: this.state.checkedItem}  //objArray
    if(name&&status){
      post('/api/price_list/create',obj)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        //Notify fn value added
        this.props.getContent('Price list')
      })
      .catch(err=>console.log(err))
    }
    else{
      console.log('Invalid Input');
    }
  }

  openInputModal(){
    this.setState({
      inputModal: {
        show: true,
        header: 'Input Unit Price',
        message: 'Input Unit Price for selected item(s).',
        close: ()=>{
          this.setState({inputModal:{show:false}})
        },
        confirm: ()=>{
          // add value to table that have checked
          for (var i = 0; i < this.state.checkedItem.length; i++) {
            this.state.checkedItem[i].price = this.refs.inputprice.value
          }
          console.log(this.refs.inputprice.value);
          console.log(this.state.checkedItem);
          //this.createPriceList()
        }
      }
    })
  }

  ifChecked(id){
    if(this.refs[id].checked){
      if(this.state.checkedItem.find((i) => i==this.refs[id].value)==undefined){

        this.setState({
          checkedItem:this.state.checkedItem.concat([{id:this.refs[id].value, price:this.refs.inputprice.value}])
        })
      }
    }
    else{
        var array = this.state.checkedItem;
        var index = array.indexOf(this.refs[id].value)
        array.splice(index, 1);
        this.setState({checkedItem: array });
      }

  }

  render() {
      return(
        <div className='page-style'>
            <div className='page-head'>
                <h2>{this._genHeader(this.props.type)}</h2>
                <div className='action-group-btn'>
                    <button><img src={emailIcon}/> <p>Email</p></button>
                    <button><img src={printIcon}/> <p>Print</p></button>
                    <button><img src={exportIcon}/> <p>Export</p></button>
                    <button onClick={()=>this.props.getContent('Price list')}><img src={cancelIcon}/><p>Cancel</p></button>
                    <button onClick = {() => this.createPriceList()} ><img src={saveIcon}/><p>Save</p></button>
                </div>
            </div>
            <hr/>
            <div className='flex'>
                <div className='input-box left flex'>
                    <label>Name:*</label>
                    <input className='flex' type="text" ref='name'/>
                </div>
            </div>

            <hr/>

            <div className='flex price-line'>
                <h2>Price List Line(s) </h2>
                <button onClick={()=>this.openInputModal()}>Input Price</button>
            </div>
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                {this._headerGen(this.state.mainContent)}
                            </tr>
                        </thead>
                        <tbody>
                            {this._contentGen(this.state.mainContent)}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalCustom show = {this.state.inputModal.show} options = {this.state.inputModal}>
                <div>
                    {this.state.inputModal.message}
                    <input type = 'number' ref = 'inputprice'/>
                    <button onClick = {()=>this.state.inputModal.confirm()}>Add</button>
                    <button onClick = {()=>this.state.inputModal.close()}>Cancel</button>
                </div>
            </ModalCustom>
        </div>
            )
  }
}


export default PriceList;
