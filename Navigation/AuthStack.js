import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentProfileScreen from '../components/Student/StudentProfileScreen';
import TutorProfileScreen from '../components/Tutor/TutorProfileScreen';
import TutorExperienceScreen from '../components/Tutor/TutorExperienceScreen';
import TutorSocialScreen from '../components/Tutor/TutorSocialScreen';

import HomeScreen from '../components/HomeScreen';
import MapComponent from '../components/common/MapComponent';
import CommonFilterScreen from '../components/Student/CommonFilterScreen';
import LoginScreen from '../components/LoginScreen';
import AddKidScreen from '../components/Student/AddKidScreen';
import CourseDetailsScreen from '../components/CourseDetailsScreen';
import SignUpScreen from '../components/SignupScreen';
import SearchListScreen from '../components/SearchListScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchList" component={SearchListScreen} />
      <Stack.Screen name="CommonFilter" component={CommonFilterScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="TutorProfile" component={TutorProfileScreen} />
      <Stack.Screen name="TutorExperience" component={TutorExperienceScreen} />
      <Stack.Screen name="TutorSocial" component={TutorSocialScreen} />
      <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
      <Stack.Screen name="AddKid" component={AddKidScreen} />
      <Stack.Screen name="Map" component={MapComponent} />
      {/* <Stack.Screen name="SignupSuccess" component={SignupSuccess} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
