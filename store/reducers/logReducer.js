import { actionTypes } from '../actions';

const logReducer = (state = {}, actions) => {
    const { type, payload } = actions;

    switch (type) {
        default:
            return state;
    }
};

export default logReducer;