import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import DefaultText from './DefaultText';
import BoldText from './BoldText';

import Colors from '../../constants/Colors';

/**
 * Customized button component
 * @property {function} onPress
 * @property {string} title - button text
 * 
 * Properties for style 
 * @property {object} style - style for the box.
 * @property {object} textStyle - style for the text.
 * @property {boolean} bold - font weight 
 * @property {string} color - background color 
 * @property {number} height - height of the box
 * @property {number} width - width of the box
 * @property {string} textColor - text color
 * @property {number} fontSize - font size
 */
const Button = (props) => {

    const boxStyle = {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: props.color || Colors.primary,
        height: props.height || 35,
        width: props.width || 100,
        borderRadius: 3,

        ...props.style
    }
    const textStyle = {
        color: props.textColor || 'white',
        fontSize: props.fontSize || 16,

        ...props.textStyle,
    }
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={props.onPress} style={boxStyle}>
                {props.bold
                    ? <BoldText style={textStyle}>{props.title}</BoldText>
                    : <DefaultText style={textStyle}>{props.title}</DefaultText>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Button
