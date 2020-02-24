import React, { useState } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { dateGenerator } from '../utils/dateGenerator';
import { fetchSummariesWithLimit } from '../store/actions/index';
import CategoryCard from './CategoryCard';
import NotFound from './UI/NotFound';
import Colors from '../constants/Colors';

const ItemSummaryList = props => {
    const category = props.category;

    const summaries = useSelector(state => state.summaries);
    const isoDates = Object.keys(summaries).sort((a, b) => b - a); // newer => older

    const isoToday = dateGenerator(new Date()).toISOString();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const nextFetchedISODate = isoDates[isoDates.length - 1];

    const loadMore = async () => {
        console.log('loadMore start');
        if (!hasMore || loading) return;
        console.log('loadMore continued');

        try {
            const limit = 15;
            setLoading(true);
            const fetchedSummaries = await dispatch(fetchSummariesWithLimit(nextFetchedISODate, limit));
            setLoading(false);
            const fetchedISODatesArray = Object.keys(fetchedSummaries)
                .sort((a, b) => b - a); // newer => older
            if (fetchedISODatesArray.length < limit) {
                setHasMore(() => false);
            }

        } catch (err) {
            console.error(err);
            setLoading(false);
            setHasMore(() => false);
            // @@@ setError and show error message on screen!!
        };
    };

    const data = [];
    isoDates.forEach(isoDate => {
        if (summaries[isoDate][category] <= 0) return null; // No need to render if elapsedTime === 0

        data.push({
            isoDate,
            elapsedTime: summaries[isoDate][category],
        });
    });

    if (data.length === 0) {
        loadMore(); // Should be done when <FlatList/> not rendered (loadMore won't be executed) but there are logs in previous days.
        return <NotFound>No record found</NotFound>;
    }


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={item => item.isoDate}
                renderItem={({ item }) => {
                    return (
                        <CategoryCard
                            elapsedTime={summaries[item.isoDate][category]}
                            isoDate={item.isoDate}
                        />
                    );
                }}
                ListFooterComponent={loading && (
                    <ActivityIndicator
                        color={Colors.primary}
                        size={30}
                        style={{ margin: 15 }}
                    />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.7}
            />
        </View>
    )
}


export default ItemSummaryList
