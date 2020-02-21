import * as SQLite from 'expo-sqlite';

import { isoDatesBetween } from '../utils/dateGenerator';

const db = SQLite.openDatabase('logs.db');

export const init = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY NOT NULL, 
                    title TEXT NOT NULL, 
                    date TEXT NOT NULL,
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

export const insertLog = (title, date, startAt, stopAt, elapsedTime) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO logs(
                    title,
                    date,
                    startAt, 
                    stopAt,
                    elapsedTime
                ) VALUES (?, ?, ?, ?, ?);
                `,
                [title, date, startAt, stopAt, elapsedTime],
                (_, result) => {
                    resolve(result);
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
 * @param {string} dateFrom - ISO formatted date  
 * @param {string} dateTo - ISO formatted date
 * @returns {object}
 * Formatted as 
 * {
 *  [dateISOString]: {
 *      [title]: elapsedTime
 *  }
 * }
 */
export const fetchSummaries = (dateFrom, dateTo) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                    SELECT date, title, SUM(elapsedTime) AS elapsedTime FROM logs
                    WHERE date >= ? AND date <= ?
                    GROUP BY date, title
                `,
                [dateFrom, dateTo],
                (_, result) => {
                    const isoDates = isoDatesBetween(dateFrom, dateTo);

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
                        const date = itemSum.date;
                        const title = itemSum.title;
                        const elapsedTime = itemSum.elapsedTime;
                        summaries[date] = {
                            ...summaries[date],
                            [title]: summaries[date][title] + elapsedTime
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
