import React from 'react';
import { Platform, ToastAndroid, AlertIOS } from 'react-native';

export function NotifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};