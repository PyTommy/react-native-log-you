import React from 'react'
import { View, StyleSheet } from 'react-native'

import BoldText from './UI/BoldText';
import Input from './UI/Input';
import DefaultText from './UI/DefaultText';
import Colors from '../constants/Colors';

/**
 * 
 * @prop {string} title - title of the setting item. 
 * @prop {string} explanation - explanation of the setting
 * @prop {string} invalidMessage
 * @prop {string|number} value  - default: '' (default: '')
 * @prop {boolean} isValid - default: true
 * @prop {string|number} identifier - Passed as first param of onChangeText.
 * @prop {function} onChangeText - Identifier, value and isValid will be passed!! 
 * @prop {object} restTextInputProps - Spread this props as attribute of textInput
 * @prop {number | string} width - width of textInput
 * Validation
 * @prop {number} min - minimum number of textInput
 * @prop {number} max - maximum number of textInput
 * @prop {boolean} required - maximum number of textInput
 */
const SettingWithText = props => {
    const {
        title = '',
        invalidMessage = 'Input is invalid!!',
        width = 80,
        identifier = '',
        value = '',
        isValid = true,
        onChangeText,
        required = false,
        numeric = false,
        min = null,
        max = null,
        explanation = '',
        restTextInputProps = {}
    } = props;

    return (
        <View style={styles.formGroup}>
            <View style={styles.inputContainer}>
                <BoldText style={styles.title}>{title}</BoldText>
                <Input
                    value={value}
                    identifier={identifier}
                    onChangeText={onChangeText}
                    width={width}
                    required={required}
                    numeric={numeric}
                    min={min}
                    max={max}
                    restTextInputProps={restTextInputProps}
                />
            </View>
            {isValid ? (
                <DefaultText style={styles.explanation}>
                    {explanation}
                </DefaultText>
            ) : (
                    <DefaultText style={{ ...styles.explanation, color: Colors.danger }}>
                        {invalidMessage}
                    </DefaultText>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 20,
    },
    inputContainer: {
        padding: 15,
        backgroundColor: Colors.d3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 25,
    },
    explanation: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: 15,
        color: Colors.l2,
    }
})


export default SettingWithText
