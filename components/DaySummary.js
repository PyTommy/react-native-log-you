import React from 'react'
import { View, StyleSheet } from 'react-native'

import ItemCard from './ItemCard';

const DaySummary = props => {
    const summary = props.summary || {};
    const { Study, Meditation, Sports, Eating } = summary;

    return (
        <View style={styles.DaySummary}>
            <ItemCard
                onPress={() => { }}
                title={'Study'}
                elapsedTime={Study}
                iconName='book-open-page-variant'
            />
            <ItemCard
                onPress={() => { }}
                title={'Meditation'}
                elapsedTime={Meditation}
                iconName='heart-pulse'
            />
            <ItemCard
                title={'Sports'}
                elapsedTime={Sports}
                iconName='run'
            />
            <ItemCard
                title={'Eating'}
                elapsedTime={Eating}
                iconName='silverware-fork-knife'
            />
        </View>
    )
};

const styles = StyleSheet.create({
    DaySummary: {

    },
})


export default DaySummary
