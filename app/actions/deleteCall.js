import {post } from '../../utils'
import { addNotification } from './notification'
export const DELETE_USERACC_TRIGGER = 'DELETE_USERACC_TRIGGER'
export const DELETE_USERROLE_TRIGGER = 'DELETE_USERROLE_TRIGGER'
export const DELETE_CUSTOMER_TRIGGER = 'DELETE_CUSTOMER_TRIGGER'
export const DELETE_SUPPLIER_TRIGGER = 'DELETE_SUPPLIER_TRIGGER'
export const DELETE_PRICE_TRIGGER = 'DELETE_PRICE_TRIGGER'
export const DELETE_PRODUCT_TRIGGER = 'DELETE_PRODUCT_TRIGGER'
export const DELETE_BRAND_TRIGGER = 'DELETE_BRAND_TRIGGER'
export const DELETE_FILM_TRIGGER = 'DELETE_FILM_TRIGGER'
export const DELETE_GRADE_TRIGGER = 'DELETE_GRADE_TRIGGER'
export const DELETE_USERACC_IDLE = 'DELETE_USERACC_IDLE'
export const DELETE_USERROLE_IDLE = 'DELETE_USERROLE_IDLE'
export const DELETE_CUSTOMER_IDLE = 'DELETE_CUSTOMER_IDLE'
export const DELETE_SUPPLIER_IDLE = 'DELETE_SUPPLIER_IDLE'
export const DELETE_PRICE_IDLE = 'DELETE_PRICE_IDLE'
export const DELETE_PRODUCT_IDLE = 'DELETE_PRODUCT_IDLE'
export const DELETE_BRAND_IDLE = 'DELETE_BRAND_IDLE'
export const DELETE_FILM_IDLE = 'DELETE_FILM_IDLE'
export const DELETE_GRADE_IDLE = 'DELETE_GRADE_IDLE'
export const DELETE_QUOTATION_TRIGGER = 'DELETE_QUOTATION_TRIGGER'
export const DELETE_SALES_TRIGGER = 'DELETE_SALES_TRIGGER'
export const DELETE_QUOTATION_IDLE = 'DELETE_QUOTATION_IDLE'
export const DELETE_SALES_IDLE = 'DELETE_SALES_IDLE'
export const DELETE_PURCHASE_IDLE = "DELETE_PURCHASE_IDLE"
export const DELETE_PURCHASE_TRIGGER = "DELETE_PURCHASE_TRIGGER"
export const DELETE_GOODRREC_IDLE = "DELETE_GOODRREC_IDLE"
export const DELETE_GOODRREC_TRIGGER = "DELETE_GOODRREC_TRIGGER"
export function deleteAcc(){
  return {type:DELETE_USERACC_TRIGGER}
}
export function deleteRole(){
  return {type:DELETE_USERROLE_TRIGGER}
}
export function deleteCustomer(){
  return {type:DELETE_CUSTOMER_TRIGGER}
}
export function deleteSupplier(){
  return {type:DELETE_SUPPLIER_TRIGGER}
}
export function deletePrice(){
  return {type:DELETE_PRICE_TRIGGER}
}
export function deleteProduct(){
  return {type:DELETE_PRODUCT_TRIGGER}
}
export function deleteBrand(){
  return {type:DELETE_BRAND_TRIGGER}
}
export function deleteFilm(){
  return {type:DELETE_FILM_TRIGGER}
}
export function deleteGrade(){
  return {type:DELETE_GRADE_TRIGGER}
}
export function deleteGoodReceipt(){
  return {type:DELETE_GOODRREC_TRIGGER}
}

export function deleteAccToIdle(){
  return {type:DELETE_USERACC_IDLE}
}
export function deleteRoleToIdle(){
  return {type:DELETE_USERROLE_IDLE}
}
export function deleteCustomerToIdle(){
  return {type:DELETE_CUSTOMER_IDLE}
}
export function deleteSupplierToIdle(){
  return {type:DELETE_SUPPLIER_IDLE}
}
export function deletePriceToIdle(){
  return {type:DELETE_PRICE_IDLE}
}
export function deleteProductToIdle(){
  return {type:DELETE_PRODUCT_IDLE}
}
export function deleteBrandToIdle(){
  return {type:DELETE_BRAND_IDLE}
}
export function deleteGradeToIdle(){
  return {type:DELETE_GRADE_IDLE}
}
export function deleteFilmToIdle(){
  return {type:DELETE_FILM_IDLE}
}
export function deleteQuotation(){
  return {type: DELETE_QUOTATION_TRIGGER}
}
export function deleteQuoToIdle(){
  return {type:DELETE_QUOTATION_IDLE}
}
export function deleteSales(){
  return {type: DELETE_SALES_TRIGGER}
}
export function deleteSalesToIdle(){
  return {type:DELETE_SALES_IDLE}
}
export function deletePurchase() {
  return { type : DELETE_PURCHASE_TRIGGER}
}
export function deletePurchaseToIdle() {
  return { type : DELETE_PURCHASE_IDLE}
}
export function deleteGoodReceiptToIdle() {
  return { type : DELETE_GOODRREC_IDLE}
}
export function deleteTrig(item){           //Trigger state   do noti
  console.log('Deletetriggered:',item)
  switch (item) {
    case 'User account':
      return dispatch =>{
        dispatch(deleteAcc())
      }
      break;
    case 'User role':
      return dispatch => {
        dispatch(deleteRole())
      }
      break;
    case 'Customer':
      return dispatch => {
        dispatch(deleteCustomer())
      }
      break;
    case 'Supplier':
      return dispatch => {
        dispatch(deleteSupplier())
      }
      break;
    case 'Price list':
      return dispatch => {
        dispatch(deletePrice())
      }
      break;
    case 'Product':
      return dispatch => {
        dispatch(deleteProduct())
      }
      break;
    case 'Brand':
      return dispatch => {
        dispatch(deleteBrand())
      }
      break;
    case 'Film Type':
      return dispatch => {
        dispatch(deleteFilm())
      }
      break;
    case 'Grade':
      return dispatch => {
        dispatch(deleteGrade())
      }
    case 'Quotation':
      return dispatch => {
        dispatch(deleteQuotation())
      }
    case 'Sales Order':
      return dispatch => {
        dispatch(deleteSales())
      }
    case 'Purchase Order':
      return dispatch => {
        dispatch(deletePurchase())
      }
    case 'Good Receipt':
      return dispatch => {
        dispatch(deleteGoodReceipt())
      }
    default:
      console.log(item);
      break;
    }
}
export function apiSelector(url,item){
  return dispatch=> {
    post(url,item)
    .then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      //Notify fn value deleted
      console.log(response);
      dispatch(addNotification(' Item has been deleted.', 'info', {title: 'Delete', autoDismiss: 2}))
    })
    .catch(err=>{
      dispatch(addNotification('Cannot connect to the server', 'error', {title: 'Error', autoDismiss: 2}))
      console.log(err)})
  }
}

export function deleteItem(item,type){
  console.log(item)
  switch (type) {
    case 'User account':
    let url = '/user/delete'
      return dispatch=>{
        dispatch(apiSelector(url,item))
        dispatch(deleteAccToIdle())
      }
      break;

    case 'User role':
      return dispatch=> {
        let url1 = '/api/role/delete'
        post(url1,item)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value deleted
          console.log(response);
          dispatch(deleteRoleToIdle())
        })
        .catch(err=>console.log(err))
      }
      break;

    case 'Customer':
      let url2 = '/api/customer/delete'
      return dispatch=>{
        dispatch(apiSelector(url2,item))
        dispatch(deleteCustomerToIdle())
      }
      break;

    case 'Supplier':
      let url3 = '/api/supplier/delete'
      return dispatch=>{
        dispatch(apiSelector(url3,item))
        dispatch(deleteSupplierToIdle())
      }
      break;

    case 'Price list':
      let url4 = '/api/price_list/delete'
      return dispatch=>{
        dispatch(apiSelector(url4,item))
        dispatch(deletePriceToIdle())
      }
      break;

    case 'Product':
      let url5 = '/api/product/delete'
      return dispatch=>{
        dispatch(apiSelector(url5,item))
        dispatch(deleteProductToIdle())
      }
      break;

    case 'Brand':
      let url6 = '/api/brand/delete'
      return dispatch=>{
        dispatch(apiSelector(url6,item))
        dispatch(deleteBrandToIdle())
      }
      break;

    case 'Film Type':
      let url7 = '/api/film/delete'
      return dispatch=>{
        dispatch(apiSelector(url7,item))
        dispatch(deleteFilmToIdle())
      }
      break;

    case 'Grade':
      let url8 = '/api/grade/delete'
      return dispatch=>{
        dispatch(apiSelector(url8,item))
        dispatch(deleteGradeToIdle())
      }
    case 'Quotation':
      let url9 = '/api/sales/quotation/delete'
      return dispatch=>{
        dispatch(apiSelector(url9,item))
        dispatch(deleteQuoToIdle())
      }
    case 'Sales Order':
      let url10 = '/api/sales/order/delete'
      return dispatch=>{
        dispatch(apiSelector(url10,item))
        dispatch(deleteSalesToIdle())
      }
    case 'Purchase Order':
      let url11 = '/api/purchase/delete'
      return dispatch=>{
        dispatch(apiSelector(url11,item))
        dispatch(deletePurchaseToIdle())
      }
    case 'Good Receipt':
      let url13 = '/api/inventory/gr/delete'
      return dispatch=>{
        dispatch(apiSelector(url13,item))
        dispatch(deleteGoodReceiptToIdle())
      }
    default:
      break;
    }


}
