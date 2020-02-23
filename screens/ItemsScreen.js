import React from 'react'
import { View, StyleSheet } from 'react-native'

import ItemSummaryList from '../components/ItemSummaryList';

const ItemLogScreen = props => {
    const title = props.route.params.title;


    return (
        <View style={styles.screen}>
            <ItemSummaryList title={title} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})


export default ItemLogScreen
