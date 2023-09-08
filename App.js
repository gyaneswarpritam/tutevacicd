import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import AppNav from './Navigation/AppNav';
import store from './store/store';
import {AppState} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change',async (nextAppState) => {
  //     console.log('nextAppState', nextAppState);
  //     if (nextAppState === 'background') {
  //       console.log('App has come to the foreground!');
  //       await AsyncStorage.clear();
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};
export default App;
