import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Colors from '../constants/Colors';
import TabNavigator from './TabNavigator';

const MyTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        background: Colors.d1,
        text: Colors.l1,
        card: Colors.d3,
        border: 'transparent'
    },
};

const AppNavigator = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;