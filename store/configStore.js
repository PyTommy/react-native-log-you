import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers/index';

const middlewares = [ReduxThunk];
export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(rootReducer);