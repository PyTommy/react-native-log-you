import { actionTypes } from '../actions';

const summaryReducer = (state = {}, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case actionTypes.INCREMENT_TIME_SUMMARY:
            if (!state[payload.isoDate]) {
                return {
                    ...state,
                    [payload.isoDate]: {
                        Study: 0,
                        Meditation: 0,
                        Eating: 0,
                        Sports: 0,
                        [payload.title]: payload.elapsedTime
                    }
                }
            }
            return {
                ...state,
                [payload.isoDate]: {
                    ...state[payload.isoDate],
                    [payload.title]: state[payload.isoDate][payload.title] + payload.elapsedTime,
                }
            }
        case actionTypes.SET_SUMMARIES:
            return {
                ...state,
                ...payload
            }
        case actionTypes.DELETE_LOG:
            const { isoDate, title, elapsedTime } = payload;
            if (!state[isoDate]) return state;
            return {
                ...state,
                [isoDate]: {
                    ...state[isoDate],
                    [title]: state[isoDate][title] - elapsedTime
                }
            }
        default:
            return state;
    }
};

export default summaryReducer;