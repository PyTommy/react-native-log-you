import { actionTypes } from '../actions';

const initialState = {};

const summaryReducer = (state = initialState, actions) => {
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
                        [payload.category]: payload.elapsedTime
                    }
                }
            }
            return {
                ...state,
                [payload.isoDate]: {
                    ...state[payload.isoDate],
                    [payload.category]: state[payload.isoDate][payload.category] + payload.elapsedTime,
                }
            }
        case actionTypes.SET_SUMMARIES:
            return {
                ...state,
                ...payload
            }
        case actionTypes.DELETE_LOG:
            const { isoDate, category, elapsedTime } = payload;
            if (!state[isoDate]) return state;
            return {
                ...state,
                [isoDate]: {
                    ...state[isoDate],
                    [category]: state[isoDate][category] - elapsedTime
                }
            }
        case actionTypes.CLEAR_STORE:
            return initialState;
        default:
            return state;
    }
};

export default summaryReducer;