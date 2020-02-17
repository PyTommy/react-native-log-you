import React from 'react'
import { View, StyleSheet, Button } from 'react-native'

import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const DayLogScreen = props => {
    return (
        <View style={styles.screen}>
            <DefaultText>DayLogScreen</DefaultText>
            <Button
                title="ItemLog"
                onPress={() => {
                    props.navigation.navigate('ItemLog');
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})


export default DayLogScreen
