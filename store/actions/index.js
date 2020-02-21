import Log from '../../models/log';
import * as db from '../../db/db';

export const actionTypes = {
    INCREMENT_TIME_SUMMARY: 'INCREMENT_TIME_SUMMARY',
    SET_SUMMARIES: 'SET_SUMMARIES',
    FETCH_LOGS: 'FETCH_LOGS',
    DELETE_LOG: 'DELETE_LOG',
    DELETE_ALL_LOG: 'DELETE_ALL_LOG',
};

export const createLog = (title, startAt, stopAt) => {
    return async dispatch => {
        const newLog = new Log('tmpId', title, startAt, stopAt);
        try {
            const dbResult = await db.insertLog(
                newLog.title,
                newLog.isoDate,
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

export const fetchSummaries = (isoDateFrom, isoDateTo) => {
    if (!isoDateTo) isoDateTo = isoDateFrom;
    return async dispatch => {
        try {
            const objectSummaries = await db.fetchSummaries(isoDateFrom, isoDateTo);
            dispatch({
                type: actionTypes.SET_SUMMARIES,
                payload: objectSummaries
            })
        } catch (err) {
            console.log(err);
        }
    };
}

export const fetchLogs = (isoDateFrom, isoDateTo) => {
    if (!isoDateTo) isoDateTo = isoDateFrom;
    return async dispatch => {
        try {
            const objectLogs = await db.fetchLogs(isoDateFrom, isoDateTo);
            console.log(objectLogs);
            dispatch({
                type: actionTypes.FETCH_LOGS,
                payload: objectLogs
            })

        } catch (err) {
            console.log(err);
        }
    };
}

export const deleteAllLogs = () => {
    return async dispatch => {
        try {
            await db.deleteAllLogs();
        } catch (err) {
            console.log(err);
        }
    }
};