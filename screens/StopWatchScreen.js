import React, { useState, useEffect, useCallback } from 'react'
import { View, Button, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import useStopwatch from '../hooks/useStopwatch';
import { secondToStringHHMMSSArray } from '../utils/convertSecond';
import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';
import UIButton from '../components/UI/Button';
import StartButton from '../components/StartButton';
import Colors from '../constants/Colors';

const StopwatchScreen = props => {
    const stopwatch = useStopwatch();
    const [curActiveTitle, setCurActiveTitle] = useState(null);

    const [itemSummaries, setItemSummaries] = useState({
        Study: {
            elapsedTime: 3600,
        },
        Meditation: {
            elapsedTime: 3599,
        },
        Sports: {
            elapsedTime: 3599,
        },
        Eating: {
            elapsedTime: 3599,
        },
    });

    const resetStopwatchHandler = () => {
        setCurActiveTitle(() => null);
        stopwatch.reset();
    }

    const saveLogHandler = async () => {
        const title = curActiveTitle;
        const elapsedTime = stopwatch.elapsedTime;
        const startAt = stopwatch.startAt
        setItemSummaries(prevState => ({
            ...prevState,
            [title]: {
                ...prevState[title],
                elapsedTime: prevState[title].elapsedTime + elapsedTime
            }
        }));
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

    const itemTitles = Object.keys(itemSummaries).sort();

    const startButtons = itemTitles.map(itemTitle => {
        const isItemActive = curActiveTitle === itemTitle;
        const savedItemElapsedTime = itemSummaries[itemTitle].elapsedTime;

        return (
            <StartButton
                key={itemTitle}
                title={itemTitle}
                onPress={() => startStopwatchHandler(itemTitle)}
                elapsedTime={isItemActive
                    ? savedItemElapsedTime + stopwatch.elapsedTime
                    : savedItemElapsedTime
                }
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