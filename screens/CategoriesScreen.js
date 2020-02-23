import React from 'react'
import { View, StyleSheet } from 'react-native'

import Category from '../components/CategoryList';

const ItemLogScreen = props => {
    const category = props.route.params.category;

    return (
        <View style={styles.screen}>
            <Category category={category} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})


export default ItemLogScreen
