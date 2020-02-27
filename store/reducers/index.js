import { combineReducers } from 'redux';

import logReducer from './logReducer';
import summaryReducer from './summaryReducer';
import settingsReducer from './settingsReducer';
import alertsReducer from './alertsReducer';

const rootReducer = combineReducers({
    logs: logReducer,
    summaries: summaryReducer,
    settings: settingsReducer,
    alerts: alertsReducer,
});

export default rootReducer;