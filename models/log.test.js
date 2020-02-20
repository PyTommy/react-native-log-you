import Log from './log';

describe('class Log', () => {
    const id = 'string';
    const title = 'string';
    const startAt = new Date();
    const stopAt = new Date();
    const date = new Date();
    const elapsedTime = 60;

    describe('Create class Log', () => {
        test('Create class Log', () => {
            const log = new Log(id, title, startAt, stopAt, date, elapsedTime);
            expect(!!log).toBe(true);
            expect(log).toEqual({ id, title, startAt, stopAt, date, elapsedTime });
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