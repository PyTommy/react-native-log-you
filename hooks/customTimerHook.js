
import { useState, useEffect } from 'react';

// Reference: https://codesandbox.io/s/6l1yz11nq3?from-embed
export const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return {
        isRunning,
        setIsRunning,
        elapsedTime,
        setElapsedTime
    };
};

/**
 * Custom hook of stopwatch
 * @returns - {elapsedTime, isRunning, startAt, resetTimer, startTimer}
 */
export const useStopwatch = () => {
    const [startAt, setStartAt] = useState(null);
    const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer();

    const handleStart = () => {
        setStartAt(new Date());
        setIsRunning(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setStartAt(null);
    };

    return {
        elapsedTime: Math.floor(elapsedTime),
        isRunning,
        startAt,
        resetTimer: () => handleReset(),
        startTimer: () => handleStart(),
    };
}
