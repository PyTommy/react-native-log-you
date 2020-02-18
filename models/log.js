import { timeDiffInSecond } from '../utils/timeDiff'

/**
 * Convert a date object to the beginning of the day's if it indicates after 4am, otherwise begging of the yesterday's.  ex) 2000/01/01 22:00 => 2020/01/01 00:00, 2000/01/01 03:59 => 1999/12/31 00:00.   
 * @param {date} startAt 
 */
export const dateGenerator = (startAt) => {
    let date;
    const h = startAt.getHours();

    // if the time is between 04:00 and 23:59
    if (h >= 4) {
        date = new Date(
            startAt.getFullYear(),
            startAt.getMonth(),
            startAt.getDate()
        );
        // if the time is between 00:00 and 03:59
    } else {
        const yesterday = new Date(startAt.valueOf() - 1000 * 60 * 60 * 24);
        date = new Date(
            yesterday.getFullYear(),
            yesterday.getMonth(),
            yesterday.getDate(),
        );
    }
    return date;
};

/**
 * Create Log class 
 * @param {string} id 
 * @param {string} title 
 * @param {date} startAt - Start Date  
 * @param {date} stopAt - Stop Date
 * @param {date | undefined | null} date - date. Generated automatically if not provided.
 * @param {number | undefined | null} elapsedTime - time spent in second. Generated automatically if not provided.
 */
export default class Log {
    constructor(id, title, startAt, stopAt, date, elapsedTime) {
        // Throw errors if params are invalid
        const errors = [];
        if (typeof id !== 'string') errors.push('{string} id');
        if (typeof title !== 'string') errors.push('{string} title ');
        if (!(startAt instanceof Date)) errors.push('{date} startAt');
        if (!(stopAt instanceof Date)) errors.push('{date} stopAt');
        if (date !== null && date !== undefined && !(date instanceof Date)) {
            errors.push('{date | undefined | null} date')
        }
        if (elapsedTime !== null && elapsedTime !== undefined && typeof elapsedTime !== 'number') {
            errors.push('{number | undefined | null} elapsedTime')
        }
        if (errors.length > 0) {
            throw new Error(`${errors.length} invalid parameter(s): ${errors.join(', ')}`);
        }

        this.id = id,
            this.title = title,
            this.startAt = startAt,
            this.stopAt = stopAt,
            this.date = date ? date : dateGenerator(startAt),
            this.elapsedTime = elapsedTime ? elapsedTime : timeDiffInSecond(startAt, stopAt)
    }
}