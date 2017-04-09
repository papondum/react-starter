import React, {PropTypes} from 'react';
import { post ,get } from '../../../../utils'
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import printIcon from '../../../resource/Icon/button_print.png'
import emailIcon from '../../../resource/Icon/button_email.png'
import createIcon from '../../../resource/Icon/button_create.png'
import deleteIcon from '../../../resource/Icon/button_delete.png'
import Select from 'react-select';
import { indexOf, find } from 'lodash'
import 'react-select/dist/react-select.css';
import './style.scss'

class Purchase extends React.Component {
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
            { value: 'Siam Nomura Co.,Ltd.', label: 'Siam Nomura Co.,Ltd.', address:'บริษัท สยามโนมูระ จำกัด 169 หมู่ที่ 4 ซอยเทพกาญจนา ถนนเศรษฐกิจ ตำบลแคราย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74110' },
            { value: 'Poly Mirae Co.,Ltd.', label: 'Poly Mirae Co.,Ltd.',address : 'Poly Mirae Company Limited  9/6 Soi Thamma, Krungkasem Road, Rong muang Pathumwan, Bangkok Thailand 10330' },
            { value : 'Gold Star Line Co.,Ltd.', label : 'Gold Star Line Co.,Ltd.' ,address : 'Gold Star Line Co.,Ltd. 953 Soi Phetkasem 51, Phetkasem Road Bangkae, Bangkok Thailand'},
            { value : 'Lumirror Pet Co.,Ltd.' , label : 'Lumirror Pet Co.,Ltd.',address: 'Lumirror Pet Co.,Ltd. 169 Moo 4 Soi Thepkarnchana Bangkae, Bangkok Thailand Sethakij Road, Kaerai, Kratumbaen Samutsakorn, Thailand'},
            { value : 'WNP Group Co.,Ltd.', label : 'WNP Group Co.,Ltd.', address:'Lumirror Pet Co.,Ltd. WNP Group Co.,Ltd. 106/26 Phahon yothin Road Klong Thanon, Sai mai Bangkok, Thailand '}
          ],
          selectedCompany : '',
          supplierList : [
            { value : 'WNP Group Co.,Ltd.', label : 'WNP Group Co.,Ltd.', address:'Lumirror Pet Co.,Ltd. WNP Group Co.,Ltd. 106/26 Phahon yothin Road Klong Thanon, Sai mai Bangkok, Thailand '}
          ],
          selectedSupplier : '',
          statusList: [{value: 'Open'}, {value: 'In Process'}, {value: 'Released'}, {value: 'Completed'}],
          selectedTab: 'General',
          filmType: '',
          filmList:[],
          childItem: [{id:'0001'}],
          state_contactPerson : '',
          state_tel: '',
          state_fax: '',
          state_email: '',
          state_company:'',
          state_buyer : '',
          state_orderdate:'',
          state_payterm:'',
          state_invoice:'',
          state_status:'Open',
          state_deliverterm: '',
          state_shipto: '',
          state_shipvia : '',
          state_cif : '',
          state_requestdeliverdate: '',
          state_estimatedtimedeparture : '',
          state_estimatedtimearrival : '',
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
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Purchase Order'
      }
      else if(type=='edit'){
        return 'Edit - Purchase Order'
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
        let buyer_default;
        let saleList = response.map((i,index)=>{
          if(index === 0){
            buyer_default = i.id
          }
          return Object.assign({},{value:i.id,label:i.Firstname})
        })
        this.setState({
          saleList: saleList,
          state_buyer : buyer_default
        })

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
      this.getSupplierList()
      this.getCustomerList()
      this.props.type=='edit'? this._getEditItem():''
      this.getSaleList()
      this.getPriceList()
      this.getFilmType()
    }

    getSupplierList(){
      get('/api/supplier/raw')
      .then((response)=>{
        let tempSupplierList = response.map((supplier) => {
          return Object.assign({},supplier,{
            value : supplier.name,
            label : supplier.name
          })
        })
        this.setState({
          supplierList : tempSupplierList
        })
      })
    }

    _getEditItem(){
      post('/api/purchase/id', {id: +this.props.editItem})
      .then((response)=>{
        this._setInitialVal(response)
        console.log("response::::", response);
      })
    }

    _setInitialVal(res){
      console.log(res);
      let item = res[0]
      let selectedSupplier = this.state.supplierList.find((supplier) => {
        return supplier.id == item.supplier_id
      })
      this.setState({
        selectedCompany : item.company,
        selectedSupplier : selectedSupplier,
        state_orderdate: item.order_date,
        state_payterm: item.payterm,
        state_invoice: item.invoice,
        state_status: item.status,
        state_deliverterm: item.deliver,
        state_shipto:  item.shipto,
        state_requestdeliverdate: item.delivery_date,
        state_buyer : item.buyer_id,
        state_contactPerson : item.customer.contact_person,
        state_tel : item.customer.tel,
        state_fax : item.customer.fax,
        state_email : item.customer.email,
        state_shipvia : item.shipvia,
        state_cif : item.cif,
        state_estimatedtimedeparture : item.departure_date,
        state_estimatedtimearrival : item.arrival_date,
        childItem: item.contents,
        edit_id : item.id
      })
      // console.log('Test', this.state.customerList);
      // console.log('Test', this.state.customerList);
      this.refs['discount'].value = item.discount ||0
      this.refs['taxes'].value = item.tax ||0
      this.refs['wotaxes'].value = item.wotax ||0
      this.refs['remark'].value= item.remark || ''
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
      let obj = Object.assign({},{
        company : this.state.selectedCompany,
        supplier_id : this.state.selectedSupplier.id,
        order_date : this.state.state_orderdate,
        payterm : this.state.state_payterm,
        deliver : this.state.state_deliverterm,
        invoice : this.state.state_invoice,
        status : this.state.state_status,
        buyer_id : this.state.state_buyer,
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
        contact_person : this.state.state_contactPerson,
        tel : this.state.state_tel,
        fax : this.state.state_fax,
        email : this.state.state_email,
        shipto : this.state.state_shipto,
        shipvia : this.state.state_shipvia,
        cif : this.state.state_cif,
        delivery_date : this.state.state_requestdeliverdate,
        departure_date : this.state.state_estimatedtimedeparture,
        arrival_date : this.state.state_estimatedtimearrival
      })
      if(this.props.type=='edit'){
        console.log(this.state.edit_id);
        obj.order_id = parseInt(this.state.edit_id)
      }
      console.log(obj)
      let url = this.props.type=='create'? '/api/purchase/create':'/api/purchase/update'
      post(url,obj)
      .then(response => {
        console.log(response);

        this.props.getContent('Purchase Order')
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
            <td><input onChange = {() => this.onChangeUpdate({},'remark', i.id)} type='text' ref = {'remark'+i.id}value = {this.state.eRemark[i.id]} /></td>
            <td><input onChange = {() => this.onChangeUpdate({},'unitprice', i.id)} value = {this.state.eUnitprice[i.id]}  type='number' ref = {'unitPrice'+i.id}/></td>
            <td><input disabled type='number' value = {getSubtotal(this.state.eWeight[i.id], this.state.eUnitprice[i.id])} ref = {'subTotal'+i.id}/></td>
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


    updateParam(item){
      let obj ={}
      obj['state_'+item] = this.refs[item].value
      this.setState(obj)
    }

    setCompanySelected(obj){
      if(obj){
        this.setState({
          selectedCompany : obj.value,
          state_invoice : obj.address,
          state_shipto : obj.address
        })
      }
      else{
        this.setState({
          selectedCompany : '',
          state_invoice : '',
          state_shipto : ''
        })
      }
    }

    setSupplierSelected(obj){
      if(obj){
        this.setState({
          selectedSupplier : obj
        })
      }
      else{
        this.setState({
          selectedSupplier : ''
        })
      }
    }

    getGeneralContent(){
      return (  <div className="flex flex-row ">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Company :</label>
                  <Select
                      name="company"
                      ref = 'company'
                      value={this.state.selectedCompany}
                      options={this.state.companyList}
                      onChange={(selected) => this.setCompanySelected(selected)}
                      className = 'selector-class'
                      autosize = {true}
                  />
              </div>

              <div className='input-box flex'>
                  <label>Supplier :</label>
                  <Select
                      name="supplier"
                      ref = 'supplier'
                      value={this.state.selectedSupplier.value}
                      options={this.state.supplierList}
                      onChange={(selected) => this.setSupplierSelected(selected)}
                      className = 'selector-class'
                      autosize = {true}
                  />
              </div>

              <div className='input-box flex'>
                <label>Order Date:</label>
                <input className='flex' type="date" ref='orderdate' value = {this.state.state_orderdate} onChange={()=>this.updateParam('orderdate')}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Payment Term :</label>
                  <input className='flex' type="text" ref='payterm' value = {this.state.state_payterm} onChange={()=>this.updateParam('payterm')}/>
              </div>
              <div className='input-box flex'>
                  <label>Delivery Term :</label>
                  <input className='flex' type="text" ref='deliverterm' value = {this.state.state_deliverterm} onChange={()=>this.updateParam('deliverterm')}/>
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
                  <label>Buyer :</label>
                  <select ref = 'buyer' value = {this.state.state_buyer} onChange={()=>this.updateParam('buyer')}>
                      {this.state.saleList.map(i=> {
                        console.log(i);
                          return <option value={i.value}>{i.label}</option>})}
                  </select>
              </div>
          </div>
      </div>)
    }

    getShipment(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                <label>Ship To:</label>
                <input className='flex' type="text" ref='shipto' value = {this.state.state_shipto} onChange={()=>this.updateParam('shipto')}/>
              </div>

              <div className='input-box flex'>
                  <label>Ship Via:</label>
                  <input className='flex' type="text" ref='shipvia' value = {this.state.state_shipvia} onChange={()=>this.updateParam('shipvia')}/>
              </div>

              <div className='input-box flex'>
                <label>C.I.F. :</label>
                <input className='flex' type="date" ref='cif' value = {this.state.state_cif} onChange={()=>this.updateParam('cif')}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                <label>Request Deliver Date :</label>
                <input className='flex' type="date" ref='requestdeliverdate' value = {this.state.state_requestdeliverdate} onChange={()=>this.updateParam('requestdeliverdate')}/>
              </div>
              <div className='input-box flex'>
                  <label>Estimated Time of Departure(ETD) :</label>
                  <input className='flex' type="date" ref='estimatedtimedeparture' value = {this.state.state_estimatedtimedeparture} onChange={()=>this.updateParam('estimatedtimedeparture')}/>
              </div>
              <div className='input-box flex'>
                  <label>Estimated Time of Arrival(ATD) :</label>
                  <input className='flex' type="date" ref='estimatedtimearrival' value = {this.state.state_estimatedtimearrival} onChange={()=>this.updateParam('estimatedtimearrival')}/>
              </div>
          </div>

      </div>)
    }

    setContent(item){
      this.setState({selectedTab:item})
    }

    getSupplierContent(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Contact Person :</label>
                  <input className='flex' type="text" ref='contactPerson' value={this.state.state_contactPerson} onChange={()=>this.updateParam('contactPerson')}/>
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
        case 'Supplier Contact':
          return this.getSupplierContent()
          break;
        case 'Ship':
          return this.getShipment()
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
                      <button onClick={()=>this.props.getContent('Purchase Order')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.save()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <div>
                  <div className='flex flex-row'>
                      <div className={this.state.selectedTab === 'General'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('General')}>
                          General
                      </div>
                      <div className={this.state.selectedTab === 'Supplier Contact'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Supplier Contact')}>
                          Supplier Contact
                      </div>
                      <div className={this.state.selectedTab === 'Ship'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Ship')}>
                          Shipment
                      </div>
                  </div>
                  <hr style={{margin : 0}}/>
                  <div className = 'top-content'>
                      {this.getContentFromTab(this.state.selectedTab)}
                  </div>

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
                              <td>Remarks</td>
                              <td>Unit Price(THB/Kg)</td>
                              <td>Subtotal(THB)</td>
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


export default Purchase;
