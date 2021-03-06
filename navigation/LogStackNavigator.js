import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DayLogScreen from '../screens/DayLogScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

function LogStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: Colors.l1,
                    fontSize: 20
                },
                headerBackTitle: 'Back',
                headerTintColor: Colors.l2
            }}
        >
            <Stack.Screen
                name="DayLog"
                component={DayLogScreen}
            />
            <Stack.Screen
                name="Categories"
                component={CategoriesScreen}
                options={({ route }) => ({
                    headerTitle: route.params.category,
                    headerTitleStyle: { fontSize: 20, color: Colors[route.params.category] }
                })}
            />
        </Stack.Navigator>
    );
};

export default LogStackNavigator;