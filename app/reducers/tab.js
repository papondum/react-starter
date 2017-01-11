import {createReducer} from '../utils';
import {OPEN_TAB} from '../actions/tab';

const initialState = {
    activeTabs: {},
    tabs: []
};

const actions = {
    [OPEN_TAB]: (state, payload) => {
        console.log(typeof state, state);
        console.log(typeof payload, payload);
        return Object.assign({}, state, {tabs: state.tabs.concat(payload)});
    }
};
export default createReducer(initialState, actions);
