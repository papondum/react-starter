import {post } from '../../utils'
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
export function deleteFilmToIdle(){
  return {type:DELETE_FILM_IDLE}
}

export function deleteTrig(item){           //Trigger state   do noti
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
      dispatch(deleteAccToIdle())
    })
    .catch(err=>console.log(err))
  }
}

export function deleteItem(item,type){      //Action state   do delete
  //need switch case for select api by type
  console.log('triggerd',item ,type);
  switch (type) {
    case 'User account':
    let url = '/user/delete'
      return apiSelector(url,item)
      break;
    case 'User role':
      return dispatch=> {
        let url = '/api/role/delete'
        post(url,item)
        .then((response)=> {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          //Notify fn value deleted
          console.log(response);
          dispatch(deleteAccToIdle())
        })
        .catch(err=>console.log(err))
      }
      break;
    case 'Customer':
      return dispatch => {

      }
      break;
    case 'Supplier':
      return dispatch => {

      }
      break;
    case 'Price list':
      return dispatch => {

      }
      break;
    case 'Product':
      return dispatch => {
      }
      break;
    case 'Brand':
      return dispatch => {
      }
      break;
    case 'Film Type':
      return dispatch => {
      }
      break;
    case 'Grade':
      return dispatch => {
      }
    default:
      console.log(item);
      break;
    }


}
