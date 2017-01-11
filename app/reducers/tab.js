import {createReducer} from '../utils';
import {OPEN_TAB} from '../actions/tab';

const initialState = {
    activeTabs: {},
    tabs: []
};

const actions = {
    [OPEN_TAB]: (state, payload) => {
        let result = [];
        const activeTab = payload;
        if(state.tabs.length > 0) {
            const find = state.tabs.find((i)=> i === payload[0]);
            if(find === undefined) {
                result = state.tabs.concat(payload);
            } else{
                result = state.tabs;
            }
        }else {
            result = state.tabs.concat(payload);
        }
        return Object.assign({}, state, {activeTabs: activeTab[0], tabs: result});
    }
};
export default createReducer(initialState, actions);
