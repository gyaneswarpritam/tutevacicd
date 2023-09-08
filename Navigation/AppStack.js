import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { NotifictionListener, requestUserPermission } from '../utils/pushnotification_helper';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TutorStack } from './TutorStack';
import { StudentStack } from './StudentStack';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  // return userRole == 'tutor' ? <TutorStack /> : <StudentStack />;
  const { user, userRole } = useSelector(state => state.auth);
  useEffect(() => {
    requestUserPermission(user);
    NotifictionListener();
  }, [])

  return user.type == 'teacher' ? <TutorStack /> : <StudentStack />;
};

export default AppStack;
