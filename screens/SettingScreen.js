import React, { useState, useCallback } from 'react'
import { Platform, View, StatusBar, StyleSheet, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../store/actions/index'
import UIButtonOutline from '../components/UI/ButtonOutline';
import { ScrollView } from 'react-native-gesture-handler';
import SettingWithText from '../components/SettingWithText';
import SettingHeader from '../components/SettingHeader';
import Colors from '../constants/Colors';

const SettingScreen = props => {
    const dispatch = useDispatch();
    const settingsStored = useSelector(state => state.settings);

    const [settings, setSettings] = useState({
        autoStop: {
            value: settingsStored.autoStop.toString(),
            isValid: true,
        },
        minTime: {
            value: settingsStored.minTime.toString(),
            isValid: true,
        }
    });


    let isChanged = false;
    const settingItemTitles = Object.keys(settings);
    settingItemTitles.forEach(title => {
        if (settings[title].value !== settingsStored[title].toString()) {
            isChanged = true;
        };
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
        const settingTitles = Object.keys(settings);

        let isValid = true;
        settingTitles.forEach((title) => {
            isValid = settings[title].isValid && isValid;
        });

        if (isValid) {
            dispatch(actions.setSettings(
                +settings.autoStop.value,
                +settings.minTime.value
            ));
        } else {
            Alert.alert(
                'Invalid',
                "You need to fill settings with valid inputs.",
                [{ text: 'OK' }]
            );
        }
    };

    const onDeleteAllHandler = () => {
        Alert.alert(
            'Are you sure??',
            "You are deleting all data in this app. It will be never recovered once you do it.",
            [
                { text: 'CANCEL', style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        dispatch(actions.deleteAllLogs());
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
            <SettingHeader onSave={onSaveHandler} isChanged={isChanged} />
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
                        maxLength: 2,
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