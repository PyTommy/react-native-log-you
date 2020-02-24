import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import Header from './UI/CustomHeader';
import Colors from '../constants/Colors';
import DefaultText from './UI/DefaultText';
import BoldText from './UI/BoldText';
import UIButtonText from '../components/UI/ButtonText';

/**
 * 
 * @prop {function} onSave 
 */
const SettingHeader = props => {
    const {
        onSave
    } = props;


    const centerComponent = (
        <BoldText style={styles.headerTitle}>Setting</BoldText>
    );

    const rightComponent = (
        <UIButtonText
            style={styles.headerRight}
            title='SAVE'
            fontSize={19}
            onPress={onSave}
        />
    );

    return (
        <Header
            centerComponent={centerComponent}
            rightComponent={rightComponent}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
    },
    headerRight: {
        marginRight: 10,
    }
})


export default SettingHeader
