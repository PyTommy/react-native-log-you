import { actionTypes } from '../actions';

const initialState = {
    autoStop: 90,
    minTime: 0
};

const settingsReducer = (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case actionTypes.SET_SETTINGS:
            return {
                ...payload,
            }
        case actionTypes.CLEAR_STORE:
            return initialState;
        default:
            return state;
    }
};

export default settingsReducer;