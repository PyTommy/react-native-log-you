
import { useState, useEffect } from 'react';

// Reference: https://codesandbox.io/s/6l1yz11nq3?from-embed
/**
 * Custom hook of stopwatch
 * @returns - {elapsedTime, startAt, reset, start}
 */
const useStopwatch = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startAt, setStartAt] = useState(null);
    let timerInterval;

    useEffect(() => {
        if (startAt) {
            timerInterval = setInterval(() => {
                setElapsedTime(() => Math.floor((new Date() - startAt) / 1000));
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [startAt]);

    const start = () => {
        if (startAt) {
            clearInterval(timerInterval);
            setElapsedTime(() => 0);
        }
        setStartAt(() => new Date());
    };


    const reset = () => {
        if (startAt) {
            clearInterval(timerInterval);
            setElapsedTime(() => 0);
            setStartAt(() => null);
        }
    };


    return {
        elapsedTime,
        startAt,
        reset,
        start,
    };
};

export default useStopwatch;