import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import tab from './tab';
import login from './login';
import deleteCall from './deleteCall';
import notification from './notification';
const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter, tab,login,deleteCall,notification,
    routing
});

export default rootReducer;
