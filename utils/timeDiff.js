/**
 * Calculate time difference in seconds
 * @function timeDiffInSecond
 * @param {date} time1 
 * @param {date} time2 
 * @returns {number}
 */
export const timeDiffInSecond = (time1, time2) => {
    if (time1 <= time2) {
        return Math.floor((time2 - time1) / 1000);
    } else {
        return Math.floor((time1 - time2) / 1000);
    }
};