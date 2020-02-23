import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'

import Colors from '../constants/Colors';
import BoldText from './UI/BoldText';
import UIButton from './UI/Button';
import LogRow from './LogRow';
import Centered from './UI/Center';



const LogList = props => {
    const [editing, setEditing] = useState(false);

    // Finish editing when selected date change.
    const { isoSelectedDate } = props;
    useEffect(() => {
        if (editing) setEditing(() => false);
    }, [isoSelectedDate]);


    let logItems;
    if (props.logs && props.logs.length !== 0) {
        logItems = (
            <FlatList
                data={props.logs}
                keyExtractor={item => item.id.toString()} // not number!!
                renderItem={({ item }) => (
                    <LogRow log={item} editing={editing} />
                )}
            />
        );
    }

    if (!logItems) {
        return (
            <Centered style={styles.LogList}>
                {props.logs
                    ? <BoldText style={styles.notFound}>Logs Not found</BoldText>
                    : <ActivityIndicator color={Colors.l2} size={20} /> // logs are not loaded yet.
                }
            </Centered>
        );
    }

    return (
        <View style={styles.LogList}>
            <View style={styles.header}>
                <BoldText style={styles.headerTitle}>Log</BoldText>
                <UIButton
                    title={editing ? 'Finish Editing' : 'EDIT'}
                    onPress={() => setEditing(prevState => !prevState)}
                    height={25}
                    width={'auto'}
                    style={styles.editButton}
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
        paddingTop: 15,
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
    },
    editButton: {
        borderWidth: 1.5,
        borderColor: Colors.l3,
        backgroundColor: 'transparent',
        paddingHorizontal: 10
    },
    notFound: {
        fontSize: 16,
        color: Colors.l2
    },
})


export default LogList
