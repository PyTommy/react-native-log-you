import React, { useEffect } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { dateGenerator } from '../utils/dateGenerator';
import { fetchLogs } from '../store/actions/index';
import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const DayLogScreen = props => {
    const logStore = useSelector(state => state.logs);
    const dispatch = useDispatch();

    useEffect(() => {
        const dateTo = dateGenerator(new Date()); // Change this later
        const dateFrom = new Date(dateTo.getTime() - 24 * 60 * 60 * 1000);
        dispatch(fetchLogs(
            dateFrom.toISOString(),
            dateTo.toISOString()
        ));
        console.log(logStore);
    }, []);

    return (
        <View style={styles.screen}>
            <DefaultText>DayLogScreen</DefaultText>
            <Button
                title="ItemLog"
                onPress={() => {
                    props.navigation.navigate('ItemLog');
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})


export default DayLogScreen
