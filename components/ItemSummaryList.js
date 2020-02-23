import React from 'react'
import { FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import ItemSummaryCard from './ItemSummaryCard';
import NotFound from './UI/NotFound';

const ItemSummaryList = props => {
    const title = props.title;

    const summaries = useSelector(state => state.summaries);
    const isoDates = Object.keys(summaries).sort((a, b) => b - a);

    const data = [];
    isoDates.forEach(isoDate => {
        if (summaries[isoDate][title] <= 0) return null; // No need to render if elapsedTime === 0

        data.push({
            isoDate,
            elapsedTime: summaries[isoDate][title],
        });
    });

    if (data.length === 0) {
        return <NotFound>No record found</NotFound>;
    }


    return (
        <FlatList
            data={data}
            keyExtractor={item => item.isoDate}
            renderItem={({ item }) => {
                return (
                    <ItemSummaryCard
                        elapsedTime={summaries[item.isoDate][title]}
                        isoDate={item.isoDate}
                    />
                );
            }}
        />
    )
}


export default ItemSummaryList
