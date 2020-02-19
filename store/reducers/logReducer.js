import { actionTypes } from '../actions/logAction';

const logReducer = (state = {}, actions) => {
    const { type, payload } = actions;

    switch (actions.type) {
        case actionTypes.CREATE_LOG:
            const newLogDateISO = payload.date.toISOString();
            if (!state[newLogDateISO]) {
                return {
                    ...state,
                    [newLogDateISO]: {
                        elapsedTimeSummary: {
                            Study: 0,
                            Meditation: 0,
                            Eating: 0,
                            Sports: 0,
                            [payload.title]: payload.elapsedTime
                        },
                        logs: [payload]
                    }
                }
            }
            return {
                ...state,
                [newLogDateISO]: {
                    elapsedTimeSummary: {
                        ...state[newLogDateISO].elapsedTimeSummary,
                        [payload.title]: state[newLogDateISO].elapsedTimeSummary[payload.title] + payload.elapsedTime
                    },
                    logs: [...state[newLogDateISO].logs, payload]
                }
            }
        default:
            return state;
    }
};

export default logReducer;