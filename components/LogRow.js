import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import BoldText from './UI/BoldText';
import Colors from '../constants/Colors';
import { deleteLog } from '../store/actions/index';

const LogItem = props => {
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch();
    const { elapsedTime, title, startAt, stopAt } = props.log;

    const onDeleteHandler = () => {
        if (!deleting) {
            const asyncFunc = async () => {
                try {
                    setDeleting(() => true);
                    await dispatch(deleteLog(props.log));
                    setDeleting(() => false);
                } catch (err) {
                    console.error(err);
                }
            };
            asyncFunc();
        }
    };

    return (
        <View
            style={styles.LogItem}>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.title }}>
                {title}
            </BoldText>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.between }}>
                {moment(startAt).format('HH:mm')} - {moment(stopAt).format('HH:mm')}
            </BoldText>
            <BoldText style={{ ...styles.text, color: Colors[title], ...styles.elapsedTime }}>
                {Math.floor(elapsedTime / 60)} min
            </BoldText>
            {props.editing && (
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={onDeleteHandler}
                >
                    <MaterialCommunityIcons
                        name='delete-forever'
                        size={30}
                        color={Colors.l1}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    LogItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
    },
    text: {
        color: Colors.l2,
        fontSize: 15
    },
    title: {
        marginLeft: 2,
        width: 90,
    },
    between: {

    },
    elapsedTime: {
        flexGrow: 1,
        textAlign: 'right',
    },
    deleteButton: {
        backgroundColor: Colors.danger,
        marginLeft: 20,
        padding: 10,
        borderRadius: 1000,
    }
})


export default LogItem
