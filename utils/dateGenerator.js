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
 * 
 * @param {string|date|null|undefined} dateFrom - ISO or date object. Current date is applied if not provided.
 * @param {string|date|null|undefined} dateTo - ISO or date object. dateFrom is applied if not provided.
 * @returns {array} - ['ISODate']
 */
export const isoDatesBetween = (dateFrom, dateTo) => {
    if (!dateFrom) {
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        dateFrom = today;
    }
    if (typeof dateFrom === 'string') {
        dateFrom = new Date(dateFrom);
    }
    if (!dateTo) {
        dateTo = dateFrom;
    }
    if (typeof dateTo === 'string') {
        dateTo = new Date(dateTo);
    }

    const dates = [];
    let tmpDate = dateFrom;

    while (tmpDate <= dateTo) {
        dates.push(tmpDate.toISOString());
        tmpDate = new Date(tmpDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return dates;
};