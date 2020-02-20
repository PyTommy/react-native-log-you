import Log from '../../models/log';
import * as db from '../../db/db';

export const actionTypes = {
    CREATE_LOG: 'CREATE_LOG',
    FETCH_LOG: 'FETCH_LOG',
    DELETE_LOG: 'DELETE_LOG',
    DELETE_ALL_LOG: 'DELETE_ALL_LOG',
};

export const createLog = (title, startAt, stopAt) => {
    return async dispatch => {
        const newLog = new Log('tmpId', title, startAt, stopAt);
        try {
            const dbResult = await db.insertLog(
                newLog.title,
                newLog.date.toISOString(),
                newLog.startAt.toISOString(),
                newLog.stopAt.toISOString(),
                newLog.elapsedTime
            );

            newLog.id = dbResult.insertId;

            dispatch({
                type: actionTypes.CREATE_LOG,
                payload: newLog,
            })
        } catch (err) {
            console.log(err);
        }

    }
};