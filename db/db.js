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
                    category TEXT NOT NULL, 
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
 * @param {string} category 
 * @param {string} isoDate - ISO formatted date
 * @param {string} startAt - ISO formatted date
 * @param {string} stopAt - ISO formatted date
 * @param {number} elapsedTime 
 * @returns {number} - ID of the log 
 */
export const insertLog = (category, isoDate, startAt, stopAt, elapsedTime) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO logs(
                    category,
                    isoDate,
                    startAt, 
                    stopAt,
                    elapsedTime
                ) VALUES (?, ?, ?, ?, ?);
                `,
                [category, isoDate, startAt, stopAt, elapsedTime],
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
 * Returns promise that fetch summaries from database.
 * If there are no data in the specified duration, returns summaries with elapsed time equal 0 for each category.
 * @param {string} isoDateFrom - ISO formatted date  
 * @param {string} isoDateTo - ISO formatted date
 * @returns {object}
 * Formatted as 
 * {
 *  [dateISOString]: {
 *      [category]: elapsedTime
 *  }
 * }
 */
export const fetchSummaries = (isoDateFrom, isoDateTo) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                    SELECT isoDate, category, SUM(elapsedTime) AS elapsedTime FROM logs
                    WHERE isoDate >= ? AND isoDate <= ?
                    GROUP BY isoDate, category
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

                    const itemSums = result.rows._array; // itemSums = [{category, elapsedTime, date}]
                    itemSums.forEach((itemSum) => {
                        const isoDate = itemSum.isoDate;
                        const category = itemSum.category;
                        const elapsedTime = itemSum.elapsedTime;
                        summaries[isoDate] = {
                            ...summaries[isoDate],
                            [category]: summaries[isoDate][category] + elapsedTime
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
 * Returns promise that fetch summaries from database.
 * If there are no data, returns empty object.
 * @param {string} oldestStoredISODate - 
 * @param {string} limit - default: 50
 * @returns {object}
 * Formatted as
 * {
 *  summary: {
 *      [dateISOString]: {
 *          [category]: elapsedTime
 *      }
 *  },
 *  hasMore: boolean
 * }
 */
export const fetchSummariesWithLimit = (oldestStoredISODate, limit = 50) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                    SELECT isoDate, category, SUM(elapsedTime) AS elapsedTime FROM logs
                    WHERE isoDate <= ?
                    GROUP BY isoDate, category
                    ORDER BY isoDate DESC
                    LIMIT ?
                `,
                [oldestStoredISODate, limit],
                (_, result) => {
                    const resultArray = result.rows._array; // [{category, elapsedTime, isoDate}]
                    const hasMore = resultArray.length === limit;

                    if (resultArray.length === 0) {
                        return resolve({ summaries: {}, hasMore });
                    }

                    // Create array of iso date.
                    const oldestFetchedISODate = resultArray[resultArray.length - 1].isoDate;
                    const isoDates = isoDatesBetween(oldestFetchedISODate, oldestStoredISODate);

                    const summaries = {};
                    isoDates.forEach(isoDate => {
                        summaries[isoDate] = {
                            Study: 0,
                            Meditation: 0,
                            Eating: 0,
                            Sports: 0,
                        };
                    });


                    resultArray.forEach((data) => {
                        const { isoDate, category, elapsedTime } = data;
                        summaries[isoDate] = {
                            ...summaries[isoDate],
                            [category]: elapsedTime
                        };
                    });

                    resolve({ summaries, hasMore });
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
}

/**
 * Fetch logs created specified period from SQL database.
 * If there are no data in the specified duration, returns empty arrays. EXAMPLE) logs: {[isoDate]: []}.
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

export const deleteLog = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM logs WHERE id=?`,
                [id],
                (_, result) => {
                    resolve();
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
                `DELETE FROM logs`,
                [],
                (_, result) => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    })
};