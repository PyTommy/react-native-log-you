import Log from '../../models/log';
import * as db from '../../db/db';

export const actionTypes = {
    INCREMENT_TIME_SUMMARY: 'INCREMENT_TIME_SUMMARY',
    SET_SUMMARIES: 'SET_SUMMARIES',
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
                type: actionTypes.INCREMENT_TIME_SUMMARY,
                payload: newLog,
            })
        } catch (err) {
            console.log(err);
        }

    }
};

export const fetchSummaries = (dateFrom, dateTo) => {
    if (!dateTo) dateTo = dateFrom;
    return async dispatch => {
        try {
            const objectSummaries = await db.fetchSummaries(dateFrom, dateTo);
            dispatch({
                type: actionTypes.SET_SUMMARIES,
                payload: objectSummaries
            })

        } catch (err) {
            console.log(err);
        }
    };
}