import React, { useState, } from 'react';
import { View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";



import * as db from './db/db';
import store from './store/configStore';
import AppNavigator from './navigation/AppNavigator';
import InitApp from './InitAppComponent';
import ErrorHandler from './ErrorHandler';

db.init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.error(err);
  });


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    });
  };


  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }



  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <InitApp />
        <AppNavigator />
        <ErrorHandler />
        <FlashMessage position="top" />
      </Provider>
    </View>
  );
}

