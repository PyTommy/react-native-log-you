import React from 'react'
import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const BoldText = (props) => {
    return (
        <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-bold',
        color: Colors.l1,
    }
})

export default BoldText;
