import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/Colors';
import BoldText from './UI/BoldText';
import UIButton from './UI/Button';
import LogItem from './LogItem';


const LogList = props => {
    return (
        <View style={styles.LogList}>
            <View style={styles.header}>
                <BoldText style={styles.headerTitle}>Log</BoldText>
                <UIButton
                    title='EDIT'
                    onPress={() => { }}
                    height={25}
                    width={70}
                    style={{ borderWidth: 1.5, borderColor: Colors.l3, backgroundColor: 'transparent' }}
                    textColor={Colors.l3}
                />
            </View>
            <View style={styles.logItemsContainer}>
                <LogItem
                    log={{ elapsedTime: 3500, startAt: new Date(), stopAt: new Date(), title: 'Study' }}
                />
                <LogItem
                    log={{ elapsedTime: 3980, startAt: new Date(), stopAt: new Date(), title: 'Meditation' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    LogList: {
        marginTop: 30,
        backgroundColor: Colors.d2,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: Colors.l2,
    }
})


export default LogList
