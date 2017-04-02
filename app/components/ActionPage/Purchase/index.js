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
          selectedCompany: '',
          selectedSupplier : '',
          selectedTab: 'Gen',
          filmType: '',
          filmList:[],
          childItem: [{id:'0001'}]
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
      let {companySelect, supplierSelect, date, payterm, deliver, invoice,status,
        buyerSelected, contactPerson, tel, fax,email,shipto, shipvia, cif,requestDeliveryDate,
        estimateTimeDeparture, estimateTimeArrival
      } = this.refs;
      console.log(this.state.selectedCompany,this.state.supplierSelect,date.value,payterm.value,deliver.value,invoice.value,status.value,buyerSelected.value);
      alert('save')
    }

    updateSelectedCompany(newVal) {
      if(newVal){
        this.setState({
          selectedCompany : newVal.label
        })
        this.refs.invoice.value = newVal.address
      }
      else{
        this.setState({
          selectedCompany : ''
        })
        this.refs.invoice.value = ""
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
                <input className='flex' type="date" ref='date'/>
            </div>

        </div>
        <div className="flex flex-1 flex-col">
            <div className='input-box flex'>
                <label>Payment Term :</label>
                <input className='flex' type="text" ref='payterm'/>
            </div>
            <div className='input-box flex'>
                <label>Deliver Term :</label>
                <input className='flex' type="text" ref='deliver'/>
            </div>
            <div className='input-box flex'>
                <label>Invoice To :</label>
                <input className='flex' type="text" ref='invoice'/>
            </div>
        </div>
        <div className="flex flex-1 flex-col">
            <div className='input-box flex'>
                <label>Status :</label>
                <select ref = 'status' >{this.state.statusList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
            </div>
            <div className='input-box flex'>
                <label>Buyer : </label>
                <select ref = 'buyerSelected'>{}</select>
            </div>
        </div>
    </div>)
    }

    getFormSupplier(){
      return (
        <div className="flex flex-row">
            <div className='flex flex-1 flex-col'>
                <div className='input-box flex'>
                  <label>Contact Person :</label>
                  <input className='flex' type="text" ref='contactPerson'/>
              </div>
              <div className='input-box flex'>
                  <label>Tel :</label>
                  <input className='flex' type="text" ref='tel'/>
              </div>
              <div className='input-box flex'>
                  <label>Fax :</label>
                  <input className='flex' type="text" ref='fax'/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Email :</label>
                  <input className='flex' type="text" ref='email'/>
              </div>
          </div>
      </div>
      )
    }

    getFormShipment(){
      return (
        <div className="flex flex-row">
            <div className='flex flex-1 flex-col'>
                <div className='input-box flex'>
                  <label>Ship to :</label>
                  <input className='flex' type="text" ref='shipto'/>
              </div>
              <div className='input-box flex'>
                  <label>Ship via :</label>
                  <input className='flex' type="text" ref='shipvia'/>
              </div>
              <div className='input-box flex'>
                  <label>C.I.F. :</label>
                  <input className='flex' type="text" ref='cif'/>
              </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Request Delivery Date :</label>
                  <input className='flex' type="date" ref='requestDeliveryDate'/>
              </div>
              <div className='input-box flex'>
                  <label>Estimate Time of Departure (ETD):</label>
                  <input className='flex' type="date" ref='estimateTimeDeparture'/>
              </div>
              <div className='input-box flex'>
                  <label>Estimate Time of Arrival (ATD):</label>
                  <input className='flex' type="date" ref='estimateTimeArrival'/>
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

          </div>)
        }
    }


export default Purchase;
