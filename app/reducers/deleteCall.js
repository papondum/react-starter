import {createReducer} from '../utils';
import { DELETE_USERACC_TRIGGER, DELETE_USERACC_IDLE ,
  DELETE_CUSTOMER_TRIGGER, DELETE_CUSTOMER_IDLE,
  DELETE_SUPPLIER_TRIGGER ,DELETE_SUPPLIER_IDLE,
  DELETE_PRICE_TRIGGER ,DELETE_PRICE_IDLE,
  DELETE_PRODUCT_TRIGGER ,DELETE_PRODUCT_IDLE,
  DELETE_BRAND_TRIGGER ,DELETE_BRAND_IDLE,
  DELETE_FILM_TRIGGER ,DELETE_FILM_IDLE,
  DELETE_GRADE_TRIGGER ,DELETE_GRADE_IDLE,
  DELETE_USERROLE_TRIGGER ,DELETE_USERROLE_IDLE
} from '../actions/deleteCall';

const initialState = {
  userAcc:'idle',
  userRole:'idle',
  customer:'idle',
  supplier:'idle',
  price:'idle',
  product:'idle',
  brand:'idle',
  film:'idle',
  grade:'idle',
};

const actions = {
    [DELETE_USERACC_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {userAcc: 'active'});
    },
    [DELETE_USERACC_IDLE]: (state, payload) => {
      console.log('setto idle');
        return Object.assign({}, state, {userAcc: 'idle'});
    },
    [DELETE_USERROLE_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {userRole: 'active'});
    },
    [DELETE_USERROLE_IDLE]: (state, payload) => {
        return Object.assign({}, state, {userRole: 'idle'});
    },
    [DELETE_CUSTOMER_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {customer: 'active'});
    },
    [DELETE_CUSTOMER_IDLE]: (state, payload) => {
        return Object.assign({}, state, {customer: 'idle'});
    },
    [DELETE_SUPPLIER_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {supplier: 'active'});
    },
    [DELETE_SUPPLIER_IDLE]: (state, payload) => {
        return Object.assign({}, state, {supplier: 'idle'});
    },
    [DELETE_PRICE_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {price: 'active'});
    },
    [DELETE_PRICE_IDLE]: (state, payload) => {
        return Object.assign({}, state, {price: 'idle'});
    },
    [DELETE_PRODUCT_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {product: 'active'});
    },
    [DELETE_PRODUCT_IDLE]: (state, payload) => {
        return Object.assign({}, state, {product: 'idle'});
    },
    [DELETE_BRAND_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {brand: 'active'});
    },
    [DELETE_BRAND_IDLE]: (state, payload) => {
        return Object.assign({}, state, {brand: 'idle'});
    },
    [DELETE_FILM_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {film: 'active'});
    },
    [DELETE_FILM_IDLE]: (state, payload) => {
        return Object.assign({}, state, {film: 'idle'});
    },
    [DELETE_GRADE_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {grade: 'active'});
    },
    [DELETE_GRADE_IDLE]: (state, payload) => {
        return Object.assign({}, state, {grade: 'idle'});
    }
};
export default createReducer(initialState, actions);
