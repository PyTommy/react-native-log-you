import { actionTypes } from '../actions';

const summaryReducer = (state = {}, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case actionTypes.INCREMENT_TIME_SUMMARY:
            const newLogDateISO = payload.date.toISOString();
            if (!state[newLogDateISO]) {
                return {
                    ...state,
                    [newLogDateISO]: {
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
                [newLogDateISO]: {
                    ...state[newLogDateISO],
                    [payload.title]: state[newLogDateISO][payload.title] + payload.elapsedTime,
                }
            }
        default:
            return state;
    }
};

export default summaryReducer;