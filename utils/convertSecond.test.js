import { secondToNumberHMSArray, secondToStringHHMMSSArray } from './convertSecond';

describe('secondToNumberHMSArray', () => {
    test('return array, [hh, mm, ss]', () => {
        const sec = 3600 * 2 + 60 * 5 + 1 * 3;
        const array = secondToNumberHMSArray(sec);
        expect(array).toEqual([2, 5, 3]);
    })
    test('Throw Error when param type is different', () => {
        try {
            const sec = '123';
            secondToNumberHMSArray(sec);
            throw new Error('Should fail with different param type');
        } catch (err) {
            expect(err.message).not.toBeNull();
        }
    })
});

describe('secondToStringHHMMSSArray', () => {
    test('return array, [hh, mm, ss]', () => {
        const sec = 3600 * 2 + 60 * 5 + 1 * 3;
        const array = secondToStringHHMMSSArray(sec);
        expect(array).toEqual(['02', '05', '03']);
    })
});