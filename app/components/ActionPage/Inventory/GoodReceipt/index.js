import React, {PropTypes} from 'react';
import { post ,get } from '../../../../../utils'
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import printIcon from '../../../../resource/Icon/button_print.png'
import emailIcon from '../../../../resource/Icon/button_email.png'
import createIcon from '../../../../resource/Icon/button_create.png'
import deleteIcon from '../../../../resource/Icon/button_delete.png'
import Select from 'react-select';
import { indexOf, find } from 'lodash'
import 'react-select/dist/react-select.css';
import './style.scss'
class GoodReceipt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

          length: [],
          weight: [],
          statusList: [{value: 'Open'}, {value: 'In Process'}, {value: 'Released'}, {value: 'Completed'}],
          eFilmType: {},
          eBrandType: {},
          eGradeType: {},
          eThick: {},
          eLength: {},
          eWeight: {},
          eRemark: {},
          eWidth: {},
          ePending: {},
          eReceive: {},
          eOrderqty: {},
          childItem: [{id:'0001'}],
          currentChild: 1,
          state_supplier: '',
          state_invoice: '',
          state_lc: '',
          state_reference: '',
          state_etd: '',
          state_eta: '',
          state_status: '',
          state_ataDate: '',
          state_buyer: '',
          checkedItem: [],
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Good Receipt'
      }
      else if(type=='edit'){
        return 'Edit - Good Receipt'
      }
      else if(type=='copy'){
        return 'Copy - Good Receipt'
      }
    }

    _updateStateSelector(id, state){
      switch (state) {
        case  'eRemark':
          var stateR = this.state[state];
          stateR[id] =  this.refs['remark'+id].value
          this.setState({eRemark:stateR})
          break;
        case  'eReceive':
          var stateRe = this.state[state];
          stateRe[id] =  this.refs['receive'+id].value
          this.setState({eReceive:stateRe})
          break;

        default:

      }

    }

    onChangeUpdate(item, type, id){
      switch (type) {
        case 'remark':
          this._updateStateSelector(id, 'eRemark')
          break;
        case 'receive':
          this._updateStateSelector(id, 'eReceive')
          break;
        default:

      }
    }

    componentDidMount(){
      this.props.type=='edit'||this.props.type=='copy'? this._getEditItem():this._getCreateItem()
    }

    _getEditItem(){
      post('/api/inventory/gr/id', {good_receipt_id: +this.props.editItem})
      .then((response)=>{
        this._setInitialVal(response)
      })

    }
     _getCreateItem(){
          post('/api/inventory/gr/pre_create', {purchase_id: +this.props.editItem})
          .then((response)=>{
            this._setInitialVal(response)
          })

      }

    _setInitialEditContent(){
      let childList = this.state.childItem
      let objFilm = {}
      let objBrand = {}
      let objGrade = {}
      let objThick = {}
      let objLength = {}
      let objWeight = {}
      let objRemark = {}
      let objWidth = {}
      let objOrderqty = {}
      let objPending = {}
      let objReceive = {}
      for(let i in childList){
        objFilm[childList[i]['id']] = childList[i]['Film Type']
        objBrand[childList[i]['id']] = childList[i]['Brand']
        objGrade[childList[i]['id']] = childList[i]['Grade']
        objThick[childList[i]['id']] = childList[i]['Thickness']
        objLength[childList[i]['id']] = childList[i]['Length']
        objWeight[childList[i]['id']] = childList[i]['Total Weight (KG)']
        objRemark[childList[i]['id']] = childList[i]['remark']
        objReceive[childList[i]['id']] = childList[i]['receive_quantity']
        objWidth[childList[i]['id']] = childList[i]['Width']
        objOrderqty[childList[i]['id']] = childList[i]['Order Quantity (Roll)']
      }
      this.setState({
        eFilmType: objFilm,
        eBrandType: objBrand,
        eGradeType: objGrade,
        eThick: objThick,
        eLength: objLength,
        eWeight: objWeight,
        eRemark: objRemark,
        eWidth: objWidth,
        eOrderqty: objOrderqty,
        ePending: objPending,
        eReceive: objReceive,
      })

    }

    _setInitialVal(res){

      let item = res[0]
      this.setState({
        state_supplier: item.supplier_name,
        state_invoice: item.invoice || '',
        state_lc: item.lc || '',
        state_reference: item.reference || '',
        state_etd: item.etd || '',
        state_eta: item.eta || '',
        state_status: item.status ||'',
        state_ataDate: item.ata || '',
        state_buyer: item.buyer|| '',
        childItem: item.contents,
      })
      this._setInitialEditContent()
    }

    save(){
      //send Quatations
      let obj = Object.assign({},
      {
        supplier: this.state.state_supplier || this.refs['supplier'].value,
        invoice: this.state.state_invoice || this.refs['invoice'].value,
        status: this.state.state_status || this.refs['status'].value,
        lc: this.state.state_lc || this.refs['lc'].value,
        reference: this.state.state_reference || this.refs['reference'].value,
        ata: this.state.state_ataDate || this.refs['ataDate'].value,

        content:// list of content
          this.state.childItem.map(i=>{
            return Object.assign({},{
              po_line_id:i.id,
              content:{
                receive_quantity: this.refs['receive'+i.id].value,
                remark: this.refs['remark'+i.id].value,
              }
          })
        })
      })
      let url = ''
      if(this.props.type=='create'||this.props.type=='copy'){
        url = '/api/inventory/gr/create'
        obj.purchase_id = parseInt(this.props.editItem)
      }
      else if (this.props.type=='edit'){
        url = '/api/inventory/gr/update'
        obj.good_receipt_id = parseInt(this.props.editItem)
      }
      console.log('obj',obj);
      post(url, obj)
      .then(response => {
        console.log(response);

        this.props.getContent('Good Receipt')
      })
      .catch(err=>console.log(err))
    }


    getChildItem(){
      let items = this.state.childItem
      let result = items.map((i, index)=>{
        let genArg = (arr,id) => {
          //return as object filmType:val brandType:val
          let result = {}
          for (var i=0; i<arr.length; i++) {``
            result[arr[i]] = this.refs[arr[i]+id].value;
          }
          return result
        }

        let indexNo = (i) => {
          let str = '0000'
          var index = 4-((i+'').length);
          str = str.substr(0, index) + (i+1)
          return str
        }
        let getSubtotal = (w,u) => {
          if(w&&u){
            return w*u
          }
        }
        return (<tr key={i.id} id = {i.id}>
            <td><input type='checkbox' ref = {'checkbox'+i.id} onChange= {()=>this.ifChecked(i.id)}/>{indexNo(index)}</td>
            <td>
                <input value = {this.state.eFilmType[i.id]} disabled type='text' ref = {'filmType'+i.id}/>

            </td>
            <td>
                <input value = {this.state.eBrandType[i.id]} disabled type='text' ref = {'brandType'+i.id}/>

            </td>
            <td>
                <input value = {this.state.eGradeType[i.id]} disabled type='text' ref = {'gradeType'+i.id}/>

            </td>
            <td>
                <input value = {this.state.eWidth[i.id]} disabled type='text' ref = {'widthType'+i.id}/>

            </td>
            <td>
                <input value = {this.state.eThick[i.id]} disabled type='text' ref = {'thickNess'+i.id}/>

            </td>
            <td>
                <input value = {this.state.eLength[i.id]} disabled type='text' ref = {'length'+i.id}/>

            </td>
            <td><input disabled value = {this.state.eOrderqty[i.id]} type='number' ref = {'order_qty'+i.id}/></td>
            <td><input disabled value = {this.state.eWeight[i.id]} type='number' ref = {'weight'+i.id}/></td>
            <td><input disabled value = {this.state.ePending[i.id]} type='number' ref = {'pending'+i.id}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'receive', i.id)} value = {this.state.eReceive[i.id]} type='number' ref = {'receive'+i.id}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'remark', i.id)} value = {this.state.eRemark[i.id]} type='text' ref = {'remark'+i.id}  /></td>

        </tr>)
      })
      return result
    }

    updateParam(item){
      let obj ={}
      obj['state_'+item] = this.refs[item].value
      this.setState(obj)

    }

    getGeneralContent(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Supplier :</label>
                  <input className='flex' type="text" ref='supplier' disabled value = {this.state.state_supplier} onChange={()=>this.updateParam('supplier')}/>
              </div>
              <div className='input-box flex'>
                  <label>Invoice :</label>
                  <input className='flex' type="text" ref='invoice' value = {this.state.state_invoice} onChange={()=>this.updateParam('invoice')}/>
              </div>
              <div className='input-box flex'>
                  <label>L/C :</label>
                  <input className='flex' type="text" ref='lc' value = {this.state.state_lc} onChange={()=>this.updateParam('lc')}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Reference:</label>
                  <input className='flex' type="text" ref='reference' value = {this.state.state_reference} onChange={()=>this.updateParam('reference')}/>
              </div>
              <div className='input-box flex'>
                  <label>ETD:</label>
                  <input className='flex' type="date" ref='etd' disabled value = {this.state.state_etd} />
              </div>
              <div className='input-box flex'>
                  <label>ETA:</label>
                  <input className='flex' type="date" ref='eta' disabled value = {this.state.state_eta} />
              </div>
          </div>

          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Status:</label>
                  <select ref = 'status' value = {this.state.state_status} onChange={()=>this.updateParam('status')}>
                      <option value={'Not yet recived'} style={{color:'red'}}>Not yet recived</option>
                      <option value={'Received'} style={{color:'green'}}>Received</option>
                  </select>
              </div>
              <div className='input-box flex'>
                  <label>Actual Time Arrival(ATA):</label>
                  <input className='flex' type="date" ref='ataDate' value = {this.state.state_ataDate} onChange={()=>this.updateParam('ataDate')}/>
              </div>
              <div className='input-box flex'>
                  <label>Buyer :</label>
                  <input className='flex' type="text" ref='buyer' disabled value = {this.state.state_buyer}/>
              </div>
          </div>
      </div>)
    }

    ifChecked(id){
      if(this.refs["checkbox"+id].checked){
        if(this.state.checkedItem.find((i) => i==this.refs["checkbox"+id].value)==undefined){
          this.setState({checkedItem: this.state.checkedItem.concat([{id:id}])})
        }
      }
      else{
          var array = this.state.checkedItem;
          var index = array.indexOf(this.refs["checkbox"+id].value)
          for (var i = 0; i < array.length; i++) {
            if(array[i].id==this.refs["checkbox"+id].value){
              array.splice(i, 1);
            }
          }

          this.setState({checkedItem: array });
        }
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button><img src={emailIcon}/><p>Email</p></button>
                      <button><img src={printIcon}/><p>Print</p></button>
                      <button onClick={()=>this.props.getContent('Good Receipt')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.save()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <div>
                  <div className='flex flex-row'>
                      <div className={'tab-quo active'} onClick={()=>this.setContent('General')}>
                          General
                      </div>
                  </div>
                  <hr style={{margin : 0}}/>
                  <div className = 'top-content'>
                      {this.getGeneralContent()}
                  </div>
              </div>
              <hr style={{margin : 0}}/>
              <div className="flex flex-row space-bet" >
                  <div className='tab-quo active'>Content</div>
              </div>
              <hr style={{margin : 0}}/>
              <div className = 'content-quo-table'>
                  <table>
                      <thead>
                          <tr>
                              <td><input type='checkbox' />Line No.</td>
                              <td>Film Type</td>
                              <td>Brand</td>
                              <td>Grade</td>
                              <td>Width</td>
                              <td>Thickness</td>
                              <td>Length</td>
                              <td>Order Quantity(Roll)</td>
                              <td>Total Weight(Kg)</td>
                              <td>Pending Quantity</td>
                              <td>Receive Quantity</td>
                              <td>Remark</td>
                          </tr>
                      </thead>
                      <tbody>
                          {this.getChildItem()}
                      </tbody>
                  </table>
              </div>
          </div>)
        }
    }


export default GoodReceipt;
