import Log from './log';

describe('class Log', () => {
    const id = 'string';
    const title = 'string';
    const startAt = new Date();
    const stopAt = new Date();
    const isoDate = 'string';
    const elapsedTime = 60;

    describe('Create class Log', () => {
        test('Create class Log', () => {
            const log = new Log(id, title, startAt, stopAt, isoDate, elapsedTime);
            expect(!!log).toBe(true);
            expect(log).toEqual({ id, title, startAt, stopAt, isoDate, elapsedTime });
        });
        test('Create class Log with undefined date and elapsedTime', () => {
            const log = new Log(id, title, startAt, stopAt);
            expect(!!log).toBe(true);
        });
        test('Create class Log when date and elapsedTime are null', () => {
            const log = new Log(id, title, startAt, stopAt, null, null);
            expect(!!log).toBe(true);
        });
    })

    describe('Fail to create class Log', () => {
        test('Fail with invalid type params', () => {
            try {
                new Log(1, 1, 'string', 'string', 1, 'string');
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