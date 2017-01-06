import {createReducer} from '../utils';
import {OPEN_TAB} from '../actions/tab';

const initialState = {
    activeTabs: {},
    tabs: []
};

const actions = {
    [OPEN_TAB]: (state, payload) => {
        console.log(payload);
        return Object.assign({}, state, {tabs: payload});
    }
};
export default createReducer(initialState, actions);
