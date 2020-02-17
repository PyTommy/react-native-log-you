import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const StopwatchScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <DefaultText>StopwatchScreen</DefaultText>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})


export default StopwatchScreen