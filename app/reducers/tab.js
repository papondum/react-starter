import {createReducer} from '../utils';
import {OPEN_TAB, SET_HEAD, SET_SUB_HEAD, CLOSE_TAB} from '../actions/tab';

const initialState = {
    activeTabs: {},
    tabs: [],
    MainHeadText:'',
    subHeadText:''
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
    },
    [SET_HEAD]:(state, payload) => {
      return Object.assign({},state,{mainHeadText:payload})
    },
    [SET_SUB_HEAD]:(state, payload) => {
      return Object.assign({},state,{subHeadText:payload})
    },
    [CLOSE_TAB] :(state,payload) => {
      let result = state.tabs
      var index = result.indexOf(payload);
      let newActive = ''
      if(result.length>0){
          if(index-1>=0){
            newActive = index-1
          }
          else{
            newActive = index
          }
      }


      if (index > -1) {
          result.splice(index, 1);
      }
      return Object.assign({},state,{tabs:result, activeTabs:result[newActive]})
    }
};
export default createReducer(initialState, actions);
