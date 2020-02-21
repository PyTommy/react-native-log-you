import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Button } from 'react-native'
import { useDispatch } from 'react-redux';

import { deleteAllLogs } from '../store/actions/index'
import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const SettingScreen = props => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.screen}>
            <DefaultText>SettingScreen</DefaultText>
            <Button
                title='DELETE ALL LOG DATA'
                onPress={() => dispatch(deleteAllLogs())}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})


export default SettingScreen