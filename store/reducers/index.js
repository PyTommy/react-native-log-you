import { combineReducers } from 'redux';

import logReducer from './logReducer';
import summaryReducer from './summaryReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    logs: logReducer,
    summaries: summaryReducer,
    settings: settingsReducer,
});

export default rootReducer;