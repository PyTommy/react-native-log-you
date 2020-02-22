import { actionTypes } from '../actions';

const logReducer = (state = {}, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.ADD_LOG:
            if (!state[payload.isoDate]) {
                return state
            } // No need to create [isoDate]: [{newLog}] because the log array which does not contain logs that previously saved on SQL is useless.

            return {
                ...state,
                [payload.isoDate]: [...state[payload.isoDate], payload]
            }
        case actionTypes.FETCH_LOGS:
            return {
                ...state,
                ...payload,
            }
        case actionTypes.DELETE_LOG:
            const { id, isoDate } = payload;

            if (!state[isoDate]) return state;

            const updatedLogs = state[isoDate].filter(curLog => {
                return curLog.id !== id;
            });
            if (state[isoDate].length === updatedLogs.length) {
                throw new Error('Log not found!! Must be something wrong with your programming!!');
            }

            return {
                ...state,
                [isoDate]: updatedLogs
            }
        default:
            return state;
    }
};

export default logReducer;