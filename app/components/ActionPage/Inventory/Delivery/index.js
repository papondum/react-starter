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

class Delivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          customerList: [],
          saleList: [],
          priceList: [],
          inputValid: true,
          brandList: [],
          gradeList: [],
          thickList: [],
          widthList: [],
          length: [],
          weight: [],
          statusList: [{value: 'Not yet delivered'}, {value: 'Ready to Deliver'}, {value: 'Delivered'}],
          selectedCustomer: '',
          eFilmType: {},
          eBrandType: {},
          eGradeType: {},
          eThick: {},
          eLength: {},
          eWeight: {},
          eRemark: {},
          eWidth: {},
          eStock: {},
          eOrderqty: {},
          filmList:[],
          childItem: [],//{id:'0001'}
          currentChild: 1,
          state_contact:'',
          state_tel:'',
          state_fax:'',
          state_email:'',
          state_sonumber: '',
          state_ponumber: '',
          state_shipto: '',
          state_date: '',
          state_time: '',
          state_payterm: '',
          state_deliver: '',
          state_status: '',
          state_salePerson: '',
          total: 0,
          checkedItem: [],
          soShowState: 'display-none'
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Delivery Order'
      }
      else if(type=='edit'){
        return 'Edit - Delivery Order'
      }
      else if(type=='copy'){
        return 'Copy - Delivery Order'
      }
    }

    getCustomerList(){
      let url = '/api/customer/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({
          customerList:response.map(i=>{return Object.assign({},{value:i.id,label:i.name})})
        })
      })
      .catch(err=>console.log(err))
    }

    getSaleList(){
      let url = '/api/user/all'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({saleList:response.map(i=>{return Object.assign({},{value:i.id,label:i.Firstname})})})

      })
      .catch(err=>console.log(err))
    }

    getInitialVal(){
      post('/api/user/id',{"user_id":this.props.editItem})
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

    getFilmType(){
        get('/api/sales/quotation/filmtype')
          .then((response)=>{
            this.setState({filmList:response.map(i=>{return Object.assign({}, {value: i.id, label: i.film_name, id:i.id})})})
          })
          .catch(err=>console.log(err))
    }

    updateStateItemSet(listType, response, id){
      let result = this.state[listType]
      let itemSet = this.state[listType].find(i=> i.id==id)
      if(itemSet){
        var index = indexOf(this.state[listType], itemSet);
        result.splice(index, 1, {id:id, content:response});
      }
      else{
        result = result.concat([{id: id, content:response}])
      }
      var obj  = {}
      obj[listType] = result
      this.setState(obj)

    }

    _updateStateSelector(id, state){
      switch (state) {
        case 'eFilmType':
          console.log(this.refs['filmType'+id].value, id);
          var stateF = this.state[state];
          console.log(this.state.eFilmType);
          stateF[id] = parseInt(this.refs['filmType'+id].value)
          this.setState({eFilmType:stateF})
          break;
        case 'eBrandType':
          var stateB = this.state[state];
          stateB[id] = parseInt(this.refs['brandType'+id].value)
          this.setState({eBrandType:stateB})
          break;
        case  'eGradeType':
          var stateG = this.state[state];
          stateG[id] = parseInt( this.refs['gradeType'+id].value)
          this.setState({eGradeType:stateG})
          break;
        case  'eThick':
          var stateT = this.state[state];
          stateT[id] =  this.refs['thickNess'+id].value
          this.setState({eThick:stateT})
          break;
        case  'eLength':
          var stateL = this.state[state];
          stateL[id] =  this.refs['length'+id].value
          this.setState({eLength:stateL})
          break;
        case  'eRemark':
          var stateR = this.state[state];
          stateR[id] =  this.refs['remark'+id].value
          this.setState({eRemark:stateR})
          break;
        case  'eWeight': //make to usable
          var stateW = this.state[state];
          if(this.refs['weight'+id].value){
            stateW[id] =  this.refs['weight'+id].value
          }
          else{
            stateW[id] = (this.state.weight['weight'+id]*this.refs['order_qty'+id].value).toFixed(2)
          }
          this.setState({eWeight:stateW})
          break;
        case  'eWidth':
          var stateWi = this.state[state];
          stateWi[id] =  this.refs['widthType'+id].value
          this.setState({eWidth:stateWi})
          break;
        case  'eOrderqty':
          var stateOr = this.state[state];
          var stateW = this.state.eWeight
          stateOr[id] =  this.refs['order_qty'+id].value
          let getWeight = this.state.weight.find(i=>i.id=='weight'+id)
          if(getWeight){
            stateW[id] = (getWeight.content[0]*this.refs['order_qty'+id].value).toFixed(2)
            this.setState({eOrderqty:stateOr,eWeight:stateW})
          }
          break;
        case  'eStock':
          var stateSt = this.state[state];
          stateSt[id] =  this.refs['stock'+id].value
          this.setState({eStock:stateSt})
          break;
        default:

      }

    }

    onChangeUpdate(item, type, id){
      switch (type) {
        case 'brandType':
          this.getBrandType(item, type, id)
          this._updateStateSelector(id, 'eFilmType')
          break;
        case 'gradeType':
          this.getGradeType(item, type, id)
          this._updateStateSelector(id, 'eBrandType')
          break;
        case 'thickNess':
          this.getThickNess(item, type, id)
          this._updateStateSelector(id, 'eWidth')
          break;
        case 'length':
          this.getLength(item , type, id)
          this._updateStateSelector(id, 'eThick')
          break;
        case 'last':
          this._updateStateSelector(id, 'eLength')
          break;
        case 'weight':
          this.getWeight(item, type, id)
          this._updateStateSelector(id, 'eLength')
          break;
        case 'remark':
          this._updateStateSelector(id, 'eRemark')
          break;
        case 'width':
          this.getWidth(item, type, id)
          this._updateStateSelector(id, 'eGradeType')
          break;
        case 'orderqty':
          this._updateStateSelector(id, 'eOrderqty')
          break;
        case 'stock':
          this._updateStateSelector(id, 'eStock')
          break;
        default:

      }
    }

    getBrandType(item, type, id){
      post('/api/sales/quotation/brand',{filmtype_id: item.filmType})
      .then((response)=>{
        this.updateStateItemSet('brandList', response, type+id)
      })
      .catch(err=>console.log(err))

    }

    getGradeType(item, type, id){
      post('/api/sales/quotation/grade',{ "filmtype_id": item.filmType,  "brand_id": item.brandType })
      .then((response)=>{
          this.updateStateItemSet('gradeList', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    getThickNess(item, type, id){
      post('/api/sales/quotation/thickness',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType, "width": item.widthType })
      .then((response)=>{
          this.updateStateItemSet('thickList', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    getWidth(item, type, id){
      post ('/api/sales/quotation/width', { "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType })
      .then((response)=>{
        this.updateStateItemSet('widthList', response, type+id)
      })
    }

    getWeight(item, type, id){
      post('/api/sales/quotation/weight',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType, "thickness": item.thickNess, "width": item.widthType, "length": item.length })
      .then((response)=>{
        this.updateStateItemSet('weight', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    getLength(item , type, id){
      post('/api/sales/quotation/length',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType, "thickness": item.thickNess, "width": item.widthType })
      .then((response)=>{
        this.updateStateItemSet('length', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    componentDidMount(){
      this.getCustomerList()
      this.props.type=='edit'||this.props.type=='copy'? this._getEditItem():this.setDefaultSalePerson()
      this.getSaleList()
      this.getFilmType()
    }

    setDefaultSalePerson(){
      this.setState({
        state_salePerson: this.props.username
      })
    }

    _getEditItem(){
      post('/api/inventory/do/id', {id: +this.props.editItem})
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
      let objStock = {}
      for(let i in childList){
        objFilm[childList[i]['id']] = childList[i].filmtype_id
        objBrand[childList[i]['id']] = childList[i].brand_id
        objGrade[childList[i]['id']] = childList[i].grade_id
        objThick[childList[i]['id']] = childList[i].thickness
        objLength[childList[i]['id']] = childList[i].product_length
        objWeight[childList[i]['id']] = childList[i].weight
        objRemark[childList[i]['id']] = childList[i].remark
        objWidth[childList[i]['id']] = childList[i].width
        objOrderqty[childList[i]['id']] = childList[i].quantity
        objStock[childList[i]['id']] = childList[i].stock||0
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
        eStock: objStock
      })

      //initiate generate selector from edit val list
      for(let k in childList){
          let item = childList[k]
          this.getBrandType({filmType: item.filmtype_id}, 'brandType', item.id)
          this.getGradeType({filmType: item.filmtype_id, brandType: item.brand_id}, 'gradeType', item.id)
          this.getWidth({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id}, 'widthType', item.id)
          this.getThickNess({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id, widthType: item.width}, 'thickNess', item.id)
          this.getLength({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id, widthType: item.width, thickNess: item.thickness}, 'length', item.id)
          this.getWeight({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id, widthType: item.width, thickNess: item.thickness,  length: item.product_length}, 'weight', item.id )
      }

    }

    _setInitialVal(res){

      let item = res[0]
      let saleperson = this.state.saleList.find((i) => i.value==item.salesperson_id)
      //let pricelist = this.state.priceList.find((i) => i.value==item.pricelist_id)
      this.setState({
        state_contact:item.customer ? item.customer.contact:item.contact,
        // state_tel: item.customer ? item.customer.tel:item.tel ,
        // state_fax: item.customer ? item.customer.fax:item.fax,
        // state_email: item.customer? item.customer.email:item.email,
        state_date: item.deliver_date||'',
        state_time: item.deliver_time||'',
        state_sonumber: item.so_number||'',
        state_ponumber: item.po_number||'',
        state_shipto: item.ship_to||'',
        // state_payterm: item.payment_term,
        // state_deliver: item.delivery_term,
        state_status: item.status,
        state_salePerson: item.saleperson_id,
        // total: item.total,
        childItem: item.contents,
        selectedCustomer: item.customer_id,
      })
      //this.refs['discount'].value = item.discount ||0
      this._setInitialEditContent()
      this._checkPoValue(item)
    }

    save(){
      //send DO
      /*
      customer_id: req.body.customer_id,
      deliver_date: req.body.deliver_date,
      deliver_time: req.body.deliver_time,
      po_number: req.body.po_number,
      ship_to: req.body.ship_to,
      status: req.body.status,
      salesperson_id: req.body.contact_person,
      */
      let obj = Object.assign({},
      {
        customer_id: this.state.selectedCustomer || this.refs['customer'].value,
        deliver_date: this.state.state_date || this.refs['date'].value,
        deliver_time: this.state.state_time || this.refs['time'].value,
        // payterm: this.state.state_payterm || this.refs['payterm'].value,
        // deliver: this.state.state_deliver|| this.refs['deliver'].value,
        so_number: this.state.state_sonumber || this.refs['sonumber'].value,
        po_number: this.state.state_ponumber || this.refs['ponumber'].value,
        ship_to: this.state.state_shipto || this.refs['shipto'].value,
        status:   this.state.state_status|| this.refs['status'].value,
        salesperson_id: this.state.state_salePerson|| this.refs['salePerson'].value,
        // customer_contact: this.state.state_contact,
        // customer_tel: this.state.state_tel,
        // customer_fax: this.state.state_fax,
        // customer_email: this.state.state_email,
        // discount: this.refs['discount'].value ? this.refs['discount'].value : 0,
        // total: this.state.total ? this.state.total : 0,
        content:// list of content
          this.state.childItem.map(i=>{
            return Object.assign({},{
              id:i.id,
              content:{
                film_type:  this.refs['filmType'+i.id].value,
                brand_type: this.refs['brandType'+i.id].value,
                grade_type: this.refs['gradeType'+i.id].value,
                width: this.refs['widthType'+i.id].value,
                thickness: this.refs['thickNess'+i.id].value,
                length: this.refs['length'+i.id].value,
                quantity: this.refs['order_qty'+i.id].value,
                weight: this.refs['weight'+i.id].value,
                remark: this.refs['remark'+i.id].value,
                // subtotal: this.refs['subTotal'+i.id].value,
              }
          })
        })
      })

      if(this.props.type=='edit'){
        obj.inventory_id = parseInt(this.props.editItem)
      }
      console.log('obj',obj);
      let url = this.props.type=='create'||this.props.type=='copy'? '/api/inventory/do/create':'/api/inventory/do/update'
      post(url, obj)
      .then(response => {
        console.log(response);

        this.props.getContent('Delivery Order')
      })
      .catch(err=>console.log(err))
    }

    getFilmTypeOption(){
        let result =  this.state.filmList.map((i=>{return (<option key = {'film'+i.id} value = {i.id}>{i.label}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
    }

    getBrandTypeOption(id){
      let getBrand = this.state.brandList.find(i=>i.id==('brandType'+id))
      if(getBrand){
        let result =  getBrand.content.map((i=>{return (<option key = {'brand'+i.brand_id} value = {i.brand_id}>{i.brand_name}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
      }
    }

    getGradeTypeOption(id){
      let getGrade = this.state.gradeList.find(i=>i.id==('gradeType'+id))
      if(getGrade){
        let result =  getGrade.content.map((i=>{return (<option key = {'grade'+i.grade_id} value = {i.grade_id}>{i.grade_name}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
      }
    }

    getWidthTypeOption(id){
      let getWidth = this.state.widthList.find(i=>i.id==('width'+id))
      if(getWidth){
        let result =  getWidth.content.map((i=>{return (<option key = {'width'+i.width} value = {i.width}>{i.width}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
      }
    }

    getThickNessOption(id){
      let getThick = this.state.thickList.find(i=>i.id==('thickNess'+id))
      if(getThick){
        let result =  getThick.content.map((i=>{return (<option key = {'thick'+i.thickness} value = {i.thickness}>{i.thickness}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
      }

    }

    getLengthOption(id){
      let getLength = this.state.length.find(i=>i.id==('length'+id))
      if(getLength){
        let result =  getLength.content.map((i=>{return (<option key = {'length'+i.length} value = {i.length}>{i.length}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
      }
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
        //Line No > Film Type >> Brand >> Grade >> Width >> Thickness >> Length >> Order Quantity >> Total Weight >> Stock on hand >> Remark
        return (<tr key={i.id} id = {i.id}>
            <td><input type='checkbox' ref = {'checkbox'+i.id} onChange= {()=>this.ifChecked(i.id)}/>{indexNo(index)}</td>
            <td>
                <select ref = {'filmType'+i.id} value = {this.state.eFilmType[i.id]} key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType'], i.id), 'brandType', i.id)} >
                    {this.getFilmTypeOption()}
                </select>
            </td>
            <td>
                <select ref = {'brandType'+i.id} value = {this.state.eBrandType[i.id]} key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType', 'brandType'], i.id), 'gradeType', i.id)}>
                    {this.getBrandTypeOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'gradeType'+i.id} value = {this.state.eGradeType[i.id]} key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType','brandType', 'gradeType'], i.id), 'width', i.id)}>
                    {this.getGradeTypeOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'widthType'+i.id} value = {this.state.eWidth[i.id]}  key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType','brandType', 'gradeType', 'widthType'], i.id), 'thickNess', i.id)}>
                    {this.getWidthTypeOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'thickNess'+i.id} value = {this.state.eThick[i.id]} key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType', 'brandType', 'gradeType', 'widthType', 'thickNess'], i.id), 'length', i.id)}>
                    {this.getThickNessOption(i.id)}
                </select>
                </td>
                <td>
                    <select ref = {'length'+i.id} key={i.id}  value = {this.state.eLength[i.id]} onChange = {() => this.onChangeUpdate(genArg(['filmType','brandType','gradeType','widthType','thickNess', 'length'], i.id), 'weight', i.id)}>
                        {this.getLengthOption(i.id)}
                    </select>
            </td>
            <td><input type='number' ref = {'order_qty'+i.id}  value = {this.state.eOrderqty[i.id]} onChange = {() => this.onChangeUpdate({},'orderqty', i.id)}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'thisweight', i.id)} value = {this.state.eWeight[i.id]} type='number' ref = {'weight'+i.id}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'stock', i.id)} value = {this.state.eStock[i.id]} type='number' ref = {'stock'+i.id}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'remark', i.id)} type='text' ref = {'remark'+i.id}value = {this.state.eRemark[i.id]} /></td>

        </tr>)
      })
      return result
    }


    addChild(){
      let items = this.state.childItem
      let idNo;
      if(this.state.childItem.length == 0){
        idNo = ''+(items.length+1)+''
      }
      else{
        idNo = ''+(parseInt(items[items.length -1].id)+ 1)+''
      }
      if(idNo.length<4){
        for (var i = 0; i < 6-idNo.length; i++) {
          idNo = "0" + idNo
        }
      }
      let newObj = {'id':idNo}
      let newArr = items.concat(newObj)
      this.setState({childItem:newArr})
    }

    updateSelectedCustomer(newVal) {
      console.log("Select Customer")
      console.log(newVal)
      this.getCustomerAsync(newVal.value).then((customer) => {
        // this.setState({state_contact: customer[0].contact_person})
        // this.setState({state_tel: customer[0].telephone})
        // this.setState({state_fax: customer[0].fax})
        // this.setState({state_email: customer[0].email})
        this.setState({selectedCustomer:newVal.value})
      })
    }

    getCustomerAsync(customer_id) {
      return new Promise((resolve,reject)=>{
        post('/api/customer/id', {customer_id: customer_id})
          .then((response)=>{
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            resolve(response)
          })
          .catch(err=>reject())
        })
    }

    updateParam(item){
      let obj ={}
      obj['state_'+item] = this.refs[item].value
      this.setState(obj)

    }

    _checkPoValue(res){
      if (res.sales_order_id) {
        this.setState({soShowState: 'input-box flex'})
      }
      else{
        this.setState({soShowState: 'display-none'})
      }
    }

    getGeneralContent(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Customer :</label>
                  <Select
                      name="customer"
                      ref = 'customer'
                      value={this.state.selectedCustomer}
                      options={this.state.customerList}
                      onChange={(value) => this.updateSelectedCustomer(value)}
                      className = 'selector-class'
                      autosize = {true}
                  />
              </div>
              <div className='input-box flex'>
                  <label>Delivery Date :</label>
                  <input className='flex' type="date" ref='date' value = {this.state.state_date} onChange={()=>this.updateParam('date')}/>
              </div>
              <div className='input-box flex'>
                  <label>Delivery Time :</label>
                  <input className='flex' type="time" ref='time' value = {this.state.state_time} onChange={()=>this.updateParam('time')}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">
              <div className = {this.state.soShowState}>
                  <label>S/O Number:</label>
                  <input className='flex' type="text" ref='sonumber' value = {this.state.state_sonumber} onChange={()=>this.updateParam('sonumber')}/>
              </div>
              <div className='input-box flex'>
                  <label>P/O Number:</label>
                  <input className='flex' type="text" ref='ponumber' value = {this.state.state_ponumber} onChange={()=>this.updateParam('ponumber')}/>
              </div>
              <div className='input-box flex'>
                  <label>Ship To:</label>
                  <input className='flex' type="text" ref='shipto' value = {this.state.state_shipto} onChange={()=>this.updateParam('shipto')}/>
              </div>
          </div>

          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Status :</label>
                  <select ref = 'status' value = {this.state.states_status} onChange={()=>this.updateParam('status')}>{this.state.statusList.map(i=> <option key={i.value} value={i.value}>{i.value}</option>)}</select>
              </div>
              <div className='input-box flex'>
                  <label>Saleperson :</label>
                  <select ref = 'salePerson' value = {this.state.state_salePerson} onChange={()=>this.updateParam('salePerson')}>{this.state.saleList.map(i=> <option key={i.value} value={i.value}>{i.label}</option>)}</select>
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
          var elementPos = array.map((x) => x.id ).indexOf(id);
          var objectFound = array[elementPos];
          // var index = array.indexOf(this.refs["checkbox"+id].value)
          for (var i = 0; i < array.length; i++) {
            if(array[i].id==objectFound.id){
              array.splice(i, 1);
            }
          }

          this.setState({checkedItem: array });
        }
    }

    deleteSelectedChild(){
      this.clearValueInContent(this.state.checkedItem)
      if(this.state.checkedItem.length != 0){
        let arrCheckedItem = this.state.checkedItem.map((element)=>{
          return element.id
        })
        let arrChildItem = this.state.childItem
        let newArrayChildItem = this.state.childItem.slice()
        newArrayChildItem = newArrayChildItem.map((element,index)=>{
          if(arrCheckedItem.find((checked)=> element.id == checked)){
            return -1
          }
          else{
            return element
          }
        })
        for (let i = 0;i < arrCheckedItem.length; i++){
          let start = newArrayChildItem.findIndex((element) => element === -1 )
          newArrayChildItem.splice(start,1)
        }
        this.setState({
          childItem : newArrayChildItem,
          checkedItem : []
        })
      }
    }

    clearValueInContent(arrCheckedItem){
      for (let i = 0;i < arrCheckedItem.length ; i++){
        let {eFilmType,eBrandType,eGradeType,eThick,eLength,eRemark,eWeight,eWidth,eOrderqty}  = this.state;
        delete eFilmType[arrCheckedItem[i].id]
        delete eBrandType[arrCheckedItem[i].id]
        delete eGradeType[arrCheckedItem[i].id]
        delete eThick[arrCheckedItem[i].id]
        delete eLength[arrCheckedItem[i].id]
        delete eRemark[arrCheckedItem[i].id]
        delete eWeight[arrCheckedItem[i].id]
        delete eWidth[arrCheckedItem[i].id]
        delete eOrderqty[arrCheckedItem[i].id]
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
                      <button onClick={()=>this.props.getContent('Delivery Order')}><img src={cancelIcon}/><p>Cancel</p></button>
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
                  <div className='action-group-btn-content'>
                      <button onClick = {()=> this.addChild()}><img src={createIcon}/></button>
                      <button onClick = {()=> this.deleteSelectedChild()}><img src={deleteIcon}/></button>
                  </div>
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
                              <td>Stock on hand(Roll)</td>
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


export default Delivery;
