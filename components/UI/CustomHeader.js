import React from 'react';
import {
    View,
    Platform,
} from 'react-native';
import Colors from '../../constants/Colors'

import StatusBar from './CustomeStatusBar';

/**
 * Returns customized header
 * @prop {string} backgroundColor 
 * @prop {component} leftComponent 
 * @prop {component} centerComponent 
 * @prop {component} rightComponent 
 */
const Header = props => {
    const {
        leftComponent,
        centerComponent,
        rightComponent,
        backgroundColor = Colors.d3,
    } = props;

    const HeaderHight = Platform.OS === 'ios' ? 48 : 60;

    const styles = {
        header: {
            backgroundColor: backgroundColor,
            height: HeaderHight,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: 'green'
        },
        rightContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
    };

    return (
        <View>
            <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
            <View style={styles.header}>
                <View style={styles.leftContainer}>{leftComponent}</View>
                {centerComponent}
                <View style={styles.rightContainer}>{rightComponent}</View>
            </View>
        </View>
    );
};



export default Header;