import Log from '../../models/log';

export const actionTypes = {
    CREATE_LOG: 'CREATE_LOG',
    FETCH_LOG: 'FETCH_LOG',
    DELETE_LOG: 'DELETE_LOG',
    DELETE_ALL_LOG: 'DELETE_ALL_LOG',
};

export const createLog = (title, startAt, stopAt) => {
    const newLog = new Log('1', title, startAt, stopAt);

    return dispatch => {
        dispatch({
            type: actionTypes.CREATE_LOG,
            payload: newLog,
        })
    }
};