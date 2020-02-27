import React, { useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";

import { fetchSummariesWithLimit, fetchSummaries } from '../store/actions/index';
import CategoryCard from './CategoryCard';
import NotFound from './UI/NotFound';
import Center from '../components/UI/Center';


const ItemSummaryList = props => {
    const category = props.category;

    const summaries = useSelector(state => state.summaries);
    const isoDates = Object.keys(summaries).sort((a, b) => new Date(b) - new Date(a)); // newest => oldest
    const dispatch = useDispatch();
    const [loadingBetweens, setLoadingBetweens] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const newestISODate = isoDates[0];
    const oldestISODate = isoDates[isoDates.length - 1];

    // When component did mount, if some dates missing in the existing summary, fetch them.
    // Example) {'01/01':{...}, '01/03':{...}} => {'01/01':{...}, '01/02':{...}, '01/03':{...}}
    useEffect(() => {
        const days = (new Date(newestISODate) - new Date(oldestISODate)) / 24 * 60 * 60 * 1000 - 1;
        const isThereNotLoadedDaysBetween = isoDates.length < days;

        if (isThereNotLoadedDaysBetween) {
            const asyncFunc = async () => {
                try {
                    await dispatch(fetchSummaries(oldestISODate, newestISODate));
                } catch (err) {
                    console.error(err);
                }
                setLoadingBetweens(() => false);
            }
            asyncFunc();
        } else {
            setLoadingBetweens(() => false);
        }
    }, []);


    const loadMore = async () => {
        if (!hasMore || loading) return;

        try {
            setLoading(true);
            const newHasMore = await dispatch(fetchSummariesWithLimit(oldestISODate));
            setLoading(false);

            if (!newHasMore) {
                setHasMore(false);
            }

        } catch (err) {
            console.error(err);
            setLoading(false);
            setHasMore(() => false);
            // @@@ setError and show error message on screen!!
        };
    };



    // Data should be rendered (elapsed time > 0). Formatted as [{isoDate, elapsedTime}]
    const data = [];
    isoDates.forEach(isoDate => {
        if (summaries[isoDate][category] === 0) return null;

        data.push({
            isoDate,
            elapsedTime: summaries[isoDate][category],
        });
    });

    // Show Loading spinner
    if (loadingBetweens) {
        return (
            <Center>
                <ActivityIndicator
                    size={30}
                    style={{ margin: 15 }}
                />
            </Center>
        );
    };

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
                ListFooterComponent={hasMore && (
                    <ActivityIndicator
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
