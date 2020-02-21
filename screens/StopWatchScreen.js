import React, { useState, useEffect } from 'react'
import { View, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import useStopwatch from '../hooks/useStopwatch';
import { secondToStringHHMMSSArray } from '../utils/convertSecond';
import BoldText from '../components/UI/BoldText';
import UIButton from '../components/UI/Button';
import StartButton from '../components/StartButton';
import Colors from '../constants/Colors';
import { createLog, fetchSummaries } from '../store/actions/index';
import { dateGenerator } from '../utils/dateGenerator';

const StopwatchScreen = props => {
    const stopwatch = useStopwatch();
    const [curActiveTitle, setCurActiveTitle] = useState(null);
    const [waitingSavedTime, setWaitingSavedTime] = useState({}); // used to add elapsedTime for an item while waiting async action creating new log on SQLite and redux store. (Example: { Study : 3600 })
    const summaries = useSelector(state => state.summaries);
    const dispatch = useDispatch();

    const todayISOString = dateGenerator(new Date()).toISOString();
    useEffect(() => {
        dispatch(fetchSummaries(todayISOString));
    }, []);

    const itemElapsedTimes = summaries[todayISOString]
        ? summaries[todayISOString]
        : { Study: 0, Meditation: 0, Sports: 0, Eating: 0 };

    const resetStopwatchHandler = () => {
        setCurActiveTitle(() => null);
        stopwatch.reset();
    }

    const saveLogHandler = async () => {
        setWaitingSavedTime(() => ({
            [curActiveTitle]: stopwatch.elapsedTime
        }));
        await dispatch(createLog(curActiveTitle, stopwatch.startAt, new Date()));
        setWaitingSavedTime(() => ({}));
    }

    const saveAndResetStopwatch = () => {
        if (!curActiveTitle) return;
        saveLogHandler();
        resetStopwatchHandler();
    };

    const startStopwatchHandler = (selectedTitle) => { // Async ??
        if (curActiveTitle === selectedTitle) return;

        if (curActiveTitle) saveLogHandler();
        setCurActiveTitle(() => selectedTitle);
        stopwatch.start(); // This reset and start stopwatch.
    };

    const itemTitles = Object.keys(itemElapsedTimes).sort();
    const startButtons = itemTitles.map(itemTitle => {
        const isItemActive = curActiveTitle === itemTitle;

        let elapsedTime = itemElapsedTimes[itemTitle];
        if (isItemActive) {
            elapsedTime += stopwatch.elapsedTime;
        }
        elapsedTime += waitingSavedTime[itemTitle] || 0;

        return (
            <StartButton
                key={itemTitle}
                title={itemTitle}
                onPress={() => startStopwatchHandler(itemTitle)}
                elapsedTime={elapsedTime}
                active={isItemActive}
            />
        );
    });



    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.timerBox}>
                <BoldText style={styles.timer}>
                    {secondToStringHHMMSSArray(stopwatch.elapsedTime).join(':')}
                </BoldText>
            </View>
            <View style={styles.startButtons}>
                {startButtons}
            </View>
            <View style={styles.bottomButtons}>
                <UIButton
                    title="SAVE"
                    color={Colors.success}
                    onPress={saveAndResetStopwatch}
                    style={{ marginRight: 30 }}
                />
                <UIButton
                    title="DISMISS"
                    color={Colors.danger}
                    onPress={resetStopwatchHandler} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    },
    timerBox: {
        height: '40%',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 70,
    },
    startButtons: {
        width: "90%",
        height: '45%',
        justifyContent: 'space-around',
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    bottomButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default StopwatchScreen