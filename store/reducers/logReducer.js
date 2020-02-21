import { actionTypes } from '../actions';

const logReducer = (state = {}, actions) => {
    const { type, payload } = actions;
    switch (type) {
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