import React, {PropTypes} from 'react';
import { post ,get } from '../../../../utils'
import cancelIcon from '../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../resource/Icon/button_save.png'
import printIcon from '../../../resource/Icon/button_print.png'
import emailIcon from '../../../resource/Icon/button_email.png'
import createIcon from '../../../resource/Icon/button_create.png'
import deleteIcon from '../../../resource/Icon/button_delete.png'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.scss'

const mockContent = [
  {
    "id" : "1",
    "Line.No" : "001",
    "Film Type" : "M-Pet",
    "Brand" : "SRF",
    "Grade" : "good",
    "Width" : "1600",
    "Thinkness" : "12",
    "Length" : "1200",
    "Order QTY" : "150000",
    "Total Weight" : "190000",
    "Unit Price" : "500",
    "SubTotal" : "10000"
  },
  {
    "id" : "2",
    "Line.No" : "002",
    "Film Type" : "M-Pet",
    "Brand" : "SRF",
    "Grade" : "good",
    "Width" : "1600",
    "Thinkness" : "12",
    "Length" : "1200",
    "Order QTY" : "150000",
    "Total Weight" : "190000",
    "Unit Price" : "500",
    "SubTotal" : "10000"
  }
]
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
          supplierList : [],
          statusList: [{value: 'Open'}, {value: 'In Process'}, {value: 'Confirmed'},{value: 'Ready To Submit'},{value: 'Submitted'}, {value: 'Completed'},{value: 'Canceled'}],
          buyerList : [{value : 'taey'},{value:'papon'},{value:'team'}],
          selectedCompany: '',
          selectedSupplier : '',
          selectedTab: 'Gen',
          userFillGenDate : '',
          userFillGenPayment : '',
          userFillGenDeliver : '',
          userFillGenInvoice : '',
          userFillGenStatus : '',
          userFillGenBuyer : '',
          userFillSupContactPerson : '',
          userFillSupTel : '',
          userFillSupFax : '',
          userFillSupEmail : '',
          userFillShipShipto : '',
          userFillShipShipvia : '',
          userFillShipCIF : '',
          userFillShipDeliverDate : '',
          userFillShipDeparture : '',
          userFillShipArrival : ''
        }
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Purchase Order'
      }
      else if(type=='edit'){
        return 'Edit - Purchase'
      }
    }

    componentDidMount(){
      get('/api/supplier/raw')
      .then((response)=> {
       if (response.status >= 400) {
         throw new Error("Bad response from server");
       }

        let temp = response.map((list) => {
          return {...list,label : list.name}
        })
        this.setState({
          supplierList : temp
        })
        console.log(this.state.supplierList);
       })
       .catch(err=>console.log(err))
    }

    save(){
      //send Purchase
      console.log(this.state.selectedCompany,this.state.selectedSupplier,this.state.userFillGenDate);
      console.log(this.state.userFillGenPayment,this.state.userFillGenDeliver,this.state.userFillGenInvoice);
      console.log(this.state.userFillGenStatus,this.state.userFillGenBuyer);
      console.log(this.state.userFillSupContactPerson,this.state.userFillSupTel,this.state.userFillSupFax);
      console.log(this.state.userFillSupEmail);
      console.log(this.state.userFillShipShipto,this.state.userFillShipShipvia,this.state.userFillShipCIF);
      console.log(this.state.userFillShipDeliverDate,this.state.userFillShipDeparture,this.state.userFillShipArrival);
      let obj = {
        company: this.state.selectedCompany,
        supplier: this.state.selectedSupplier,
        date: this.state.userFillGenDate,
        payterm: this.state.userFillGenPayment,
        deliver: this.state.userFillGenDeliver,
        invoice : this.state.userFillGenInvoice,
        status:   this.state.userFillGenStatus,
        buyer : this.state.userFillGenBuyer,
        contact_person : this.state.userFillSupContactPerson,
        tel : this.state.userFillSupTel,
        fax : this.state.userFillSupFax,
        email : this.state.userFillSupEmail,
        shipto : this.state.userFillShipShipto,
        shipvia : this.state.userFillShipShipvia,
        cif : this.state.userFillShipCIF,
        delivery_date : this.state.userFillShipDeliverDate,
        departure_date : this.state.userFillShipDeparture,
        arrival_date : this.state.userFillShipArrival,

        // discount: this.refs['discount'].value ? this.refs['discount'].value : 0,
        // tax: this.refs['taxes'].value ? this.refs['taxes'].value : 0,
        // wotax: this.refs['wotaxes'].value ? this.refs['wotaxes'].value : 0,
        // total: this.state.total ? this.state.total : 0,
        // revise_message: this.refs['revise_message'].value,
        // remark: this.refs['remark'].value,
      }
      // Object.assign({},
      // {
        // company: this.state.state_company|| this.refs['company'].value,
        // customer: this.state.selectedCustomer || this.refs['customer'].value,
        // date: this.state.state_date || this.refs['date'].value,
        // payterm: this.state.state_payterm || this.refs['payterm'].value,
        // deliver: this.state.state_deliver|| this.refs['deliver'].value,
        // status:   this.state.states_staus|| this.refs['status'].value,
        // sale_person: this.state.state_salePerson|| this.refs['salePerson'].value,
        // price_listId: this.state.state_priceListId|| this.refs['priceListId'].value,
        // customer_contact: this.state.state_contact,
        // customer_tel: this.state.state_tel,
        // customer_fax: this.state.state_fax,
        // customer_email: this.state.state_email,
        //
        // discount: this.refs['discount'].value ? this.refs['discount'].value : 0,
        // tax: this.refs['taxes'].value ? this.refs['taxes'].value : 0,
        // wotax: this.refs['wotaxes'].value ? this.refs['wotaxes'].value : 0,
        // total: this.state.total ? this.state.total : 0,
        // revise_message: this.refs['revise_message'].value,
        // remark: this.refs['remark'].value,
      //   content:// list of content
      //     this.state.childItem.map(i=>{
      //       return Object.assign({},{
      //         id:i.id,
      //         content:{
      //           film_type:  this.refs['filmType'+i.id].value,
      //           brand_type: this.refs['brandType'+i.id].value,
      //           grade_type: this.refs['gradeType'+i.id].value,
      //           thickness: this.refs['thickNess'+i.id].value,
      //           length: this.refs['length'+i.id].value,
      //           weight: this.refs['weight'+i.id].value,
      //           remark: this.refs['remark'+i.id].value,
      //           based_price: this.state.basedPrice ? this.state.basedPrice : 0,//   need select id
      //           unitprice: this.refs['unitPrice'+i.id].value,
      //           subtotal: this.refs['subTotal'+i.id].value,
      //         }
      //     })
      //   })
      // })
      //
      // if(this.props.type=='edit'){
      //   console.log();
      //   obj.quotation_id = parseInt(this.props.editItem)
      // }
      // console.log('obj',obj);
      let url = this.props.type=='create'? '/api/purchase/create':'/api/purchase/update'
      post(url, obj)
      .then(response => {
        console.log(response);

        this.props.getContent('Purchase Order')
      })
      .catch(err=>console.log(err))
      alert('save')
    }

    updateSelectedCompany(newVal) {
      if(newVal){
        this.setState({
          selectedCompany : newVal.label,
          userFillGenInvoice : newVal.address
        })
      }
      else{
        this.setState({
          selectedCompany : '',
          userFillGenInvoice : ''
        })
      }
    }

    updateSelectedSupplier(newVal){
      if(newVal){
        this.setState({
          selectedSupplier : newVal.label
        })
      }
      else{
        this.setState({
          selectedSupplier : ''
        })
      }
    }
    genSetDate(){
      this.setState({
        userFillGenDate : this.refs.date.value
      })

    }

    setUserFillGenInvoice(){
      this.setState({
        userFillGenInvoice : this.refs.invoice.value
      })
    }

    setUserFillGenPayterm(){
      this.setState({
        userFillGenPayment : this.refs.payterm.value
      })
    }

    setUserFillGenDeliver(){
      this.setState({
        userFillGenDeliver : this.refs.deliver.value
      })
    }

    setUserFillGenBuyer(){
      this.setState({
        userFillGenBuyer : this.refs.buyerSelected.value
      })
    }

    setUserFillGenStatus(){
      this.setState({
        userFillGenStatus : this.refs.status.value
      })
    }

    getFormGeneral(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Company :</label>
                  <Select
                      name="company"
                      ref = 'companySelect'
                      value={this.state.selectedCompany}
                      options={this.state.companyList}
                      onChange={(selected)=> this.updateSelectedCompany(selected)}
                      className = 'selector-class'
                      autosize = {true}
                  />
              </div>
              <div className='input-box flex'>
                <label>Supplier :</label>
                <Select
                    name="supplier"
                    ref = 'supplierSelect'
                    value={this.state.selectedSupplier}
                    options={this.state.supplierList}
                    onChange={(selected) => this.updateSelectedSupplier(selected)}
                    className = 'selector-class'
                    autosize = {true}
                />
            </div>
            <div className='input-box flex'>
                <label>Date :</label>
                <input className='flex' type="date" ref='date' onChange={()=> this.genSetDate()} value={this.state.userFillGenDate}/>
            </div>

        </div>
        <div className="flex flex-1 flex-col">
            <div className='input-box flex'>
                <label>Payment Term :</label>
                <input className='flex' type="text" ref='payterm' onChange={()=> this.setUserFillGenPayterm()} value={this.state.userFillGenPayment}/>
            </div>
            <div className='input-box flex'>
                <label>Deliver Term :</label>
                <input className='flex' type="text" ref='deliver' onChange={()=> this.setUserFillGenDeliver()} value={this.state.userFillGenDeliver}/>
            </div>
            <div className='input-box flex'>
                <label>Invoice To :</label>
                <input className='flex' type="text" ref='invoice' value={this.state.userFillGenInvoice} onChange={()=>this.setUserFillGenInvoice()}/>
            </div>
        </div>
        <div className="flex flex-1 flex-col">
            <div className='input-box flex'>
                <label>Status :</label>
                <select ref = 'status' onChange={()=> this.setUserFillGenStatus()}>{this.state.statusList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
            </div>
            <div className='input-box flex'>
                <label>Buyer : </label>
                <select ref = 'buyerSelected' onChange={()=> this.setUserFillGenBuyer()}>{this.state.buyerList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
            </div>
        </div>
    </div>)
    }

    setUserFillSupContactPerson(){
      this.setState({
        userFillSupContactPerson : this.refs.contactPerson.value
      })
    }

    setUserFillSupTel(){
      this.setState({
        userFillSupTel : this.refs.tel.value
      })
    }

    setUserFillSupFax(){
      this.setState({
        userFillSupFax : this.refs.fax.value
      })
    }

    setUserFillSupEmail(){
      this.setState({
        userFillSupEmail : this.refs.email.value
      })
    }

    getFormSupplier(){
      return (
        <div className="flex flex-row">
            <div className='flex flex-1 flex-col'>
                <div className='input-box flex'>
                  <label>Contact Person :</label>
                  <input className='flex' type="text" ref='contactPerson' onChange={()=>this.setUserFillSupContactPerson()} value={this.state.userFillSupContactPerson}/>
              </div>
              <div className='input-box flex'>
                  <label>Tel :</label>
                  <input className='flex' type="text" ref='tel' onChange={()=>this.setUserFillSupTel()} value={this.state.userFillSupTel}/>
              </div>
              <div className='input-box flex'>
                  <label>Fax :</label>
                  <input className='flex' type="text" ref='fax' onChange={()=>this.setUserFillSupFax()} value={this.state.userFillSupFax}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Email :</label>
                  <input className='flex' type="text" ref='email' onChange={()=>this.setUserFillSupEmail()} value={this.state.userFillSupEmail}/>
              </div>
          </div>
      </div>
      )
    }

    setUserFillShipShipto(){
      this.setState({
        userFillShipShipto : this.refs.shipto.value
      })
    }

    setUserFillShipShipVia(){
      this.setState({
        userFillShipShipvia : this.refs.shipvia.value
      })
    }

    setUserFillShipCIF(){
      this.setState({
        userFillShipCIF : this.refs.cif.value
      })
    }

    setUserFillShipDeliveryDate(){
      this.setState({
        userFillShipDeliverDate : this.refs.requestDeliveryDate.value
      })
    }

    setUserFillShipDeparture(){
      this.setState({
        userFillShipDeparture : this.refs.estimateTimeDeparture.value
      })
    }

    setUserFillShipArrival(){
      this.setState({
        userFillShipArrival : this.refs.estimateTimeArrival.value
      })
    }

    getFormShipment(){
      return (
        <div className="flex flex-row">
            <div className='flex flex-1 flex-col'>
                <div className='input-box flex'>
                  <label>Ship to :</label>
                  <input className='flex' type="text" ref='shipto' onChange={()=>this.setUserFillShipShipto()} value={this.state.userFillShipShipto}/>
              </div>
              <div className='input-box flex'>
                  <label>Ship via :</label>
                  <input className='flex' type="text" ref='shipvia' onChange={()=>this.setUserFillShipShipVia()} value={this.state.userFillShipShipvia}/>
              </div>
              <div className='input-box flex'>
                  <label>C.I.F. :</label>
                  <input className='flex' type="text" ref='cif' onChange={()=>this.setUserFillShipCIF()} value={this.state.userFillShipCIF}/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Request Delivery Date :</label>
                  <input className='flex' type="date" ref='requestDeliveryDate' onChange={()=>this.setUserFillShipDeliveryDate()} value={this.state.userFillShipDeliverDate}/>
              </div>
              <div className='input-box flex'>
                  <label>Estimate Time of Departure (ETD):</label>
                  <input className='flex' type="date" ref='estimateTimeDeparture' onChange={()=>this.setUserFillShipDeparture()} value={this.state.userFillShipDeparture}/>
              </div>
              <div className='input-box flex'>
                  <label>Estimate Time of Arrival (ATD):</label>
                  <input className='flex' type="date" ref='estimateTimeArrival' onChange={()=>this.setUserFillShipArrival()} value={this.state.userFillShipArrival}/>
              </div>
          </div>
      </div>
      )
    }

    setContent(item){
      this.setState({selectedTab:item})
    }

    getFormContent(form){
      if(form === 'Gen'){
        return this.getFormGeneral()
      }
      else if(form === 'Sup'){
        return this.getFormSupplier()
      }
      else{
        return this.getFormShipment()
      }
    }

    getRemarkAndCalculation(){
      return (
        <div className="flex flex-space-between">
            <div className="flex flex-col remark">
            Remark :
            <div>
            <textarea ref="remarkText"></textarea>
            </div>
            </div>
            <div className="flex">
            <div className="flex flex-col" style={{marginRight:'10px',textAlign:"end"}}>
            <div>
            Total Before Discount :
            </div>
            <div>
            Discount :
            </div>
            <div>
            Taxes : <input type="text" ref="tax" /> %
            </div>
            <div>
              Withholding Taxes <input type="text" ref="holdingtax" /> %
            </div>
            <div>
              Total :
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              7500
            </div>
            <div>
              <input type="text" ref="discount" />
            </div>
            <div>
              490
            </div>
            <div>
              blank space
            </div>
            <div>
              7490
            </div>
          </div>
        </div>
      </div>
      )
    }

    getMiddlePurchaseForm(){
      return (
        <table>
            <thead>
                <tr>
                    {this.getHeaderPurchaseOrderLine(mockContent)}
                </tr>
            </thead>
            <tbody>
                {this.getPurchaseOrderLineContent(mockContent)}
            </tbody>
        </table>
      )
    }
    getHeaderPurchaseOrderLine(content){
      let genHead=[]
      if(content.length>0){
        var head = Object.keys(content[0])
        genHead = head.map(item=>{
          if (item == 'id') {
            return (<td key= {item} style={{display: 'none'}}>{item}</td>)
          } else {
            return (<td key= {item}>{item}</td>)
          }
        })
      }
      genHead.unshift(<td key='checkbox'><input type='checkbox'/></td>)
      return genHead
    }

    getPurchaseOrderLineContent(content){
      return this._contentGen(content)
    }

    _contentGen(content){
      var result = []

      for(var i=0 ;i<content.length;i++){
          let eachRow = this._getEachVal(content[i],'content')
          // working on here -> detect click in each row and send id to rowClicked function
          let itemId = content[i].id
          result.push((<tr className ="clickable-item" onClick={()=>this.rowClicked(itemId)} key = {i}>{eachRow}</tr>))
      }
      return result
    }

    _getEachVal(obj,type){
      var result=[]
      for(var o in obj){
        if (o == 'id') {
          result.push((<td key={o} style={{display: 'none'}}>{obj[o]}</td>))
        } else {
          result.push((<td key={o}>{obj[o]}</td>))
        }
      }
      if(type !== 'line'){
        result.unshift((<td key='checkbox'><input onChange = {()=>this.ifChecked(obj.id, type)} type = 'checkbox' value = {obj.id} ref = {type+'_'+obj.id} /></td>))
      }
      return result
    }

    rowClicked(i) {
      console.log("row click " + i)
      // if(this.props.type == 'Quotation'){
      //   post('/api/sales/quotation/line', {'quotation_id':i})
      //     .then(response=>this.setState({thisLine:response}))
      // }
      // else if(this.props.type == "Sales Order"){
      //   console.log('triggered');
      //   post('/api/sales/order/line', {'order_id':i})
      //     .then(response=>
      //       this.setState({thisLine:response})
      //     )
      // }

      //this.setState({thisLine:i})
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
                      <div className={this.state.selectedTab === 'Gen'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Gen')}>
                          General
                      </div>
                      <div className={this.state.selectedTab === 'Sup'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Sup')}>
                          Supplier Contact
                      </div>
                      <div className={this.state.selectedTab === 'Ship'? 'tab-quo active' : 'tab-quo'} onClick={()=>this.setContent('Ship')}>
                          Shipment
                      </div>
                  </div>
                  <hr style={{margin : 0}}/>
                  {
                      this.getFormContent(this.state.selectedTab)
                  }
              </div>
              <hr/>
              <div className="flex flex-row space-bet" >
                <div className='tab-quo active'>Contents</div>
                <div className='action-group-btn-content'>
                  <button onClick = {()=>this.addChild()}><img src={createIcon}/></button>
                  <button><img src={deleteIcon}/></button>
                </div>
              </div>
              <hr style={{margin : 0}} />
              {
                this.getMiddlePurchaseForm()
              }
              <hr style={{margin : 0}} />
              {
                this.getRemarkAndCalculation()
              }
          </div>)
        }
    }


export default Purchase;
