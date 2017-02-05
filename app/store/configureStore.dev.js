import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(thunk)
    const store = createStore(
        rootReducer,
        initialState,
        compose(
          createStoreWithMiddleware,
          DevTools.instrument())
    );

    return store;
}
