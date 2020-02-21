import * as SQLite from 'expo-sqlite';

import { isoDatesBetween } from '../utils/dateGenerator';

const db = SQLite.openDatabase('logs.db');

/**
 * Create table if not exists
 */
export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY NOT NULL, 
                    title TEXT NOT NULL, 
                    isoDate TEXT NOT NULL,
                    startAt TEXT NOT NULL,
                    stopAt TEXT NOT NULL,
                    elapsedTime INT NOT NULL 
                )`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
};

/**
 * Insert a log and return the id
 * @param {string} title 
 * @param {string} isoDate - ISO formatted date
 * @param {string} startAt - ISO formatted date
 * @param {string} stopAt - ISO formatted date
 * @param {number} elapsedTime 
 * @returns {number} - ID of the log 
 */
export const insertLog = (title, isoDate, startAt, stopAt, elapsedTime) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO logs(
                    title,
                    isoDate,
                    startAt, 
                    stopAt,
                    elapsedTime
                ) VALUES (?, ?, ?, ?, ?);
                `,
                [title, isoDate, startAt, stopAt, elapsedTime],
                (_, result) => {
                    resolve(result.insertId);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
}

/**
 * Returns promise that fetch summaries from database 
 * @param {string} isoDateFrom - ISO formatted date  
 * @param {string} isoDateTo - ISO formatted date
 * @returns {object}
 * Formatted as 
 * {
 *  [dateISOString]: {
 *      [title]: elapsedTime
 *  }
 * }
 */
export const fetchSummaries = (isoDateFrom, isoDateTo) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                    SELECT isoDate, title, SUM(elapsedTime) AS elapsedTime FROM logs
                    WHERE isoDate >= ? AND isoDate <= ?
                    GROUP BY isoDate, title
                `,
                [isoDateFrom, isoDateTo],
                (_, result) => {
                    const isoDates = isoDatesBetween(isoDateFrom, isoDateTo);

                    // set initial summaries
                    const summaries = {};
                    isoDates.forEach(isoDate => {
                        summaries[isoDate] = {
                            Study: 0,
                            Meditation: 0,
                            Eating: 0,
                            Sports: 0,
                        };
                    });

                    const itemSums = result.rows._array; // itemSums = [{title, elapsedTime, date}]
                    itemSums.forEach((itemSum) => {
                        const isoDate = itemSum.isoDate;
                        const title = itemSum.title;
                        const elapsedTime = itemSum.elapsedTime;
                        summaries[isoDate] = {
                            ...summaries[isoDate],
                            [title]: summaries[isoDate][title] + elapsedTime
                        };
                    });

                    resolve(summaries);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
}

/**
 * Fetch logs created specified period from SQL database
 * @param {string} isoDateFrom
 * @param {string} isoDateTo 
 */
export const fetchLogs = (isoDateFrom, isoDateTo) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                    SELECT * FROM logs
                    WHERE isoDate >= ? AND isoDate <= ?
                    ORDER BY startAt
                `,
                [isoDateFrom, isoDateTo],
                (_, result) => {

                    const isoDates = isoDatesBetween(isoDateFrom, isoDateTo);

                    // set initial logs 
                    const logs = {};
                    isoDates.forEach(isoDate => {
                        logs[isoDate] = [];
                    });

                    const fetchedLogs = result.rows._array; // itemSums = [{logs}]
                    fetchedLogs.forEach((fetchedLog) => {
                        fetchedLog.startAt = new Date(fetchedLog.startAt);
                        fetchedLog.stopAt = new Date(fetchedLog.stopAt);
                        logs[fetchedLog.isoDate].push(fetchedLog);
                    });

                    resolve(logs);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
};

export const deleteAllLogs = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE logs`,
                [],
                (_, result) => {
                    console.log(result);
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
};