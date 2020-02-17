import { timeDiffInSecond } from './timeDiff';

describe('calcTimeDiff', () => {
    test('returns time difference in seconds', () => {
        const date1 = new Date(2000, 0, 1); // 2000/01/01
        const date2 = new Date(2000, 0, 2); //2000/01/02
        const secondsInDay = 24 * 60 * 60;
        const timeDiff = timeDiffInSecond(date1, date2);
        expect(timeDiff).toBe(secondsInDay);
    });
});