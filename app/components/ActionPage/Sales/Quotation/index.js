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
        result = result.concat([{id:id, content:response}])
      }
      var obj  = {}
      obj[listType] = result
      this.setState(obj)

    }
    getBrandType(item, id){
      post('/api/sales/quotation/brand',{filmtype_id: item.filmType})
      .then((response)=>{
        // push if no have id does not exist
        // replace if have
        // let result = this.state.brandList
        // let itemSet = this.state.brandList.find(i=> i.id==id)
        // if(itemSet){
        //   var index = indexOf(this.state.brandList, itemSet);
        //   result.splice(index, 1, {id:id, content:response});
        // }
        // else{
        //   result = result.concat([{id:id, content:response}])
        // }
        // this.setState({brandList:result})
        this.updateStateItemSet('brandList', response, id)
      })
      .catch(err=>console.log(err))
    }

    getGradeType(item, id){
      post('/api/sales/quotation/grade',{ "filmtype_id": item.filmType,  "brand_id": item.brandType })
      .then((response)=>{
          this.updateStateItemSet('gradeList', response, id)
        // this.setState({gradeList:response})
      })
      .catch(err=>console.log(err))
    }

    getThickNess(item, id){
      console.log(item);
      post('/api/sales/quotation/thickness',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType })
      .then((response)=>{

          this.updateStateItemSet('thickList', response, id)
        // this.setState({thickList:response})
      })
      .catch(err=>console.log(err))
    }

    getLength(item){
      post('/api/sales/quotation/length',{ "filmtype_id": item.filmType,  "brand_id": item.brandType, "grade_id": item.gradeType, "thickness": item.thickNess })
      .then((response)=>{

        this.updateStateItemSet('length', response, id)
        this.setState({length:response})
      })
      .catch(err=>console.log(err))
    }

    getBasedPrice(id){
      if(this.state.basedPrice){
        console.log(this.state.basedPrice);
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
      this.getSaleList()
      this.getPriceList()
      this.getFilmType()
    }

    save(){
      //send Quatations
      let obj = Object.assign({},
      {
        company: this.refs['company'].value,
        customer: this.state.selectedCustomer,
        date: this.refs['date'].value,
        payterm: this.refs['payterm'].value,
        deliver: this.refs['deliver'].value,
        status: this.refs['status'].value,
        sale_person: this.refs['salePerson'].value,
        price_listId: this.refs['priceListId'].value,
        customer_contact: this.state.contact,
        customer_tel: this.state.tel,
        customer_fax: this.state.fax,
        customer_email: this.state.email,
        content:// list of content
        this.state.childItem.map(i=>
        {return Object.assign({},{
          id:i.id,
          content:{
            film_type:  this.refs['filmType'+i.id].value,
            brand_type: this.refs['brandType'+i.id].value,
            grade_type: this.refs['gradeType'+i.id].value,
            thickness: this.refs['thickNess'+i.id].value,
            length: this.refs['length'+i.id].value,
            weight: this.refs['weight'+i.id].value,
            remark: this.refs['remark'+i.id].value,
            based_price: this.state.basedPrice,//   need select id
            unitprice: this.refs['unitPrice'+i.id].value,
            subtotal: this.refs['subTotal'+i.id].value,
          }
          })
        })
      })

      console.log(obj)
    }

    getFilmTypeOption(){
        let result =  this.state.filmList.map((i=>{return (<option key = {'film'+i.id} value = {i.id}>{i.label}</option>)}))
        return result
    }

    getBrandTypeOption(id){
      let getBrand = this.state.brandList.find(i=>i.id==('brandType'+id))
      if(getBrand){
        let result =  getBrand.content.map((i=>{return (<option key = {'brand'+i.brand_id} value = {i.brand_id}>{i.brand_name}</option>)}))
        if(result.length==1 && !this.refs[('gradeType'+ id)].value){
          this.getGradeType(this.refs[('filmType'+ id)].value, this.state.brandList[0].brand_id)
        }
        return result
      }
    }

    getGradeTypeOption(id){
      let getGrade = this.state.gradeList.find(i=>i.id==('gradeType'+id))
      if(getGrade){
        let result =  getGrade.content.map((i=>{return (<option key = {'grade'+i.grade_id} value = {i.grade_id}>{i.grade_name}</option>)}))
        if(result.length==1 && !this.refs[('thickNess'+ id)].value){
          console.log(this.refs[('filmType'+id)].value, this.refs[('brandType'+id)].value, this.refs[('gradeType'+id)].value);
          this.getThickNess(this.refs[('filmType'+id)].value, this.refs[('brandType'+id)].value, this.refs[('gradeType'+id)].value)
        }
        return result
      }
    }

    getThickNessOption(id){
      let getThick = this.state.thickList.find(i=>i.id==('thickNess'+id))
      if(getThick){
        let result =  getThick.content.map((i=>{return (<option key = {'thick'+i.thickness} value = {i.thickness}>{i.thickness}</option>)}))
        if(result.length==1 && !this.refs[('length'+ id)].value){
          this.refs[('filmType'+id)].value,
          this.refs[('brandType'+id)].value,
          this.refs[('gradeType'+id)].value,
          this.refs[('thickNess'+id)].value

        }
        return result
      }

    }

    getLengthOption(){
      let result =  this.state.length.map((i=>{return (<option key = {'length'+i.length} value = {i.length}>{i.length}</option>)}))
      return result
    }

    updateSubTotal(id) {
      let price = this.refs['unitPrice'+id].value;
      let weight = this.refs['weight'+id].value;
      this.refs['subTotal'+id].value = price * weight
    }



    getChildItem(){
      let items = this.state.childItem
      let result = items.map(i=>{
        let genArg = (arr,id)=>{
          //return as object filmType:val brandType:val
          let result = {}
          for (var i=0; i<arr.length; i++) {
            result[arr[i]] = this.refs[arr[i]+id].value;
          }
          return result
        }
        return (<tr key={i.id}>
            <td><input type='checkbox'/>{i.id}</td>
            <td>
                <select ref = {'filmType'+i.id} key={i.id} onChange = {() => this.getBrandType(genArg(['filmType'], i.id), ('brandType'+i.id))} >
                    {this.getFilmTypeOption()}
                </select>
            </td>
            <td>
                <select ref = {'brandType'+i.id} key={i.id}  onChange = {() => this.getGradeType(genArg(['filmType', 'brandType'], i.id), ('gradeType'+i.id))}>
                    {this.getBrandTypeOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'gradeType'+i.id} key={i.id} onChange = {() => this.getThickNess(genArg(['filmType','brandType', 'gradeType'], i.id), ('thickNess'+i.id))}>
                    {this.getGradeTypeOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'thickNess'+i.id} key={i.id} onChange = {() => this.getLength(genArg(['filmType','brandType','gradeType','thickNess'],i.id), ('length'+i.id))
                }>
                    {this.getThickNessOption(i.id)}
                </select>
            </td>
            <td>
                <select ref = {'length'+i.id} key={i.id}>
                    {this.getLengthOption()}
                </select>
            </td>
            <td><input onChange={() => {this.updateSubTotal(i.id)}} type='number' ref = {'weight'+i.id}/></td>
            <td><input type='text' ref = {'remark'+i.id}/></td>

            {/* <td>{this.getBasedPrice(i.id)}</td> */}
            <td>0</td>
            <td><input onChange={() => {this.updateSubTotal(i.id)}}  type='number' ref = {'unitPrice'+i.id}/></td>
            <td><input disabled type='number' ref = {'subTotal'+i.id} value="0"/></td>
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
      console.log(newArr)
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
                  <select ref = 'company'>{this.state.companyList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
              </div>
              <div className='input-box flex'>
                  <label>Customer :</label>
                  {/* <select style={{'width': '173px'}} ref = 'filmType'>{this.getCustomerOption()}</select> */}
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
          </div>
          <div className="flex flex-1 flex-col">
              <div className='input-box flex'>
                  <label>Status :</label>
                  <select ref = 'status' >{this.state.statusList.map(i=> <option key={i.value}>{i.value}</option>)}</select>
              </div>
              <div className='input-box flex'>
                  <label>Saleperson :</label>
                  <select ref = 'salePerson' >{this.state.saleList.map(i=> <option key={i.value}>{i.label}</option>)}</select>
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
                      <button><img src={emailIcon}/><p>Email</p></button>
                      <button><img src={printIcon}/><p>Print</p></button>
                      <button onClick={()=>this.props.getContent('Customer')}><img src={cancelIcon}/><p>Cancel</p></button>
                      <button onClick = {() => this.save()} ><img src={saveIcon}/><p>Save</p></button>
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
              <div className="flex flex-row space-bet" >
                  <div className='tab-quo'>Content</div>
                  <div className='action-group-btn'>
                      <button onClick = {()=>this.addChild()}><img src={createIcon}/></button>
                      <button><img src={deleteIcon}/></button>
                  </div>
              </div>
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
              <div className = 'flex'>
                <div className = 'flex-1'>
                  <p>Remarks</p>
                  <input type = 'textarea' ref = 'remarks' />
              </div>
                <div className = 'flex-1'>
                  <p>Revise Message</p>
                  <input type = 'text' ref = 'revisemessage'/>
                </div>
                <div className = 'flex-1'>
                  <div>Total before discount</div>
                  <div>Discount  <input type = 'number' ref = 'discount'/></div>
                  <div>Taxes <input type = 'number' ref = 'taxes'/></div>
                  <div>Withholding Taxes <input type = 'number' ref = 'wotaxes '/></div>
                  <div>Total</div>
                </div>
              </div>
          </div>)
        }
    }


export default Quotation;
