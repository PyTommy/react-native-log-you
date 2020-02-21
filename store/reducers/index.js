import { combineReducers } from 'redux';

import logReducer from './logReducer';
import summaryReducer from './summaryReducer';

const rootReducer = combineReducers({
    logs: logReducer,
    summaries: summaryReducer,
});

export default rootReducer;