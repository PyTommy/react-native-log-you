import React from 'react'
import { View, StyleSheet, Button } from 'react-native'

import DefaultText from '../components/UI/DefaultText';
import BoldText from '../components/UI/BoldText';

const ItemLogScreen = props => {
    return (
        <View style={styles.screen}>
            <DefaultText>ItemLogScreen</DefaultText>
            <Button
                title='EditDayLogScreen'
                onPress={() => {
                    props.navigation.navigate('EditDayLog')
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})


export default ItemLogScreen
