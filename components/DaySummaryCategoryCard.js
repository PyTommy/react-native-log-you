import React from 'react'

import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import { secondToNumberHMSArray } from '../utils/convertSecond';
import Colors from '../constants/Colors';
import DefaultText from './UI/DefaultText';
import BoldText from './UI/BoldText';


const ItemCard = props => {
    const { category, elapsedTime, iconName } = props;
    let hour, min;

    if (typeof elapsedTime !== 'number') {
        hour = min = '-';
    } else {
        [hour, min] = secondToNumberHMSArray(elapsedTime);
        if (hour.toString().length === 1) {
            hour = ' ' + hour;
        }
        if (min.toString().length === 1) {
            min = ' ' + min;
        }
    }



    return (
        <TouchableOpacity onPress={props.onPress} style={styles.ItemCard}>
            <View
                style={{
                    ...styles.iconContainer,
                    backgroundColor: Colors[category]
                }}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={50}
                    color={Colors.l1}
                />
            </View>
            <View style={styles.content}>
                <View>
                    <DefaultText style={styles.category}>{category}</DefaultText>
                    <BoldText style={styles.elapsedTime}>
                        {hour}
                        <DefaultText style={styles.timeUnit}> hr</DefaultText>
                        {' '}{' '}{min}
                        <DefaultText style={styles.timeUnit}> min</DefaultText>
                    </BoldText>
                </View>
                <Ionicons
                    name='ios-arrow-forward'
                    size={30}
                    color={Colors.l2}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ItemCard: {
        padding: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.d3,
    },
    iconContainer: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
    },
    content: {
        marginHorizontal: 20,
        flexDirection: 'row',
        flexGrow: 1,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        fontSize: 16,
        color: Colors.l2,
        marginBottom: 8,
    },
    elapsedTime: {
        fontSize: 25,
        marginLeft: 5,
    },
    timeUnit: {
        marginLeft: 1,
        fontSize: 20
    }
})

export default ItemCard
