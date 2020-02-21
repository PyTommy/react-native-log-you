import { timeDiffInSecond } from '../utils/timeDiff'
import { dateGenerator } from '../utils/dateGenerator';

/**
 * Create Log class 
 * @param {string} id 
 * @param {string} title 
 * @param {date} startAt - Start Date  
 * @param {date} stopAt - Stop Date
 * @param {string | undefined | null} isoDate - date formatted as ISO string. Generated automatically if not provided.
 * @param {number | undefined | null} elapsedTime - time spent in second. Generated automatically if not provided.
 */
export default class Log {
    constructor(id, title, startAt, stopAt, isoDate, elapsedTime) {
        // Throw errors if params are invalid
        const errors = [];
        if (typeof id !== 'string') errors.push('{string} id');
        if (typeof title !== 'string') errors.push('{string} title ');
        if (!(startAt instanceof Date)) errors.push('{date} startAt');
        if (!(stopAt instanceof Date)) errors.push('{date} stopAt');
        if (isoDate !== null && isoDate !== undefined && !(typeof isoDate === 'string')) {
            errors.push('{string | undefined | null} isoDate')
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
            this.isoDate = isoDate || dateGenerator(startAt).toISOString(),
            this.elapsedTime = elapsedTime || timeDiffInSecond(startAt, stopAt)
    }
}