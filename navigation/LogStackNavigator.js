import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DayLogScreen from '../screens/DayLogScreen';
import ItemLogScreen from '../screens/ItemLogScreen';
import EditDayLogScreen from '../screens/EditDayLogScreen';
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
                name="ItemLog"
                component={ItemLogScreen}
                options={{
                    headerTitle: 'Study',
                }}
            />
            <Stack.Screen
                name="EditDayLog"
                component={EditDayLogScreen}
                options={{
                    headerTitle: "Edit Day Log",
                }}
            />
        </Stack.Navigator>
    );
};

export default LogStackNavigator;