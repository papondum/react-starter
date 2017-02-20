import {createReducer} from '../utils';
import { DELETE_USERACC_TRIGGER ,DELETE_USERACC_IDLE} from '../actions/deleteCall';

const initialState = {
    userAcc:'idle'
};

const actions = {
    [DELETE_USERACC_TRIGGER]: (state, payload) => {
        return Object.assign({}, state, {userAcc:'active'});
    },
    [DELETE_USERACC_IDLE]: (state, payload) => {
        return Object.assign({}, state, {userAcc:'idle'});
    },
};
export default createReducer(initialState, actions);
