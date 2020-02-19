import { combineReducers } from 'redux';

import logReducer from './logReducer';

const rootReducer = combineReducers({
    log: logReducer,
});

export default rootReducer;