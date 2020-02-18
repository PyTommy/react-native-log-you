import React, { useState, useEffect, useCallback } from 'react'
import { View, Button, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import { useStopwatch } from '../hooks/customTimerHook';
import { secondToStringHHMMSSArray } from '../utils/convertSecond';
import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const StopwatchScreen = props => {
    const { elapsedTime, isRunning, startAt, resetTimer, startTimer } = useStopwatch();

    const

    return (
        <SafeAreaView style={styles.screen}>
            <View>
                <BoldText>{secondToStringHHMMSSArray(elapsedTime).join(':')}</BoldText>
            </View>
            <Button
                title='start'
                onPress={startTimer}
            />
            <Button
                title='stop'
                onPress={resetTimer}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})


export default StopwatchScreen