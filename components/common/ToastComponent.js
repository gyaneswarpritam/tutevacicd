import React from 'react';
import {ToastAndroid, AlertIOS} from 'react-native';

const ToastComponent = () => {
  if (Platform.OS === 'android') {
    return ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    return AlertIOS.alert(msg);
  }
};

export default ToastComponent;
