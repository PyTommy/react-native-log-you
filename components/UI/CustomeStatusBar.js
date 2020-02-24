import React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * Returns customized StatusBar
 * @prop {string} backgroundColor 
 */
const CustomStatusBar = props => {
    const {
        backgroundColor = Colors.d3,
        ...rest
    } = props;

    const height = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    return (
        <View style={{ height, backgroundColor }}>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor={backgroundColor}
                {...rest}
            />
        </View>
    );
};

export default CustomStatusBar;