/**
 * Convert seconds to an Array containing hours, minutes and seconds.
 * @param {number} second
 * @returns {array} - [hour, minutes, seconds]
 */
export const secondToNumberHMSArray = (second) => {
    if (typeof second !== 'number') {
        throw new Error('Param should be a number');
    }
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second - 3600 * hour) / 60);
    const sec = Math.floor(second - 3600 * hour - 60 * min);

    return [hour, min, sec];
};

/**
 * Add '0' on the left of provided number.
 * @param {number} num 
 * @param {number} length - Length of the result string
 * @returns {string}
 */
export const add0 = (num, length) => {
    const numStr = num.toString();
    const diff = length - numStr.length;
    if (diff > 0) {
        return '0'.repeat(diff) + num;
    };
    return numStr;
};

/**
 * Convert seconds to an Array, ['hh', 'mm', 'ss'].
 * @param {number} second 
 * @returns {array}
 */
export const secondToStringHHMMSSArray = second => {
    const hmsArray = secondToNumberHMSArray(second);
    return hmsArray.map((num) => add0(num, 2));
};