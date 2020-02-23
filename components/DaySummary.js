import React from 'react'
import { View, StyleSheet } from 'react-native'

import ItemCard from './ItemCard';

const DaySummary = props => {
    const { summary = {}, navigation } = props;

    const { Study, Meditation, Sports, Eating } = summary;

    const onPressHandler = (title) => {
        navigation.navigate('Items', { title });
    };

    return (
        <View style={styles.DaySummary}>
            <ItemCard
                onPress={() => onPressHandler('Study')}
                title={'Study'}
                elapsedTime={Study}
                iconName='book-open-page-variant'
            />
            <ItemCard
                onPress={() => onPressHandler('Meditation')}
                title={'Meditation'}
                elapsedTime={Meditation}
                iconName='heart-pulse'
            />
            <ItemCard
                onPress={() => onPressHandler('Sports')}
                title={'Sports'}
                elapsedTime={Sports}
                iconName='run'
            />
            <ItemCard
                onPress={() => onPressHandler('Eating')}
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
