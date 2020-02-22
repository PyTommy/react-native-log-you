import Log from '../../models/log';
import * as db from '../../db/db';

export const actionTypes = {
    INCREMENT_TIME_SUMMARY: 'INCREMENT_TIME_SUMMARY',
    ADD_LOG: 'ADD_LOG',
    SET_SUMMARIES: 'SET_SUMMARIES',
    FETCH_LOGS: 'FETCH_LOGS',
    DELETE_LOG: 'DELETE_LOG',
    DELETE_ALL_LOG: 'DELETE_ALL_LOG',
};

export const createLog = (title, startAt, stopAt) => {
    return async dispatch => {
        const newLog = new Log('tmpId', title, startAt, stopAt);
        try {
            const newLogId = await db.insertLog(
                newLog.title,
                newLog.isoDate,
                newLog.startAt.toISOString(),
                newLog.stopAt.toISOString(),
                newLog.elapsedTime
            );

            newLog.id = newLogId;

            dispatch({
                type: actionTypes.INCREMENT_TIME_SUMMARY,
                payload: newLog,
            }),
                dispatch({
                    type: actionTypes.ADD_LOG,
                    payload: newLog
                })
        } catch (err) {
            console.error(err);
        }

    }
};

/**
 * Fetch specified summaries and set on redux store. 
 * @param {string} isoDateFrom - 
 * @param {string | undefined | null} isoDateTo - isoDateFrom will be set if not provided
 */
export const fetchSummaries = (isoDateFrom, isoDateTo) => {
    // Validate params
    if (!isoDateFrom || typeof isoDateFrom !== 'string') {
        throw new Error('isoDate should be string');
    }
    if (typeof isoDateTo !== 'string' && isoDateTo) {
        throw new Error('isoDateTo should be string or undefined');
    };

    if (!isoDateTo) isoDateTo = isoDateFrom;
    return async dispatch => {
        try {
            const objectSummaries = await db.fetchSummaries(isoDateFrom, isoDateTo);
            dispatch({
                type: actionTypes.SET_SUMMARIES,
                payload: objectSummaries
            })
        } catch (err) {
            console.error(err);
        }
    };
}
/**
 * Fetch specified logs and set on redux store.
 * @param {string} isoDateFrom -
 * @param {string | undefined | null} isoDateTo - isoDateFrom will be set if not provided
 */
export const fetchLogs = (isoDateFrom, isoDateTo) => {
    // Validate params
    if (!isoDateFrom || typeof isoDateFrom !== 'string') {
        throw new Error('isoDate should be string');
    }
    if (typeof isoDateTo !== 'string' && isoDateTo) {
        throw new Error('isoDateTo should be string or undefined');
    };

    if (!isoDateTo) isoDateTo = isoDateFrom;
    return async dispatch => {
        try {
            const objectLogs = await db.fetchLogs(isoDateFrom, isoDateTo);
            dispatch({
                type: actionTypes.FETCH_LOGS,
                payload: objectLogs
            })

        } catch (err) {
            console.error(err);
        }
    };
}

/**
 * Delete a log. 
 * @param {number} id - log id
 * @param {string} isoDate - isoDate of the log
 * @param {number} elapsedTime - Elapsed time of the log
 */
export const deleteLog = (selectedLog) => {
    return async dispatch => {
        try {
            await db.deleteLog(selectedLog.id);
            dispatch({
                type: actionTypes.DELETE_LOG,
                payload: { ...selectedLog }
            })
        } catch (err) {
            console.error(err);
        }

    }
}

/**
 * Delete All log data from SQL database and redux store 
 */
export const deleteAllLogs = () => {
    return async dispatch => {
        try {
            await db.deleteAllLogs();
            // init redux store
        } catch (err) {
            console.error(err);
        }
    }
};