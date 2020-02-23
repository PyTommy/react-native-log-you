import React from 'react'

import Center from './Center';
import BoldText from './BoldText';
import Colors from '../../constants/Colors';

/**
 * Return centered text which will be used for telling emptiness.
 * @param {object} props - react props 
 * @property {string} children - Text to be shown
 * @property {string} color - Text color (default: Colors.l2)
 * @property {number} fontSize - default: 16
 * @property {object} style
 */
const NotFound = props => {
    const style = {
        ...props.style,
        color: props.color || Colors.l2,
        fontSize: props.fontSize || 16,
    };

    return (
        <Center>
            <BoldText
                style={{
                    ...style,
                }}>
                {props.children}
            </BoldText>
        </Center>
    )
}

export default NotFound

