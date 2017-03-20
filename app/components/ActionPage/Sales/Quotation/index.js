import React, {PropTypes} from 'react';
import { post ,get } from '../../../../../utils'
import cancelIcon from '../../../../resource/Icon/button_cancel.png'
import saveIcon from '../../../../resource/Icon/button_save.png'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.scss'
class Quotation extends React.Component {
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
          selectedTab: 'Gen',
          filmType: '',
          filmList:[],
          childItem: [{id:'0001'}]
        }
        this.updateSelectedCustomer = this.updateSelectedCustomer.bind(this)
    }

    _genHeader(type){
      if(type=='create'){
        return 'Create - Quotaion'
      }
      else if(type=='edit'){
        return 'Edit - Quotation'
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
        this.setState({saleList:response.map(i=>{return Object.assign({},{value:i.Firstname,label:i.Firstname})})})

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
        this.setState({priceList:response.map(i=>{return Object.assign({},{value:i.Name,label:i.Name})})})

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
            this.setState({filmList:response.map(i=>{return Object.assign({}, {value: i.film_name, label: i.film_name, id:i.id})})})
          })
          .catch(err=>console.log(err))
    }


    getBrandType(item){
      post('/api/sales/quotation/brand',{filmtype_id: item})
      .then((response)=>{
        this.setState({brandList:response})
      })
      .catch(err=>console.log(err))
    }

    getGradeType(film, brand){
      post('/api/sales/quotation/grade',{ "filmtype_id": film,  "brand_id": brand })
      .then((response)=>{
        this.setState({gradeList:response})
      })
      .catch(err=>console.log(err))
    }

    getThickNess(film, brand, grade){
      post('/api/sales/quotation/thickness',{ "filmtype_id": film,  "brand_id": brand, "grade_id": grade })
      .then((response)=>{
        this.setState({thickList:response})
      })
      .catch(err=>console.log(err))
    }

    getLength(film, brand, grade, thick){
      post('/api/sales/quotation/length',{ "filmtype_id": film,  "brand_id": brand, "grade_id": grade, "thickness": thick })
      .then((response)=>{
        this.setState({length:response})
      })
      .catch(err=>console.log(err))
    }

    getBasedPrice(id){
      if(!this.state.basedPrice){
        setTimeout(()=>{
          post('/api/sales/quotation/based_price',{
            "filmtype_id": this.refs['filmType'+id].value,
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
        }, 3000);
      }
    }

    componentDidMount(){
      this.getCustomerList()
      this.getSaleList()
      this.getPriceList()
      this.getFilmType()
    }


    getFilmTypeOption(){
        let result =  this.state.filmList.map((i=>{return (<option key = {'film'+i.id} value = {i.id}>{i.label}</option>)}))
        return result
    }

    getBrandTypeOption(id){
      let result =  this.state.brandList.map((i=>{return (<option key = {'brand'+i.brand_id} value = {i.brand_id}>{i.brand_name}</option>)}))
      if(result.length==1 && !this.refs[('gradeType'+ id)].value){
        this.getGradeType(this.refs[('filmType'+ id)].value, this.state.brandList[0].brand_id)
      }
      return result
    }

    getGradeTypeOption(id){
      let result =  this.state.gradeList.map((i=>{return (<option key = {'grade'+i.grade_id} value = {i.grade_id}>{i.grade_name}</option>)}))
      if(result.length==1 && !this.refs[('thickNess'+ id)].value){
        this.getThickNess(this.refs[('filmType'+id)].value, this.refs[('brandType'+id)].value, this.refs[('gradeType'+id)].value)
      }
      return result
    }

    getThickNessOption(id){
      let result =  this.state.thickList.map((i=>{return (<option key = {'thick'+i.thickness} value = {i.thickness}>{i.thickness}</option>)}))
      if(result.length==1 && !this.refs[('length'+ id)].value){
        this.getLength(
          this.refs[('filmType'+id)].value,
          this.refs[('brandType'+id)].value,
          this.refs[('gradeType'+id)].value,
          this.refs[('thickNess'+id)].value
        )
      }
      return result
    }

    getLengthOption(){
      let result =  this.state.length.map((i=>{return (<option key = {'length'+i.length} value = {i.length}>{i.length}</option>)}))
      return result
    }



    getChildItem(){
      let items = this.state.childItem
      let result = items.map(i=>{
        return (<tr key={i.id}>
            <td><input type='checkbox'/>{i.id}</td>
            <td>
              <select ref = {'filmType'+i.id} key={i.id} onChange = {() => this.getBrandType(this.refs[('filmType'+i.id)].value)} >
                  {this.getFilmTypeOption()}
              </select>
            </td>
            <td>
              <select ref = {'brandType'+i.id} key={i.id}  onChange = {() => this.getGradeType((this.refs[('filmType'+i.id)].value), this.refs[('brandType'+i.id)].value)}>
                {this.getBrandTypeOption(i.id)}
              </select>
            </td>
            <td>
              <select ref = {'gradeType'+i.id} key={i.id} onChange = {() => this.getThickNess(this.refs[('filmType'+i.id)].value, this.refs[('brandType'+i.id)].value, this.refs[('gradeType'+i.id)].value)}>
                {this.getGradeTypeOption(i.id)}
              </select>
            </td>
            <td>
              <select ref = {'thickNess'+i.id} key={i.id} onChange = {() =>
                  {this.getLength(
                    this.refs[('filmType'+i.id)].value,
                    this.refs[('brandType'+i.id)].value,
                    this.refs[('gradeType'+i.id)].value,
                    this.refs[('thickNess'+i.id)].value
                  )
                }
                }>
                {this.getThickNessOption(i.id)}
              </select>
            </td>
            <td>
              <select ref = {'length'+i.id} key={i.id}>
                {this.getLengthOption()}
              </select>
            </td>
            <td><input type='number' ref = {'weight'+i.id}/></td>
            <td><input type='text' ref = {'remark'+i.id}/></td>
            <td>{this.getBasedPrice(i.id)}</td>
            <td><input type='number' ref = {'unitPrice'+i.id}/></td>
            <td>Subtotal(THB)</td>
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
      let result = this.state.customerList.map(i=>{re
        return (<option key = {i.id} value = {i.id}>{i.name}</option>)
      })
      return result
    }

    updateSelectedCustomer(newVal) {
      console.log(newVal)
      this.getCustomerAsync(newVal.value).then((customer) => {
        console.log(customer[0])
        console.log(this.refs)
        // this.refs['contact'].value = 'bob'
        // this.refs['tel'].value = 'bob'
        // this.refs['fax'].value = 'bob'
        // this.refs['email'].value = 'bob'
        this.setState({contact: customer[0].contact_person})
        this.setState({tel: customer[0].telephone})
        this.setState({fax: customer[0].fax})
        this.setState({email: customer[0].email})
        this.setState({selectedCustomer:newVal})
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

    getGeneralContent(){
      return (  <div className="flex flex-row">
          <div className='flex flex-1 flex-col'>
              <div className='input-box flex'>
                  <label>Company :</label>
                  <select>{this.state.companyList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
              </div>
              <div className='input-box flex'>
                  <label>Customer :</label>
                  {/* <select style={{'width': '173px'}} ref = 'filmType'>{this.getCustomerOption()}</select> */}
                <Select
                    name="customer"
                    value={this.state.selectedCustomer}
                    options={this.state.customerList}
                    onChange={this.updateSelectedCustomer}
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
                <input className='flex' type="text" ref='payment'/>
            </div>
            <div className='input-box flex'>
                <label>Deliver Term :</label>
                <input className='flex' type="text" ref='deliver'/>
            </div>
        </div>
        <div className="flex flex-1 flex-col">
            <div className='input-box flex'>
                <label>Status :</label>
                <select>{this.state.statusList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
            </div>
            <div className='input-box flex'>
                <label>Saleperson :</label>
                <select>{this.state.saleList.map(i=> <option key={i.value}>{i.label}</option>)}</select>
            </div>
            <div className='input-box flex'>
                <label>Price list :</label>
                <select ref = 'priceListId'>{this.state.priceList.map(i=> <option key={i.value}>{i.label}</option>)}</select>
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
                <input className='flex' type="text" ref='contact' value={this.state.contact}/>
            </div>
            <div className='input-box flex'>
                <label>Tel :</label>
                <input className='flex' type="text" ref='tel'  value={this.state.tel}/>
            </div>
            <div className='input-box flex'>
                <label>Fax :</label>
                <input className='flex' type="text" ref='fax' value={this.state.fax}/>
            </div>

          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Email :</label>
                  <input className='flex' type="text" ref='email' value={this.state.email}/>
              </div>
          </div>
          <div className="flex flex-1 flex-col">

          </div>
      </div>)
    }

    render() {
        return(
          <div className='page-style'>
              <div className='page-head'>
                  <h2>{this._genHeader(this.props.type)}</h2>
                  <div className='action-group-btn'>
                      <button><p>Email</p></button>
                      <button><p>Print</p></button>
                      <button onClick={()=>this.props.getContent('Customer')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.createCustomer()} ><img src={saveIcon}/><p>Save</p></button>
                  </div>
              </div>
              <div>
                  <div className='flex flex-row'>
                      <div className='tab-quo' onClick={()=>this.setContent('Gen')}>
                          General
                      </div>
                      <div className='tab-quo' onClick={()=>this.setContent('Con')}>
                          Customers Contact
                      </div>
                  </div>
                  <hr/>
                  {this.state.selectedTab=='Gen'? this.getGeneralContent():this.getContactContent()}

              </div>
              <hr/>
              <div className="flex flex-row" onClick = {()=>this.addChild()}><div className='tab-quo'>Content</div><div>+</div></div>
              <div>
                  <table>
                      <thead>
                          <tr>
                              <td><input type='checkbox'/>Line No.</td>
                              <td>Film Type</td>
                              <td>Brand</td>
                              <td>Grade</td>
                              <td>Thickness</td>
                              <td>Length</td>
                              <td>Weight(Kg)</td>
                              <td>Remarks</td>
                              <td>Based Price</td>
                              <td>Unit Price(THB/Kg)</td>
                              <td>Subtotal(THB)</td>
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


export default Quotation;
