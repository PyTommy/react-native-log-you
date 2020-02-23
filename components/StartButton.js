import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { secondToStringHHMMSSArray } from '../utils/convertSecond';
import Colors from '../constants/Colors';
import BoldText from './UI/BoldText';

const StartButton = props => {
    const [hour, min, sec] = secondToStringHHMMSSArray(props.elapsedTime);
    const timeString = `${hour}:${min}:${sec}`;

    const activeColor = Colors[props.category];

    return (
        <TouchableOpacity
            style={{
                ...styles.startButton,
                backgroundColor: props.active ? activeColor : Colors.d1,
                borderColor: Colors[props.category],
            }}
            onPress={props.onPress}>
            <BoldText
                style={{
                    ...styles.category,
                    color: props.active ? Colors.l1 : activeColor
                }}>
                {props.category}
            </BoldText>
            <BoldText
                style={{
                    ...styles.elapsedTime,
                    color: props.active ? Colors.l1 : activeColor
                }}>
                {timeString}
            </BoldText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    startButton: {
        width: '40%',
        height: "40%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 2,
        marginBottom: "5%",
        backgroundColor: Colors.d3
    },
    category: {
        fontSize: 25,
        marginBottom: 7,
    },
    elapsedTime: {
        fontSize: 20,
    }
})


export default StartButton
