import React from 'react'
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native'

import Colors from '../constants/Colors';
import BoldText from './UI/BoldText';
import UIButton from './UI/Button';
import LogItem from './LogItem';


const LogList = props => {
    if (!props.logs || props.logs.length === 0) return null;

    const logItems = (
        <FlatList
            // contentContainerStyle={styles.logItemsContainer}
            data={props.logs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <LogItem
                    log={item}
                />
            )} />
    );

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
            {logItems}
        </View>
    )
}

const styles = StyleSheet.create({
    LogList: {
        flex: 1,
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
