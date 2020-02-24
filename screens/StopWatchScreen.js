import React from 'react'
import { View, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';

import useStopwatch from '../hooks/useStopwatch';
import { secondToStringHHMMSSArray } from '../utils/convertSecond';
import BoldText from '../components/UI/BoldText';
import UIButton from '../components/UI/Button';
import StartButton from '../components/StartButton';
import Colors from '../constants/Colors';
import { dateGenerator } from '../utils/dateGenerator';

const StopwatchScreen = props => {
    const stopwatch = useStopwatch();
    const summaries = useSelector(state => state.summaries);

    const todayISOString = dateGenerator(new Date()).toISOString();

    const todayElapsedTimes = summaries[todayISOString]
        ? summaries[todayISOString]
        : { Study: 0, Meditation: 0, Sports: 0, Eating: 0 };


    // Create <StartButton /> for each category.
    const categories = Object.keys(todayElapsedTimes).sort();

    const startButtons = categories.map(category => {
        const isCategoryActive = stopwatch.activeCategory === category;

        let elapsedTime = todayElapsedTimes[category];
        if (isCategoryActive) {
            elapsedTime += stopwatch.elapsedTime;
        }
        elapsedTime += stopwatch.waitingSavedTime[category] || 0;

        return (
            <StartButton
                key={category}
                category={category}
                onPress={() => stopwatch.start(category)}
                elapsedTime={elapsedTime}
                active={isCategoryActive}
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
                    onPress={stopwatch.saveAndReset}
                    style={{ marginRight: 30 }}
                />
                <UIButton
                    title="DISMISS"
                    color={Colors.danger}
                    onPress={stopwatch.reset} />
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