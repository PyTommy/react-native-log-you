import { timeDiffInSecond } from '../utils/timeDiff'
import { dateGenerator } from '../utils/dateGenerator';

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