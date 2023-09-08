import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard,
  ToastAndroid,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Appbar, Card, Checkbox, Title } from 'react-native-paper';
import MainStyleSheet from '../styleSheet/MainStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './common/Input';
import OnboardingStyles from '../styleSheet/OnboardingStyle';
import SubmitButton from './common/SubmitButton';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './constants/Config';
import { studentLoginSuccess } from './../store/features/auth/authSlice';
import { useTheme } from '@react-navigation/native';
import { ButtonArrow, Launch_screen } from '../assets/images';
import AppbarViewComponent from './common/AppbarViewComponent';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss();
    setErrorMessage('');
    let valid = true;
    if (!inputs.email) {
      handleError('Email is required', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Should be valid email', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Password is required', 'password');
      valid = false;
    }

    if (inputs.email && inputs.password) {
      valid = true;
    } else {
      valid = false;
    }

    if (valid) {
      studentLogin(inputs);
    }
  };

  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const studentLogin = async useData => {
    try {

      const response = await axios.post(`${BASE_URL}students/login`, {
        email: useData.email,
        password: useData.password,
      });

      if (response) {
        let userInformation = response?.data?.data;
        if (userInformation) {
          await AsyncStorage.setItem(
            'userinfo',
            JSON.stringify(userInformation),
          );
          dispatch(studentLoginSuccess(response.data.data));
        }
      }
    } catch (error) {
      notifyMessage(error.response.data.message);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppbarViewComponent title={'Login'} icon={"arrow-left-thin-circle-outline"}
        navigatePressed={() => navigation.goBack()} />
      <ScrollView
        style={[MainStyleSheet.scrollView]}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingTop: 60 }}>
          <Launch_screen />
        </View>
        <View style={OnboardingStyles.inputConainer}>
          <Input
            label="Email"
            placeholder="Enter Your Email"
            onChangeText={text => handleOnChange(text, 'email')}
            error={errors.email}
            value={inputs.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
          />
          <Input
            label="Password"
            placeholder="Enter Your Password"
            onChangeText={text => handleOnChange(text, 'password')}
            password
            error={errors.password}
            value={inputs.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
          />
        </View>
        <View style={OnboardingStyles.customBtnContainer}>
          <View style={{ alignItems: 'center' }}>
            <SubmitButton title="Login Now" onPress={validate} buttonWidth={198}
              icon={<ButtonArrow />}
            />
          </View>
          <View style={OnboardingStyles._row}>
            <Text style={{ color: '#5C5B5B', fontFamily: 'Quicksand SemiBold', fontWeight: "400", fontSize: 16 }}>
              Don't have account?
            </Text>
            <Text
              style={{ fontSize: 16, paddingLeft: 8, fontWeight: 'bold', color: '#F96D06', fontFamily: 'Quicksand SemiBold' }}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreenStyle = StyleSheet.create({
  homeTextTitle: {
    fontSize: 20,
    color: '#000000',
  },
  homeTextTitle2: {
    fontSize: 16,
    color: '#000000',
  },
  buttonLabel: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  boder: {
    height: 2,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    marginTop: 30,
  },
  butHome: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
