import React from 'react'
import moment from 'moment';

import { ScrollView, StyleSheet } from 'react-native'

import { secondToNumberHMSArray } from '../utils/convertSecond';
import Colors from '../constants/Colors';
import DefaultText from './UI/DefaultText';
import BoldText from './UI/BoldText';


const ItemSummaryCard = props => {
    let { elapsedTime, isoDate } = props;
    let hour, min, sec;

    if (typeof elapsedTime !== 'number') {
        hour = min = sec = '-';
    } else {
        [hour, min, sec] = secondToNumberHMSArray(elapsedTime);
        if (hour.toString().length === 1) {
            hour = ' ' + hour;
        }
        if (min.toString().length === 1) {
            min = ' ' + min;
        }
        if (sec.toString().length === 1) {
            sec = ' ' + sec;
        }
    }



    return (
        <ScrollView contentContainerStyle={styles.ItemSummaryCard}>
            <DefaultText style={styles.date}>{moment(isoDate).format('ddd  MM/DD')}</DefaultText>
            <BoldText style={styles.elapsedTime}>
                {hour}
                <DefaultText style={styles.timeUnit}> hr</DefaultText>
                {' '}{min}
                <DefaultText style={styles.timeUnit}> min</DefaultText>
                {' '}{sec}
                <DefaultText style={styles.timeUnit}> sec</DefaultText>
            </BoldText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ItemSummaryCard: {
        flex: 1,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.d3,
    },
    date: {
        fontSize: 16,
        color: Colors.l2,
        marginBottom: 8,
    },
    elapsedTime: {
        fontSize: 25,
        marginLeft: 5,
    },
    timeUnit: {
        marginLeft: 1,
        fontSize: 20
    }
})

export default ItemSummaryCard
