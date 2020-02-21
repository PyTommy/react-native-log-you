import * as SQLite from 'expo-sqlite';

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