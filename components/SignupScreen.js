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
import { Appbar, Card, Checkbox, RadioButton, Title } from 'react-native-paper';
import MainStyleSheet from '../styleSheet/MainStyleSheet';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './common/Input';
import OnboardingStyles from '../styleSheet/OnboardingStyle';
import SubmitButton from './common/SubmitButton';
import { useTheme } from '@react-navigation/native';
import { AccountPlus, Parent, Student, Teacher } from '../assets/images';
import AppbarViewComponent from './common/AppbarViewComponent';
import { useDispatch } from 'react-redux';
import { signupStoreData } from '../store/features/common/commonSlice';
// import Config from "react-native-config";
const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   fetchStoreData();
  // }, [inputs.role]);

  // const fetchStoreData = async () => {
  //   const userRegisterData = await AsyncStorage.getItem('registerData');
  //   if (userRegisterData) {
  //     setInputs(JSON.parse(userRegisterData));
  //     setChecked(true);
  //   } else {
  //     setInputs(prevState => ({ ...prevState, email: '', password: '' }));
  //     setChecked(false);
  //   }
  // };

  const validate = async () => {
    Keyboard.dismiss();
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

    if (!inputs.role) {
      notifyMessage('Please choose Student/Parent/Teacher.');
      valid = false;
    }

    if (!checked) {
      valid = false;
      notifyMessage('Please read the terms and conditions.');
    }

    if (inputs.email && inputs.password && checked && inputs.role) {
      valid = true;
    }

    if (valid) {
      // await AsyncStorage.setItem('registerData', JSON.stringify(inputs));
      dispatch(signupStoreData(inputs));
      if (inputs.role == 'student' || inputs.role == 'parent') {
        navigation.navigate('StudentProfile');
      } else if (inputs.role == 'teacher') {
        navigation.navigate('TutorProfile');
      }
    }
  };

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };
  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppbarViewComponent title="Sign Up" />
      <ScrollView
        style={[MainStyleSheet.scrollView]}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Grid style={{ paddingHorizontal: 15, paddingTop: 40 }}>
          <Row style={{ paddingBottom: 20 }}>
            <Text style={[MainStyleSheet.fontBoldLato, { fontSize: 17, color: '#222222' }]}>
              How do you wish to identify yourself?
            </Text>
          </Row>
          <Row style={{ paddingBottom: 20 }}>
            <Col size={5}></Col>
            <Col size={30}>
              <View style={{ alignItems: 'center' }}>
                <Student width="40" height="40" />
                <Text style={[styles.radioText, MainStyleSheet.fontBoldQuicksand]}>Student</Text>
                <RadioButton
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="student"
                  status={inputs.role == 'student' ? 'checked' : 'unchecked'}
                  onPress={() => setInputs(prevState => ({ ...prevState, role: 'student' }))}
                />
              </View>
            </Col>
            <Col size={30}>
              <View style={{ alignItems: 'center' }}>
                <Teacher width="40" height="40" />
                <Text style={[styles.radioText, MainStyleSheet.fontBoldQuicksand]}>Teacher</Text>
                <RadioButton
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="teacher"
                  status={inputs.role == 'teacher' ? 'checked' : 'unchecked'}
                  onPress={() => setInputs(prevState => ({ ...prevState, role: 'teacher' }))}
                />
              </View>
            </Col>
            <Col size={30}>
              <View style={{ alignItems: 'center' }}>
                <Parent width="40" height="40" />
                <Text style={[styles.radioText, MainStyleSheet.fontBoldQuicksand]}>Parent</Text>
                <RadioButton
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  value="parent"
                  status={inputs.role == 'parent' ? 'checked' : 'unchecked'}
                  onPress={() => setInputs(prevState => ({ ...prevState, role: 'parent' }))}
                />
              </View>
            </Col>
            <Col size={5}></Col>
          </Row>
        </Grid>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <>
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
            <View style={OnboardingStyles._row}>
              <Checkbox
                color={'#F9B406'}
                uncheckedColor={'#707070'}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={OnboardingStyles.termsText}>
                I agree to Terms of Service
              </Text>
            </View>
            <View style={OnboardingStyles.customBtnContainer}>
              <View style={{ alignItems: 'center' }}>
                <SubmitButton title="Create Account"
                  onPress={validate}
                  buttonWidth={250}
                  icon={<AccountPlus />}
                />
              </View>
              <View style={OnboardingStyles._row}>
                <Text style={{ color: '#5C5B5B', fontFamily: 'Quicksand SemiBold', fontWeight: "400", fontSize: 16 }}>Already a user?</Text>
                <Text style={{ fontSize: 16, paddingLeft: 8, fontWeight: 'bold', color: '#F96D06', fontFamily: 'Quicksand SemiBold' }}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  Login
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  radioText: {
    fontSize: 18,
    marginTop: 5
  },
});

export default SignUpScreen;
