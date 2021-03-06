import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import LogStackNavigator from './LogStackNavigator';
import StopwatchScreen from '../screens/StopwatchScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const DefaultTabBarIcon = ({ focused }, route) => {
    let iconName;

    if (route.name === 'Stopwatch') {
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
                name="Stopwatch"
                component={StopwatchScreen} />
            <Tab.Screen
                name="Log"
                component={LogStackNavigator} />
            <Tab.Screen
                name="Setting"
                component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;