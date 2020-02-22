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

const DayLogScreen = props => {
    const [showLogs, setShowLogs] = useState(false);
    const logs = useSelector(state => state.logs); // {[isoDate]: [{log}]}
    const summaries = useSelector(state => state.summaries); // {[isoDate]: { summary }}
    const dispatch = useDispatch();

    const today = dateGenerator(new Date());
    const isoToday = today.toISOString(); // Change this later

    const [selectedDate, setSelectedDate] = useState(today);
    const isoSelectedDate = selectedDate.toISOString();

    const selectedDateFormatted = isoToday === isoSelectedDate
        ? 'Today'
        : moment(selectedDate).format('YYYY/MM/DD');

    const switchDate = (next = true) => {
        setSelectedDate(prevState => {
            if (next) {
                return new Date(prevState.getTime() + 24 * 60 * 60 * 1000);
            } else {
                return new Date(prevState.getTime() - 24 * 60 * 60 * 1000);
            }
        });
    };

    const summary = summaries[isoSelectedDate];

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
    }, [isoSelectedDate, dispatch, isoToday]);// use today as dependency to update at 4 am

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
            <View style={{ flex: 1 }}>
                <LogList logs={logs[isoSelectedDate]} />
                <Button
                    title={'Show Summary'}
                    onPress={() => setShowLogs(false)}
                />
            </View>
        )
    } else {
        return (
            <ScrollView style={styles.screen}>
                <DaySummary summary={summary} />
                <Button
                    title={'Show Logs'}
                    onPress={() => setShowLogs(true)}
                />
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
})


export default DayLogScreen
