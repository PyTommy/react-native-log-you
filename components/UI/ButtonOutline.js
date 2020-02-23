import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import DefaultText from './DefaultText';
import BoldText from './BoldText';

import Colors from '../../constants/Colors';

/**
 * Customized button outlined component
 * @property {function} onPress
 * @property {string} title - button text
 * 
 * Properties for style 
 * @property {object} style - style for the box.
 * @property {object} textStyle - style for the text.
 * @property {boolean} bold - font weight 
 * @property {string} color - border and text color 
 * @property {number} borderWidth
 * @property {number} height - height of the box
 * @property {number} width - width of the box
 * @property {number} paddingVertical
 * @property {number} paddingHorizontal
 * @property {number} fontSize - font size
 */
const ButtonOutline = (props) => {

    const boxStyle = {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: props.paddingVertical || 5,
        paddingHorizontal: props.paddingHorizontal || 10,

        borderColor: props.color || Colors.primary,
        borderWidth: props.borderWidth || 1.5,
        borderRadius: 3,

        height: props.height || 'auto',
        width: props.width || 'auto',

        ...props.style
    }
    const textStyle = {
        color: props.color || Colors.primary,
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

export default ButtonOutline
