import React from 'react'
import { View, StyleSheet } from 'react-native'

import DaySummaryCategoryCard from './DaySummaryCategoryCard';

const DaySummary = props => {
    const { summary = {}, navigation } = props;

    const { Study, Meditation, Sports, Eating } = summary;

    const onPressHandler = (category) => {
        navigation.navigate('Categories', { category });
    };

    return (
        <View style={styles.DaySummary}>
            <DaySummaryCategoryCard
                onPress={() => onPressHandler('Study')}
                category={'Study'}
                elapsedTime={Study}
                iconName='book-open-page-variant'
            />
            <DaySummaryCategoryCard
                onPress={() => onPressHandler('Meditation')}
                category={'Meditation'}
                elapsedTime={Meditation}
                iconName='heart-pulse'
            />
            <DaySummaryCategoryCard
                onPress={() => onPressHandler('Sports')}
                category={'Sports'}
                elapsedTime={Sports}
                iconName='run'
            />
            <DaySummaryCategoryCard
                onPress={() => onPressHandler('Eating')}
                category={'Eating'}
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
