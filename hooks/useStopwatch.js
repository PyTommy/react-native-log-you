
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSummaries, createLog } from '../store/actions/index';
import { dateGenerator } from '../utils/dateGenerator';

// Reference: https://codesandbox.io/s/6l1yz11nq3?from-embed
/**
 * Custom hook of stopwatch
 * @returns - { 
        elapsedTime,
        startAt,
        reset,
        start,
        saveAndReset,
        activeCategory,
        waitingSavedTime,}
 */
const useStopwatch = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startAt, setStartAt] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [waitingSavedTime, setWaitingSavedTime] = useState({}); // used to add elapsedTime for an item while waiting async action creating new log on SQLite and redux store. (Example: { Study : 3600 })
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    let timerInterval;

    const todayISOString = dateGenerator(new Date()).toISOString();
    useEffect(() => {
        dispatch(fetchSummaries(todayISOString));
    }, [dispatch, todayISOString]);

    useEffect(() => {
        if (startAt) {
            timerInterval = setInterval(() => {
                setElapsedTime(() => Math.floor((new Date() - startAt) / 1000));
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [startAt]);

    const saveLog = async () => {
        // Don't save if elapsed time is less than the minimum time specified as setting.
        if (elapsedTime < settings.minTime * 60) return;

        setWaitingSavedTime(() => ({
            [activeCategory]: elapsedTime
        }));
        await dispatch(createLog(
            activeCategory,
            startAt,
            new Date()
        ));
        setWaitingSavedTime(() => ({}));
    };

    /**
     * Start stopwatch
     * @param {string} selectedCategory 
     */
    const start = (selectedCategory) => {
        if (activeCategory === selectedCategory) return;

        if (activeCategory) {
            saveLog();
        }

        if (startAt) {
            clearInterval(timerInterval);
            setElapsedTime(() => 0);
        }
        setActiveCategory(() => selectedCategory);
        setStartAt(() => new Date());
    };

    const reset = () => {
        if (startAt) {
            setActiveCategory(() => null);
            clearInterval(timerInterval);
            setElapsedTime(() => 0);
            setStartAt(() => null);
        }
    };

    const saveAndReset = () => {
        if (!activeCategory) return;
        saveLog();
        reset();
    };

    // Save if elapsed time is greater than minutes specified as autoAuto in settings.
    useEffect(() => {
        if (activeCategory && elapsedTime >= settings.autoStop * 60) {
            // save and reset stopwatch.
            const asyncFunc = async () => {
                clearInterval(timerInterval);
                setWaitingSavedTime(() => ({
                    [activeCategory]: elapsedTime
                }));
                setActiveCategory(() => null);
                setElapsedTime(() => 0);
                setStartAt(() => null);

                try {
                    await dispatch(createLog(
                        activeCategory,
                        startAt,
                        new Date(startAt.getTime() + settings.autoStop * 60 * 1000)
                    ));
                } catch (err) {
                    console.log(err);
                }

                setWaitingSavedTime(() => ({}));
            };
            asyncFunc();
        }
    });


    return {
        elapsedTime,
        startAt,
        reset,
        start,
        saveAndReset,
        activeCategory,
        waitingSavedTime,
    };
};

export default useStopwatch;