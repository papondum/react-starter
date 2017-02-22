import {createReducer} from '../utils';
import { DELETE_USERACC_TRIGGER ,DELETE_USERACC_IDLE} from '../actions/deleteCall';

const initialState = {
    userAcc:'idle'
};

const actions = {
    [DELETE_USERACC_TRIGGER]: (state, payload) => {             //notify that user account page call delte btn
        return Object.assign({}, state, {userAcc:'active'});
    },
    [DELETE_USERACC_IDLE]: (state, payload) => {              //notify trigger for close modal
        return Object.assign({}, state, {userAcc:'idle'});
    },
};
export default createReducer(initialState, actions);
