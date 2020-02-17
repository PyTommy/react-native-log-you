import Log, { dateGenerator, calcTimeDiff } from './log';

describe('dateGenerator', () => {
    test("return today's date", () => {
        const date = new Date(2000, 0, 1, 5, 1, 1, 1); // 2000/01/01 05:01:01:001
        const generatedDate = dateGenerator(date);
        expect(generatedDate).toEqual(new Date(2000, 0, 1, 0, 0, 0, 0)); // 2000/01/01 00:00:00:000
    });
    test("returns yesterday's date", () => {
        const date = new Date(2000, 0, 1, 3, 1, 1, 1); // 2000/01/01 03:01
        const generatedDate = dateGenerator(date);
        expect(generatedDate).toEqual(new Date(1999, 11, 31, 0, 0, 0, 0)); // 1999/12/31 00:00:00:000
    });
});

describe('calcTimeDiff', () => {
    test('returns time difference in seconds', () => {
        const date1 = new Date(2000, 0, 1); // 2000/01/01
        const date2 = new Date(2000, 0, 2); //2000/01/02
        const secondsInDay = 24 * 60 * 60;
        const timeDiff = calcTimeDiff(date1, date2);
        expect(timeDiff).toBe(secondsInDay);
    });
});

describe('class Log', () => {
    const id = 'string';
    const title = 'string';
    const startAt = new Date();
    const stopAt = new Date();
    const date = new Date();
    const time = 60;

    describe('Create class Log', () => {
        test('Create class Log', () => {
            const log = new Log(id, title, startAt, stopAt, date, time);
            expect(!!log).toBe(true);
            expect(log).toEqual({ id, title, startAt, stopAt, date, time });
        });
        test('Create class Log with undefined date and time', () => {
            const log = new Log(id, title, startAt, stopAt);
            expect(!!log).toBe(true);
        });
        test('Create class Log when date and time are null', () => {
            const log = new Log(id, title, startAt, stopAt, null, null);
            expect(!!log).toBe(true);
        });
    })

    describe('Fail to create class Log', () => {
        test('Fail with invalid type params', () => {
            try {
                new Log(1, 1, 'string', 'string', 'string', 'string');
                throw new Error('new Log() should fail!!');
            } catch (err) {
                expect(err.message).toContain('6');
            }
        });
        test('Fail without params', () => {
            try {
                new Log();
                throw new Error('new Log() should fail!!');
            } catch (err) {
                expect(err.message).toContain('4');
            }
        });
    });

});