import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/Loader';
import SuccessStack from './SuccessStack';
import { getUserInfoStorage } from '../store/features/auth/authSlice';

const AppNav = ({ routes }) => {
  const dispatch = useDispatch();
  const { user, isLoading, signupSuccess, isError, message } = useSelector(state => state.auth);

  const checkLoggedinUser = useCallback(async () => {
    dispatch(getUserInfoStorage());
  }, []);
  useEffect(() => {
    if (!user) {
      checkLoggedinUser();
    }
  }, [dispatch]);

  const MyTheme = {
    dark: false,
    colors: {
      primary: '#F9B406',
      secondary: '#FFFFFF',
      background: '#FFFBF0',
      card: 'rgb(255, 255, 255)',
      text: '#FFFFFF',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {isLoading ? <Loader /> : user ? <AppStack /> : (signupSuccess ? <SuccessStack /> : <AuthStack />)}
      {/* {user ? <AppStack /> : <AuthStack />} */}
    </NavigationContainer>
  );
};

export default AppNav;
