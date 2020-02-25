import Log from '../../models/log';
import * as db from '../../db/db';
import { AsyncStorage } from 'react-native';
import { dateGenerator } from '../../utils/dateGenerator';


export const actionTypes = {
    INCREMENT_TIME_SUMMARY: 'INCREMENT_TIME_SUMMARY',
    ADD_LOG: 'ADD_LOG',
    SET_SUMMARIES: 'SET_SUMMARIES',
    FETCH_LOGS: 'FETCH_LOGS',
    DELETE_LOG: 'DELETE_LOG',
    DELETE_ALL_LOG: 'DELETE_ALL_LOG',
    SET_SETTINGS: 'SET_SETTINGS',
    CLEAR_STORE: 'CLEAR_STORE'
};

export const createLog = (category, startAt, stopAt) => {
    return async dispatch => {
        const newLog = new Log('tmpId', category, startAt, stopAt);
        try {
            const newLogId = await db.insertLog(
                newLog.category,
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
 * Fetch specified summaries and set on redux store. 
 * @param {string} oldestStoredISODate
 * @param {number} limit - Limit of data from SQL database.
 */
export const fetchSummariesWithLimit = (oldestStoredISODate, limit = 50) => {
    // Validate params
    if (!oldestStoredISODate || typeof oldestStoredISODate !== 'string') {
        throw new Error('isoDate should be string');
    }

    return async dispatch => {
        try {
            const { summaries, hasMore } = await db.fetchSummariesWithLimit(oldestStoredISODate, limit);
            dispatch({
                type: actionTypes.SET_SUMMARIES,
                payload: summaries
            })


            return hasMore;
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
 * Setting created or updated
 * @param {number} autoStop 
 * @param {number} minTime 
 */
export const setSettings = (autoStop, minTime) => {
    return async dispatch => {
        if (typeof autoStop !== 'number') {
            throw new Error('autoStop should be number')
        };
        if (typeof minTime !== 'number') {
            throw new Error('minTime should be number')
        };

        const newSettings = {
            autoStop: autoStop,
            minTime: minTime
        }

        try {
            await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
            dispatch({
                type: actionTypes.SET_SETTINGS,
                payload: newSettings
            })
        } catch (error) {
            console.error(error);
        }
    }
};

/**
 * Get settings and set on store. Conditionally, create and store settings.
 */
export const init = () => {
    return async dispatch => {
        const isoToday = dateGenerator(new Date()).toISOString();
        try {
            const jsonStoredSettings = await AsyncStorage.getItem('settings');
            const storedSettings = JSON.parse(jsonStoredSettings);
            if (storedSettings !== null) {
                dispatch({
                    type: actionTypes.SET_SETTINGS,
                    payload: storedSettings
                })
            }
            dispatch(fetchSummaries(isoToday));
            dispatch(fetchLogs(isoToday));
        } catch (error) {
            console.log('Init action failed!!');
            console.error(error);
        }
    }
};

/**
 * Delete All data from SQL database, AsyncStorage and redux store 
 */
export const deleteAllData = () => {
    return async dispatch => {
        try {

            await db.deleteAllLogs();
            await AsyncStorage.removeItem('settings');
            await dispatch({
                type: actionTypes.CLEAR_STORE
            })

            // Initialize data
            dispatch(init());
        } catch (err) {
            console.error(err);
        }
    }
};