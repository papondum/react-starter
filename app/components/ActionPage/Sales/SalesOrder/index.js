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
class SalesOrder extends React.Component {
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
          length: [],
          basedPrice: '',
          companyList: [
                { value: 'Siam Nomura Co.,Ltd.', label: 'One' },
                { value: 'Poly Mirae Co.,Ltd.', label: 'Two' }
            ],
          statusList: [{value: 'Open'}, {value: 'In Process'}, {value: 'Released'}, {value: 'Completed'}],
          selectedCustomer: '',
          selectedTab: 'General',
          filmType: '',
          filmList:[],
          childItem: [{id:'0001'}],
          state_contact: '',
          state_tel: '',
          state_fax: '',
          state_email: '',
          state_company:'',
          state_orderdate:'',
          state_ponumber:'',
          state_payterm:'',
          state_invoice:'',
          state_status:'',
          state_salePerson:'',
          state_priceListId:'',
          state_deliverterm: '',
          state_shipto: '',
          state_requestdeliverdate: '',
          state_actualdeliverdate: '',
          state_actualdelivertime: '',
          total_before_discount: 0,
          taxes: 0,
          wotaxes: 0,
          total: 0,
          eFilmType: {},
          eBrandType : {},
          eGradeType: {},
          eThick: {},
          eLength: {},
          eOrderqty: {},
          eWeight: {},
          eUnitprice: {},
          eRemark: {},
          eWidth: {},
          checkedItem: [],
        }
        this.updateSelectedCustomer = this.updateSelectedCustomer.bind(this)
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Sales Order'
      }
      else if(type=='edit'){
        return 'Edit - Sales Order'
      }
    }

    _updateStateSelector(id, state){
      switch (state) {
        case 'eFilmType':
          var stateF = this.state[state];
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
        case  'eWeight':
          var stateW = this.state[state];
          stateW[id] =  this.refs['weight'+id].value
          this.setState({eWeight:stateW})
          break;
        case  'eUnitprice':
          var stateU = this.state[state];
          stateU[id] =  this.refs['unitPrice'+id].value
          this.setState({eUnitprice:stateU})
          break;
        case  'eWidth':
          var stateWi = this.state[state];
          stateWi[id] =  this.refs['width'+id].value
          this.setState({eWidth:stateWi})
          break;
        case  'eOrderqty':
          var stateOr = this.state[state];
          stateOr[id] =  this.refs['order_qty'+id].value
          this.setState({eOrderqty:stateOr})
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
          this._updateStateSelector(id, 'eGradeType')
          break;
        case 'length':
          this.getLength(item , type, id)
          this._updateStateSelector(id, 'eThick')
          break;
        case 'last':
          this._updateStateSelector(id, 'eLength')
        case 'orderqty':
          this._updateStateSelector(id, 'eOrderqty')
        case 'weight':
          this._updateStateSelector(id, 'eWeight')
          this.updateSubTotal(id)
        case 'remark':
          this._updateStateSelector(id, 'eRemark')
        case 'unitprice':
          this._updateStateSelector(id, 'eUnitprice')
          this.updateSubTotal(id)
        case 'width':
          this._updateStateSelector(id, 'eWidth')
          this.updateSubTotal(id)
        default:

      }
    }

    updateUser(){
      let firstname = this.refs.firstname.value
      let lastname = this.refs.lastname.value
      let username = this.refs.username.value
      let password = this.refs.password.value
      let email = this.refs.email.value
      let role = this.refs.role.value
      let url = this.props.type=='create'? '/api/user/create':'/api/user/update'

      if(firstname&&lastname&&password&&email&&role){
        post(url,{"firstname":firstname, "lastname":lastname, "username":username, "password":password, "email":email, "role": role})
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value added
          this.props.getContent('User account')
        })
        .catch(err=>console.log(err))
      }
      else{
        console.log('invalid Input');
      }
    }

    getCustomerList(){
      let url = '/api/customer/raw'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({customerList:response.map(i=>{return Object.assign({},{value:i.id,label:i.name})})})

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

    getPriceList(){
      let url = '/api/price_list/all'
      get(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        this.setState({priceList:response.map(i=>{return Object.assign({},{value:i.id,label:i.Name})})})

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
      post('/api/sales/quotation/thickness',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType })
      .then((response)=>{
          this.updateStateItemSet('thickList', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    getLength(item, type, id){
      post('/api/sales/quotation/length',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType, "thickness": item.thickNess })
      .then((response)=>{
        console.log(response);
        this.updateStateItemSet('length', response, type+id)
      })
      .catch(err=>console.log(err))
    }

    updateSubTotal(id) {
      let price = this.refs['unitPrice'+id].value;
      let weight = this.refs['weight'+id].value;
      if (price && weight) {
        console.log("Set")
        this.refs['subTotal'+id].value = price * weight
      } else {
        this.refs['subTotal'+id].value = 0
      }

      console.log("updateSubTotal" + id)
      var total_before_discount = 0.0
      this.state.childItem.map(i=> {
        let total = this.refs['subTotal'+i.id].value;
        if (total > 0) {
          total_before_discount += parseFloat(total)
        }
      })
      this.setState({total_before_discount: total_before_discount})
      console.log(total_before_discount)
      this.updateAll(total_before_discount)
    }

    updateAll(total_before_discount) {
      console.log("updateAll")
      var total
      if (total_before_discount > 0) {
        total = total_before_discount
      } else {
        total = parseFloat(this.state.total_before_discount)
      }
      // total = parseFloat(this.state.total_before_discount)
      console.log("total_before_discount: " + total)
      let discount = this.refs['discount'].value;
      if ( discount > 0 ) {
        total = total - parseFloat(discount)
      }
      console.log("discount: " + discount)
      console.log("total after discount: " + total)
      let total_after_discount = total
      let wotaxes = this.refs['wotaxes'].value;
      if ( wotaxes > 0 ) {
        let w = (total_after_discount * wotaxes / 100)
        this.setState({wotaxes: w})
        total = total - parseFloat(w)
      }
      console.log("wotaxes: " + wotaxes)
      console.log("total after wotaxes: " + total)
      let taxes = this.refs['taxes'].value;
      if ( taxes > 0 ) {
        let t = (total_after_discount * taxes / 100)
        this.setState({taxes: t})
        total = total + parseFloat(t)
      }
      console.log("taxes: " + taxes)
      console.log("total after taxes: " + total)

      this.setState({total: total})
    }

    updateDiscount() {
      console.log("updateDiscount")
      let total_before_discount = parseFloat(this.state.total_before_discount)
      this.setState({discount: total_before_discount - this.refs['discount'].value})
      this.updateWithholdingTax()
    }

    updateWithholdingTax() {
      console.log("updateWithholdingTax")
      let total_before_discount = this.state.discount
      let taxP = this.refs['wotaxes'].value;

      let tax = (total_before_discount * taxP / 100)
      console.log(tax)
      this.setState({wotaxes: tax})
      this.updateTax()
    }

    updateTax() {
      console.log("updateTax")
      let total_before_discount = this.state.discount
      let taxP = this.refs['taxes'].value;

      let tax = (total_before_discount * taxP / 100)
      this.setState({taxes: tax})
      this.updateTotal()

    }

    updateTotal() {
      var total = parseFloat(this.state.total_before_discount)
      // console.log("total value: " + total)
      let discount = this.refs['discount'].value;
      // console.log("discount value: " + discount)
      if (discount > 0) {
        total = total - parseInt(discount)
      }
      // console.log("discount: " + total)
      var wotaxes = parseFloat(this.state.wotaxes)
      // console.log("wotaxes value: " + wotaxes)
      if (wotaxes > 0) {
        total = total - wotaxes
      }
      // console.log("wotaxes: " + total)
      var taxes = this.state.taxes
      if (taxes > 0) {
        total = total + taxes
      }
      // console.log("taxes: " + total)
      this.setState({total: total})
    }

    getBasedPrice(id){
      if(this.state.basedPrice){
      post('/api/sales/quotation/based_price',{
        "filmtype_id": this.refs['filmType'+id].value||'',
        "brand_id": this.refs['brandType'+id].value,
        "grade_id": this.refs['gradeType'+id].value,
        "thickness": this.refs['thickNess'+id].value,
        "length": this.refs['length'+id].value,
        "pricelist_id": this.refs['priceListId'].value })
        .then((response)=>{
          this.setState({basedPrice:response})
        })
        .catch(err=>console.log(err))
        return this.state.basedPrice
      }
    }

    componentDidMount(){
      this.getCustomerList()
      this.props.type=='edit'? this._getEditItem():''
      this.getSaleList()
      this.getPriceList()
      this.getFilmType()
    }

    _getEditItem(){
      post('/api/sales/order/id', {order_id: +this.props.editItem})
      .then((response)=>{
        this._setInitialVal(response)
        console.log("response::::", response);
      })
    }

    _setInitialVal(res){
      let item = res[0]
      let saleperson = this.state.saleList.find((i) => i.value==item.salesperson_id)
      let pricelist = this.state.priceList.find((i) => i.value==item.pricelist_id)
      //
      //
       this.setState({

      //   state_company: item.company,
      //   state_date: item.quotation_date,

      //   state_priceListId: pricelist,
      //   total: item.total,
         childItem: item.contents,
         selectedCustomer: item.customer_id,
         state_orderdate: item.order_date,
         state_ponumber: item.po_number,
         state_payterm: item.payment_term,
         state_invoice: item.invoice_to,
         state_status: item.status,
         state_salePerson: saleperson.value,
         state_priceListId: pricelist.value,
         state_deliverterm: item.delivery_term,
         state_shipto:  item.ship_to,
         state_requestdeliverdate: item.request_deliver_date,
         state_actualdeliverdate: item.actual_deliver_date,
         state_actualdelivertime: item.actual_deliver_time,
         state_contact: item.customer.contact,
         state_tel: item.customer.tel,
         state_fax: item.customer.fax,
         state_email:  item.customer.email,
      })
      // console.log('Test', this.state.customerList);
      // console.log('Test', this.state.customerList);
      this.refs['discount'].value = item.discount ||0
      this.refs['taxes'].value = item.tax ||0
      this.refs['wotaxes'].value = item.wotax ||0
      this.refs['remark'].value= item.remark
      this._setInitialEditContent()
    }

    _setInitialEditContent(){
      let childList = this.state.childItem
      let objFilm = {}
      let objBrand = {}
      let objGrade = {}
      let objThick = {}
      let objLength = {}
      let objWeight = {}
      let objUnit = {}
      let objRemark = {}
      let objWidth = {}
      let objOrderqty = {}
      for(let i in childList){
        objFilm[childList[i]['id']] = childList[i].filmtype_id
        objBrand[childList[i]['id']] = childList[i].brand_id
        objGrade[childList[i]['id']] = childList[i].grade_id
        objThick[childList[i]['id']] = childList[i].thickness
        objLength[childList[i]['id']] = childList[i].product_length
        objWeight[childList[i]['id']] = childList[i].weight
        objUnit[childList[i]['id']] = childList[i].unit_price
        objRemark[childList[i]['id']] = childList[i].remark
        objWidth[childList[i]['id']] = childList[i].width
        objOrderqty[childList[i]['id']] = childList[i].quantity
      }
      this.setState({
        eFilmType: objFilm,
        eBrandType: objBrand,
        eGradeType: objGrade,
        eThick: objThick,
        eLength: objLength,
        eOrderqty: objOrderqty,
        eWeight: objWeight,
        eUnitprice: objUnit,
        eRemark: objRemark,
        eWidth: objWidth,
      })

      //initiate generate selector from edit val list
      for(let k in childList){
          let item = childList[k]
          this.getBrandType({filmType: item.filmtype_id}, 'brandType', item.id)
          this.getGradeType({filmType: item.filmtype_id, brandType: item.brand_id}, 'gradeType', item.id)
          this.getThickNess({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id}, 'thickNess', item.id)
          this.getLength({filmType: item.filmtype_id, brandType: item.brand_id, gradeType: item.grade_id, thickNess: item.thickness}, 'length', item.id)
      }

    }

    save(){
      //send Quatations
      console.log(this.state.state_salePerson);
      let obj = Object.assign({},
      {
        customer_id: this.state.selectedCustomer ,
        order_date: this.state['state_orderdate'],
        po_num: this.state['state_ponumber'],
        payterm: this.state['state_payterm'],
        invoice: this.state['state_invoice'],
        status: this.state.state_status|| this.refs['status'].value,
        sale_person: this.state.state_salePerson|| this.refs['salePerson'].value,
        price_listId: this.state.state_priceListId|| this.refs['priceListId'].value,
        customer:{
          customer_contact: this.state.state_contact,
          customer_tel: this.state.state_tel,
          customer_fax: this.state.state_fax,
          customer_email: this.state.state_email,
        },

        content:
        this.state.childItem.map(i=>
        {return Object.assign({},{
          id:i.id,
          content:{
            film_type:  this.refs['filmType'+i.id].value,
            brand_type: this.refs['brandType'+i.id].value,
            grade_type: this.refs['gradeType'+i.id].value,
            width:  this.refs['width'+i.id].value,
            thickness: this.refs['thickNess'+i.id].value,
            length: this.refs['length'+i.id].value,
            order_qty: this.refs['order_qty'+i.id].value ,
            weight: this.refs['weight'+i.id].value,
            based_price: 0,
            subtotal: this.refs['subTotal'+i.id].value,
            unitprice: this.refs['unitPrice'+i.id].value,
            remark: this.refs['remark'+i.id].value,
          }
          })
        }),
        remarks: this.refs['remark'].value,
        totalbefore:  this.state.total_before_discount,
        discount: this.refs['discount'].value ? this.refs['discount'].value : 0,
        tax: this.refs['taxes'].value ? this.refs['taxes'].value : 0,
        wotax: this.refs['wotaxes'].value ? this.refs['wotaxes'].value : 0,
        total: this.state.total ? this.state.total : 0,

        shipment:{
          deliverterm:  this.state.state_deliverterm,
          shipto: this.state.state_shipto,
          requestdeliverdate: this.state.state_requestdeliverdate,
          actualdeliverdate:  this.state.state_actualdeliverdate,
          actualdelivertime:  this.state.state_actualdelivertime,
        },
        attachment:[]
      })
      if(this.props.type=='edit'){
        console.log();
        obj.order_id = parseInt(this.props.editItem)
      }
      console.log(obj)
      let url = this.props.type=='create'? '/api/sales/order/create':'/api/sales/order/update'
      post(url,obj)
      .then(response => {
        console.log(response);

        this.props.getContent('Sales Order')
      })
      .catch(err=>console.log(err))
    }

    getFilmTypeOption(){
        let result =  this.state.filmList.map((i=>{return (<option key = {'film'+i.id} value = {i.id}>{i.label}</option>)}))
        result.unshift(<option key='select'>Select Item</option>)
        return result
    }

    getBrandTypeOption(id){
      console.log(this.state.brandList);
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

    getChildItem(){
      let items = this.state.childItem
      let result = items.map((i, index)=>{
        let genArg = (arr,id)=>{
          //return as object filmType:val brandType:val
          let result = {}
          for (var i=0; i<arr.length; i++) {
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
                <select ref = {'gradeType'+i.id} value = {this.state.eGradeType[i.id]}  key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType','brandType', 'gradeType'], i.id), 'thickNess', i.id)}>
                    {this.getGradeTypeOption(i.id)}
                </select>
            </td>
            <td>
                <input type='number' ref = {'width'+i.id} value = {this.state.eWidth[i.id]} onChange = {() => this.onChangeUpdate({},'width', i.id)}/>
            </td>
            <td>
                <select ref = {'thickNess'+i.id} value = {this.state.eThick[i.id]} key={i.id} onChange = {() => this.onChangeUpdate(genArg(['filmType','brandType','gradeType','thickNess'], i.id), 'length', i.id)}>
                    }>
                    {this.getThickNessOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'length'+i.id} key={i.id}  value = {this.state.eLength[i.id]} onChange = {() => this.onChangeUpdate({},'last', i.id)}>
                    {this.getLengthOption(i.id)}
                </select>
            </td>
            <td><input type='number' ref = {'order_qty'+i.id}  value = {this.state.eOrderqty[i.id]} onChange = {() => this.onChangeUpdate({},'orderqty', i.id)}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'weight', i.id)} value = {this.state.eWeight[i.id]} type='number' ref = {'weight'+i.id}/></td>
            <td>0</td>
            <td><input onChange = {() => this.onChangeUpdate({},'unitprice', i.id)} value = {this.state.eUnitprice[i.id]}  type='number' ref = {'unitPrice'+i.id}/></td>
            <td><input disabled type='number' value = {getSubtotal(this.state.eWeight[i.id], this.state.eUnitprice[i.id])} ref = {'subTotal'+i.id}/></td>
            <td><input onChange = {() => this.onChangeUpdate({},'remark', i.id)} type='text' ref = {'remark'+i.id}value = {this.state.eRemark[i.id]} /></td>
        </tr>)
      })
      return result
    }

    addChild(){
      let items = this.state.childItem
      let idNo = ''+(items.length+1)+''
      if(idNo.length<4){
        for (var i = 0; i < 6-idNo.length; i++) {;
          idNo = "0" + idNo
        }
      }
      let newObj = {'id':idNo}
      let newArr = items.concat(newObj)
      this.setState({childItem:newArr})
    }

    getCustomerOption(){
      let result = this.state.customerList.map(i=>{
        return (<option key = {i.id} value = {i.id}>{i.name}</option>)
      })
      return result
    }

    updateSelectedCustomer(newVal) {
      this.getCustomerAsync(newVal.value).then((customer) => {
        console.log(customer);
        this.setState({state_contact: customer[0].contact_person})
        this.setState({state_tel: customer[0].telephone})
        this.setState({state_fax: customer[0].fax})
        this.setState({state_email: customer[0].email})
        this.setState({selectedCustomer:newVal.value})
      })
    }

    getCustomerAsync(customer_id) {
      console.log(customer_id);
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

    getGeneralContent(){
      return (  <div className="flex flex-row ">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Customer :</label>
                  <Select
                      name="customer"
                      ref = 'customer'
                      value={this.state.selectedCustomer}
                      options={this.state.customerList}
                      onChange={this.updateSelectedCustomer}
                      className = 'selector-class'
                      autosize = {true}
                  />
              </div>

              <div className='input-box flex'>
                  <label>Order Date :</label>
                  <input className='flex' type="date" ref='orderdate' value = {this.state.state_orderdate} onChange={()=>this.updateParam('orderdate')}/>
              </div>

              <div className='input-box flex'>
                  <label>P/O Number:</label>
                  <input className='flex' type="text" ref='ponumber' value = {this.state.state_ponumber} onChange={()=>this.updateParam('ponumber')}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Payment Term :</label>
                  <input className='flex' type="text" ref='payterm' value = {this.state.state_payterm} onChange={()=>this.updateParam('payterm')}/>
              </div>
              <div className='input-box flex'>
                  <label>Invoice To :</label>
                  <input className='flex' type="text" ref='invoice' value = {this.state.state_invoice} onChange={()=>this.updateParam('invoice')}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Status :</label>
                  <select ref = 'status' value = {this.state.state_status} onChange={()=>this.updateParam('status')}>
                      {this.state.statusList.map(i=> <option value={i.value}>{i.value}</option>)}
                  </select>
              </div>
              <div className='input-box flex'>
                  <label>Saleperson :</label>
                  <select ref = 'salePerson' value = {this.state.state_salePerson} onChange={()=>this.updateParam('salePerson')}>
                      {this.state.saleList.map(i=> {
                          return <option value={i.value}>{i.label}</option>})}
                  </select>
              </div>
              <div className='input-box flex'>
                  <label>Price list :</label>
                  <select ref = 'priceListId' value = {this.state.state_priceListId} onChange={()=>this.updateParam('priceListId')}>
                      {this.state.priceList.map(i=> <option key={i.value} value={i.value}>{i.label}</option>)}
                  </select>
              </div>
          </div>
      </div>)
    }

    getShipment(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Deliver Terms:</label>
                  <input className='flex' type="text" ref='deliverterm' value = {this.state.state_deliverterm} onChange={()=>this.updateParam('deliverterm')}/>
              </div>

              <div className='input-box flex'>
                  <label>Ship To:</label>
                  <input className='flex' type="text" ref='shipto' value = {this.state.state_shipto} onChange={()=>this.updateParam('shipto')}/>
              </div>

              <div className='input-box flex'>
                  <label>Request Deliver Date :</label>
                  <input className='flex' type="date" ref='requestdeliverdate' value = {this.state.state_requestdeliverdate} onChange={()=>this.updateParam('requestdeliverdate')}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Actual Deliver Date :</label>
                  <input className='flex' type="date" ref='actualdeliverdate' value = {this.state.state_actualdeliverdate} onChange={()=>this.updateParam('actualdeliverdate')}/>
              </div>
              <div className='input-box flex'>
                  <label>Actual Deliver Time :</label>
                  <input className='flex' type="time" ref='actualdelivertime' value = {this.state.state_actualdelivertime} onChange={()=>this.updateParam('actualdelivertime')}/>
              </div>
          </div>

      </div>)
    }

    setContent(item){
      this.setState({selectedTab:item})
    }

    getContactContent(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Contact Person :</label>
                  <input className='flex' type="text" ref='contact' value={this.state.state_contact} onChange={()=>this.updateParam('contact')}/>
              </div>
              <div className='input-box flex'>
                  <label>Tel :</label>
                  <input className='flex' type="text" ref='tel'  value={this.state.state_tel} onChange={()=>this.updateParam('tel')}/>
              </div>
              <div className='input-box flex'>
                  <label>Fax :</label>
                  <input className='flex' type="text" ref='fax' value={this.state.state_fax} onChange={()=>this.updateParam('fax')}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Email :</label>
                  <input className='flex' type="text" ref='email' value={this.state.state_email} onChange={()=>this.updateParam('email')}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">

          </div>
      </div>)
    }

    getContentFromTab(tab){
      switch (tab) {
        case 'General':
          return this.getGeneralContent()
          break;
        case 'Contact':
          return this.getContactContent()
          break;
        case 'Ship':
          return this.getShipment()
          break;
        case 'Attachment':

          break;
        default:

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
                      <button onClick={()=>this.props.getContent('Sales Order')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.save()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <div>
                  <div className='flex flex-row'>
                      <div className={this.state.selectedTab === 'General'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('General')}>
                          General
                      </div>
                      <div className={this.state.selectedTab === 'Contact'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Contact')}>
                          Customers Contact
                      </div>
                      <div className={this.state.selectedTab === 'Ship'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Ship')}>
                          Shipment
                      </div>
                      {/*
                          <div className={this.state.selectedTab === 'Attach'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Attach')}>
                          Attachment
                          </div>
                      */}
                  </div>
                  <hr style={{margin : 0}}/>
                  <div className = 'top-content'>
                      {this.getContentFromTab(this.state.selectedTab)}
                  </div>

                  {/* {this.state.selectedTab=='Gen'? this.getGeneralContent():this.getContactContent()} */}

              </div>
              <hr style={{margin : 0}}/>
              <div className="flex flex-row space-bet" >
                  <div className='tab-quo active'>Content</div>
                  <div className='action-group-btn-content'>
                      <button onClick = {()=>this.addChild()}><img src={createIcon}/></button>
                      <button><img src={deleteIcon}/></button>
                  </div>
              </div>
              <div className = 'content-quo-table'>
                  <table>
                      <thead>
                          <tr>
                              <td><input type='checkbox'/>Line No.</td>
                              <td>Film Type</td>
                              <td>Brand</td>
                              <td>Grade</td>
                              <td>Width</td>
                              <td>Thickness</td>
                              <td>Length</td>
                              <td>Order Qty. (Roll)</td>
                              <td>Total Weight(Kg)</td>
                              <td>Based Price</td>
                              <td>Unit Price(THB/Kg)</td>
                              <td>Subtotal(THB)</td>
                              <td>Remarks</td>
                          </tr>
                      </thead>
                      <tbody>
                          {this.getChildItem()}
                      </tbody>
                  </table>
              </div>
              <div className = 'flex create-quo-btm'>
                  <div className = 'flex-1'>
                      <p>Remarks</p>
                      <textarea rows="5" cols="40" ref = 'remark' />
                  </div>
                  <div className = 'flex-1'>
                      <div className = 'flex-row flex'>
                          <span className = 'create-quo-btm-input-label-left'>Total before discount</span>&nbsp;&nbsp;&nbsp;
                          <span>{this.state.total_before_discount}</span></div>
                      <div className = 'flex-row flex'>
                          <span className = 'create-quo-btm-input-label-left'>Discount</span>&nbsp;&nbsp;&nbsp; <input type = 'number' ref = 'discount' onChange={()=>this.updateAll(0)}/></div>
                      <div className = 'flex-row flex'>
                          <span className = 'create-quo-btm-input-label-left'>Taxes
                              <input type = 'number' ref = 'taxes' onChange={()=>this.updateAll(0)}/>%</span>&nbsp;&nbsp;&nbsp;
                          <span>{this.state.taxes}</span></div>
                      <div className = 'flex-row flex'>
                          <span className = 'create-quo-btm-input-label-left'>Withholding Taxes
                              <input type = 'number' ref = 'wotaxes' onChange={()=>this.updateAll(0)}/>%</span>&nbsp;&nbsp;&nbsp;
                          <span>{this.state.wotaxes}</span></div>
                      <div className = 'flex-row flex'>
                          <span className = 'create-quo-btm-input-label-left'>Total</span>&nbsp;&nbsp;&nbsp;                 <span>{this.state.total}</span></div>
                  </div>
              </div>
          </div>)
        }
    }


export default SalesOrder;
