import React from 'react'
import { View, StyleSheet } from 'react-native'
import moment from 'moment';

import BoldText from './UI/BoldText';
import Colors from '../constants/Colors';

const LogItem = props => {
    const { elapsedTime, title, startAt, stopAt } = props.log;
    return (
        <View
            style={styles.LogItem}>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.title }}>
                {title}
            </BoldText>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.between }}>
                {moment(startAt).format('HH:mm')} - {moment(stopAt).format('HH:mm')}
            </BoldText>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.elapsedTime }}>
                {Math.floor(elapsedTime / 60)} min
            </BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    LogItem: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    text: {
        color: Colors.l2,
        fontSize: 15
    },
    title: {
        marginLeft: 2,
        width: 90,
    },
    between: {

    },
    elapsedTime: {
        flexGrow: 1,
        textAlign: 'right',
    },
})


export default LogItem
