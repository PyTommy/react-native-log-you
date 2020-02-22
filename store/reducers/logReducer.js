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
        default:
            return state;
    }
};

export default logReducer;