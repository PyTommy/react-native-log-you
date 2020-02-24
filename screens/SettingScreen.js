import React, { useState, useCallback } from 'react'
import { Platform, View, StatusBar, StatusBarIOS, StyleSheet, Alert } from 'react-native'
import { useDispatch } from 'react-redux';

import { deleteAllLogs } from '../store/actions/index'
import UIButtonOutline from '../components/UI/ButtonOutline';
import { ScrollView } from 'react-native-gesture-handler';
import SettingWithText from '../components/SettingWithText';
import SettingHeader from '../components/SettingHeader';
import Colors from '../constants/Colors';

const SettingScreen = props => {
    const dispatch = useDispatch();

    const [settings, setSettings] = useState({
        autoStop: {
            value: '90',
            isValid: true,
        },
        minTime: {
            value: '0',
            isValid: true,
        }
    });

    const onChangeText = useCallback((identifier, value, isValid) => {
        setSettings(prevState => ({
            ...prevState,
            [identifier]: {
                value,
                isValid
            }
        }));
    }, []);

    const onSaveHandler = () => {
        console.log('onSave');
    };

    const onDeleteAllHandler = () => {
        Alert.alert(
            'Are you sure??',
            "You are deleting all data in this app. It will be never recovered once you do it.",
            [
                { text: 'CANCEL', style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        dispatch(deleteAllLogs());
                        props.navigation.navigate('Stopwatch');
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={styles.screen}>
            <SettingHeader onSave={onSaveHandler} />
            <ScrollView contentContainerStyle={styles.container}>
                <SettingWithText
                    title='Auto Stop'
                    identifier={'autoStop'}
                    value={settings.autoStop.value}
                    isValid={settings.autoStop.isValid}
                    onChangeText={onChangeText}
                    numeric={true}
                    required={true}
                    min={1}
                    explanation='Automatically stop stopwatch and save elapsed time in the specified minute(s).'
                    invalidMessage='Should be greater than 0!!'
                    restTextInputProps={{
                        placeholder: 'min(s)',
                        keyboardType: 'number-pad',
                        maxLength: 3,
                    }}
                />
                <SettingWithText
                    title='Minimum Time'
                    identifier={'minTime'}
                    value={settings.minTime.value}
                    isValid={settings.minTime.isValid}
                    numeric={true}
                    required={true}
                    onChangeText={onChangeText}
                    explanation='Log will not be saved if its elapsed time is less than the minimum minute(s).'
                    invalidMessage='Required!!'
                    restTextInputProps={{
                        placeholder: 'min(s)',
                        keyboardType: 'number-pad',
                        maxLength: 3,
                    }}
                />
                <UIButtonOutline
                    title='DELETE ALL LOG DATA'
                    color={Colors.l3}
                    onPress={onDeleteAllHandler}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    container: {
        paddingTop: 15,
    },

})


export default SettingScreen