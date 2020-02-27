import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import moment from 'moment';

import { dateGenerator } from '../utils/dateGenerator';
import { fetchSummaries, fetchLogs } from '../store/actions/index';
import DaySummary from '../components/DaySummary';
import { IoniconsHeaderButton } from '../components/UI/HeaderButton';
import LogList from '../components/LogList';
import UIButtonOutline from '../components/UI/ButtonOutline';
import Colors from '../constants/Colors';


const DayLogScreen = props => {
    // Redux store 
    const logs = useSelector(state => state.logs); // {[isoDate]: [{log}]}
    const summaries = useSelector(state => state.summaries); // {[isoDate]: { summary }}
    const dispatch = useDispatch();

    // Date related variables
    const today = dateGenerator(new Date());
    const isoToday = today.toISOString();
    const [selectedDate, setSelectedDate] = useState(today);
    const isoSelectedDate = selectedDate.toISOString();
    const selectedDateFormatted = isoToday === isoSelectedDate
        ? 'Today'
        : moment(selectedDate).format('YYYY/MM/DD');

    // Showing Logs? Otherwise, Summaries displayed.
    const [showLogs, setShowLogs] = useState(false);
    const switchDate = (next = true) => {
        setSelectedDate(prevState => {
            if (next) {
                return new Date(prevState.getTime() + 24 * 60 * 60 * 1000);
            } else {
                return new Date(prevState.getTime() - 24 * 60 * 60 * 1000);
            }
        });
    };
    const toggleShowLogs = () => {
        setShowLogs(prevState => !prevState);
    };

    const summary = summaries[isoSelectedDate];

    // fetch logs or summary of selected date.
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (showLogs) {
                    dispatch(fetchLogs(isoSelectedDate));
                } else {
                    dispatch(fetchSummaries(isoSelectedDate));
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [isoSelectedDate, dispatch, isoToday, showLogs]);// use today as dependency to update after 4 am

    // Customize header
    props.navigation.setOptions({
        headerTitle: selectedDateFormatted,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                <Item
                    title='Previous Date'
                    iconName='ios-arrow-back'
                    onPress={() => {
                        switchDate(false);
                    }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            isoToday === isoSelectedDate ? null : (
                <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                    <Item
                        title='Next Date'
                        iconName='ios-arrow-forward'
                        onPress={() => {
                            switchDate(true);
                        }} />
                </HeaderButtons>
            )
        ),
    });

    if (showLogs) {
        return (
            <View style={styles.screen}>
                <LogList
                    logs={logs[isoSelectedDate]}
                    isoSelectedDate={isoSelectedDate}
                />
                <View style={styles.togglerContainer}>
                    <UIButtonOutline
                        title={'Switch to Summary'}
                        onPress={toggleShowLogs} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.screen}>
                <ScrollView>
                    <DaySummary summary={summary} navigation={props.navigation} />
                </ScrollView>
                <View style={styles.togglerContainer}>
                    <UIButtonOutline
                        title={'Switch to Logs'}
                        onPress={toggleShowLogs} />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.d2,
        flex: 1,
    },
    togglerContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
})


export default DayLogScreen
