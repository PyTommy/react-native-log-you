import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import StopWatchScreen from '../screens/StopWatchScreen';
import DayLogScreen from '../screens/DayLogScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const DefaultTabBarIcon = ({ focused }, route) => {
    let iconName;

    if (route.name === 'StopWatch') {
        iconName = 'ios-time'
    } else if (route.name === 'Log') {
        iconName = 'ios-paper'
    } else if (route.name === 'Setting') {
        iconName = 'ios-settings';
    }

    return (
        <Ionicons
            name={iconName}
            size={25}
            color={focused ? Colors.l1 : Colors.l3}
        />
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                cardStyle: { backgroundColor: 'blue' },
                tabBarIcon: (navData) => DefaultTabBarIcon(navData, route)
            })}
            tabBarOptions={{
                activeTintColor: Colors.l1,
                inactiveTintColor: Colors.l3,
            }}
        >
            <Tab.Screen
                name="StopWatch"
                component={StopWatchScreen}
                options={{ cardStyle: { backgroundColor: 'blue' } }} />
            <Tab.Screen
                name="Log"
                component={DayLogScreen} />
            <Tab.Screen
                name="Setting"
                component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;