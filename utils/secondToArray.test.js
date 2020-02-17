import { secondToNumberHMS, secondToStringHHMMSS } from './secondToArray';

describe('secondToNumberHMS', () => {
    test('return array, [hh, mm, ss]', () => {
        const sec = 3600 * 2 + 60 * 5 + 1 * 3;
        const array = secondToNumberHMS(sec);
        expect(array).toEqual([2, 5, 3]);
    })
    test('Throw Error when param type is different', () => {
        try {
            const sec = '123';
            secondToNumberHMS(sec);
            throw new Error('Should fail with different param type');
        } catch (err) {
            expect(err.message).not.toBeNull();
        }
    })
});

describe('secondToStringHHMMSS', () => {
    test('return array, [hh, mm, ss]', () => {
        const sec = 3600 * 2 + 60 * 5 + 1 * 3;
        const array = secondToStringHHMMSS(sec);
        expect(array).toEqual(['02', '05', '03']);
    })
});