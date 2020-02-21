import { dateGenerator, isoDatesBetween } from './dateGenerator';
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

describe('isoDatesBetween', () => {
    const dateFrom = new Date(2000, 1, 1);
    const dateBetween = new Date(2000, 1, 2);
    const dateTo = new Date(2000, 1, 3);
    const isoDateFrom = dateFrom.toISOString();
    const isoDateBetween = dateBetween.toISOString();
    const isoDateTo = dateTo.toISOString();

    test("returns today's isoString only without params", () => {
        const datesArray = isoDatesBetween();

        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        expect(datesArray).toEqual([today.toISOString()]);
    });

    test('returns dates when ISO strings provided', () => {
        const datesArray = isoDatesBetween(isoDateFrom, isoDateTo);
        const expectedDates = [
            isoDateFrom, isoDateBetween, isoDateTo
        ];
        expect(datesArray).toEqual(expectedDates);

    });
    test('returns dates when date objects provided', () => {
        const datesArray = isoDatesBetween(dateFrom, dateTo);
        const expectedDates = [
            isoDateFrom, isoDateBetween, isoDateTo
        ];
        expect(datesArray).toEqual(expectedDates);

    });
})
