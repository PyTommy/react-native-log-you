import { storeFactory } from '../test/testUtils';
import {
    actionTypes as logActionTypes,
    createLog
} from './actions/logAction';
import Log from '../models/log';

describe('createLog', () => {
    const log1 = new Log(
        '1',
        'Study',
        new Date(2020, 0, 1, 10),
        new Date(2020, 0, 1, 12)
    );
    const log2 = new Log(
        '1', // change later
        'Meditation',
        new Date(2020, 0, 1, 12),
        new Date(2020, 0, 1, 13)
    );
    const log3 = new Log(
        '1', // change later
        'Study',
        new Date(2020, 0, 1, 13),
        new Date(2020, 0, 1, 16)
    );
    const log4 = new Log(
        '1', // change later
        'Meditation',
        new Date(2020, 0, 2, 10, 30),
        new Date(2020, 0, 2, 11)
    );

    describe('create log first time', () => {
        let store;
        beforeEach(() => {
            store = storeFactory({});
        });
        test('Create a log', () => {
            store.dispatch(createLog(log1.category, log1.startAt, log1.stopAt));
            const newState = store.getState().log;

            const expectedState = {
                [log1.date.toISOString()]: {
                    elapsedTimeSummary: {
                        Study: log1.elapsedTime,
                        Meditation: 0,
                        Eating: 0,
                        Sports: 0
                    },
                    logs: [log1]
                }
            }
            expect(newState).toEqual(expectedState);
        });

        test('Create 2 log in the same day', () => {
            store.dispatch(createLog(log1.category, log1.startAt, log1.stopAt));
            store.dispatch(createLog(log3.category, log3.startAt, log3.stopAt));
            const newState = store.getState().log;

            const expectedState = {
                [log1.date.toISOString()]: {
                    elapsedTimeSummary: {
                        Study: log1.elapsedTime + log3.elapsedTime,
                        Meditation: 0,
                        Eating: 0,
                        Sports: 0
                    },
                    logs: [log1, log3]
                }
            }
            expect(newState).toEqual(expectedState);
        });

        test('Create 2 log with different category in same day', () => {
            store.dispatch(createLog(log1.category, log1.startAt, log1.stopAt));
            store.dispatch(createLog(log2.category, log2.startAt, log2.stopAt));
            const newState = store.getState().log;

            const expectedState = {
                [log1.date.toISOString()]: {
                    elapsedTimeSummary: {
                        Study: log1.elapsedTime,
                        Meditation: log2.elapsedTime,
                        Eating: 0,
                        Sports: 0
                    },
                    logs: [log1, log2]
                }
            }
            expect(newState).toEqual(expectedState);
        });

        test('Create 2 log in different days', () => {
            store.dispatch(createLog(log1.category, log1.startAt, log1.stopAt));
            store.dispatch(createLog(log4.category, log4.startAt, log4.stopAt));
            const newState = store.getState().log;

            const expectedState = {
                [log1.date.toISOString()]: {
                    elapsedTimeSummary: {
                        Study: log1.elapsedTime,
                        Meditation: 0,
                        Eating: 0,
                        Sports: 0
                    },
                    logs: [log1]
                },
                [log4.date.toISOString()]: {
                    elapsedTimeSummary: {
                        Study: 0,
                        Meditation: log4.elapsedTime,
                        Eating: 0,
                        Sports: 0
                    },
                    logs: [log4]
                }
            }
            expect(newState).toEqual(expectedState);
        });
    });
});