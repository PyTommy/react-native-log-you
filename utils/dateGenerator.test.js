import { dateGenerator } from './dateGenerator';
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