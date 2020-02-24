import React from 'react'
import { View, TextInput } from 'react-native'

import Colors from '../../constants/Colors';


/**
 * 
 * @param {object} props
 * Properties
 * @property {string} identifier  - Passed as first param of onChangeText.
 * @property {function} onChangeText - Identifier, value, isValid will be passed as param.
 * @property {string|number} initialValue  - default: '' (default: '')
 * @property {boolean} initiallyValid  - default: true
 * @prop {object} restTextInputProps - Spread this props as attribute of textInput
 * Validation
 * @property {boolean} required  
 * @property {boolean} numeric - Only /[0-9]/ are allowed inside textInput.   
 * @property {boolean} min - Minimum number.  
 * @property {boolean} max - Maximum number.
 * Styles
 * @property {string} width - 100%
 * @property {string} backgroundColor - Colors.l1
 * @property {number} fontSize - 20
 * @property {string} color - Colors.d4
 * @property {number} paddingHorizontal - 5
 * @property {number} paddingVertical -10
 */
const Input = (props) => {
    const {
        identifier = null,
        value = '',
        onChangeText = () => { },
        restTextInputProps = {},
        required = false,
        min = null,
        max = null,
        numeric = false,
        width = '100%',
        backgroundColor = Colors.l1,
        fontSize = 20,
        color = Colors.d4,
        paddingHorizontal = 5,
        paddingVertical = 10,
    } = props;


    const textChangeHandler = text => {
        // Validity
        if (numeric != null) {
            text = text.replace(/[^0-9]/g, '');
        }
        let isValid = true;
        if (required && text.trim().length === 0) {
            isValid = false;
        }
        if (min != null && +text < min) {
            isValid = false;
        }
        if (max != null && +text > max) {
            isValid = false;
        }

        onChangeText(identifier, text, isValid);
    };

    const styles = {
        formControl: {
            alignItems: 'center',
            justifyContent: 'start',
            borderRadius: 5,
            width: width,
            backgroundColor: backgroundColor,
        },
        input: {
            fontSize: fontSize,
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            color: color,
        }
    };

    return (
        <View style={{ ...styles.formControl }}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={textChangeHandler}
                {...restTextInputProps}
            />
        </View>
    )
}



export default Input
