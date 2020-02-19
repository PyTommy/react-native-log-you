import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../store/reducers/index';
import { createStoreWithMiddleware } from '../store/configStore';

/**
 * Create a testing store.
 * globals: createStoreWithMiddleware, rootReducer
 * @param {object} initialState - initial state for redux store
 * @returns {store} - redux store  
 */
export const storeFactory = (initialState) => {
    return createStoreWithMiddleware(rootReducer, initialState);
};