import React, { useRef, useState } from 'react';
import { ScrollView, View, Keyboard } from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import PointLabel from './../common/PoinLabel';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Appbar, Text } from 'react-native-paper';
import Input from './../common/Input';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentPassword } from '../../store/features/studentCourse/studentProfileSlice';

const StudentResetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { profile, isError, isSuccess, message } = useSelector(
    state => state.tutorProfile,
  );
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.oldPassword) {
      handleError('Old Password is required', 'oldPassword');
      valid = false;
    }
    if (!inputs.newPassword) {
      handleError('New Password is required', 'newPassword');
      valid = false;
    }
    if (!inputs.confirmPassword) {
      handleError('Confirm Password is required', 'confirmPassword');
      valid = false;
    }
    if (inputs.confirmPassword != inputs.confirmPassword) {
      handleError('Confirm Password is not matched', 'confirmPassword');
      valid = false;
    }

    if (inputs.oldPassword && inputs.newPassword && inputs.confirmPassword) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      dispatch(
        updateStudentPassword({
          editId: user._id,
          data: {
            password: inputs.oldPassword,
            currentPassword: inputs.newPassword,
          },
        }),
      );
      if (isSuccess) {
        navigation.navigate('TutorExperience');
      }
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <>
      <View style={OnboardingStyles.container}>
        <Appbar.Header style={MainStyleSheet.navBar}>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.navigate('StudentDashboard')}
          />
          <Appbar.Content title="Reset Password" />
        </Appbar.Header>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
          <View
            style={{ paddingHorizontal: 25, marginBottom: 100, marginTop: 25 }}>
            <Input
              label="Old Password"
              placeholder="Enter Old Password"
              onChangeText={text => handleOnChange(text, 'oldPassword')}
              error={errors.oldPassword}
              password
              onFocus={() => {
                handleError(null, 'oldPassword');
              }}
            />
            <Input
              label="New Password"
              placeholder="Enter New Password"
              onChangeText={text => handleOnChange(text, 'newPassword')}
              error={errors.newPassword}
              password
              onFocus={() => {
                handleError(null, 'newPassword');
              }}
            />
            <Input
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              onChangeText={text => handleOnChange(text, 'confirmPassword')}
              error={errors.confirmPassword}
              password
              onFocus={() => {
                handleError(null, 'confirmPassword');
              }}
            />
          </View>
        </ScrollView>
      </View>
      <Grid style={OnboardingStyles.footerBtn}>
        <Col>
          <Button
            onPress={() => validate()}
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={OnboardingStyles.nextBtn}>
            Update Password
          </Button>
        </Col>
      </Grid>
    </>
  );
};

export default StudentResetPassword;
