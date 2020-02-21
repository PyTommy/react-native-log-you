import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';


import { dateGenerator } from '../utils/dateGenerator';
import { fetchSummaries, fetchLogs } from '../store/actions/index';
import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';
import DaySummary from '../components/DaySummary';

const DayLogScreen = props => {
    const logs = useSelector(state => state.logs);
    const summaries = useSelector(state => state.summaries);
    const dispatch = useDispatch();

    const today = dateGenerator(new Date());
    const [selectedDate, setSelectedDate] = useState(today);

    const isoToday = today.toISOString(); // Change this later
    const isoSelectedDate = selectedDate.toISOString();

    const summary = summaries[isoToday];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchSummaries(isoSelectedDate, isoSelectedDate));
            dispatch(fetchLogs(isoSelectedDate, isoSelectedDate));
        };
        fetchData();
    }, [isoSelectedDate, isoToday]);// use today as dependency to update at 4 am

    return (
        <ScrollView style={styles.screen}>
            <DaySummary summary={summary} />
            <Button
                title="ItemLog"
                onPress={() => {
                    props.navigation.navigate('ItemLog');
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
})


export default DayLogScreen
