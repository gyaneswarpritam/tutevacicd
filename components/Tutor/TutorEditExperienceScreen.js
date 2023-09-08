import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Input from './../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../common/Loader';
import AppbarViewComponent from '../common/AppbarViewComponent';
import SubmitButton from '../common/SubmitButton';
import { ButtonArrow } from '../../assets/images';
import { signupStoreData } from '../../store/features/common/commonSlice';
import Textarea from '../common/Textarea';

const TutorEditExperienceScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const dispatch = useDispatch();
  const { signupData } = useSelector(
    state => state.commonData,
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    teachingWayDetails: '',
    profession: '',
  });

  useEffect(() => {
    if (profile) {
      setInputs({
        teachingWayDetails: profile?.personalDetails?.teachingWayDetails,
        profession: profile?.personalDetails?.profession,
      });
    }
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.teachingWayDetails) {
      handleError(
        'Details of Way of learning is required',
        'teachingWayDetails',
      );
      valid = false;
    }
    if (!inputs.profession) {
      handleError('Profession is required', 'profession');
      valid = false;
    }
    if (
      inputs.teachingWayDetails &&
      inputs.profession
    ) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      const newSignupData = { ...signupData, ...inputs }
      dispatch(signupStoreData(newSignupData))
      navigation.navigate('TutorEditSocial', { profile: profile });
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
      <SafeAreaView style={{ flex: 1 }}>
        <AppbarViewComponent title={'Add Teacher'} icon={"arrow-left-thin-circle-outline"}
          navigatePressed={() => navigation.goBack()} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Loader />
          ) : (
            <View
              style={{ paddingHorizontal: 25, marginBottom: 100, marginTop: 25 }}>
              {/* <PointLabel number={2} title={'Experience'} /> */}
              <Input
                label="Profession"
                placeholder="Enter Profession"
                onChangeText={text => handleOnChange(text, 'profession')}
                error={errors.profession}
                value={inputs.profession}
                onFocus={() => {
                  handleError(null, 'profession');
                }}
              />
              <Row>
                <Col size={100}>
                  <Textarea
                    label="Tell us about your way of teaching"
                    placeholder="Tell us about your way of teaching"
                    onChangeText={text => handleOnChange(text, 'teachingWayDetails')}
                    value={inputs.teachingWayDetails}
                    error={errors.teachingWayDetails}
                    onFocus={() => {
                      handleError(null, 'teachingWayDetails');
                    }}
                  />
                </Col>
              </Row>
              {errors.teachingWayDetails && !inputs.teachingWayDetails && (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  {errors.teachingWayDetails}
                </Text>
              )}
              <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <SubmitButton title="Click to Proceed" onPress={validate} buttonWidth={198}
                  icon={<ButtonArrow />}
                />
              </View>
            </View>
          )}
          {/* <Grid style={OnboardingStyles.footerBtn}>
            <Col>
              <Button
                mode={'outlined'}
                uppercase={false}
                labelStyle={{color: '#000000', fontSize: 18}}
                style={OnboardingStyles.cancelBtn}
                onPress={() => navigation.navigate('TutorProfile')}>
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() => validate()}
                uppercase={false}
                labelStyle={{color: '#FFFFFF', fontSize: 18}}
                style={OnboardingStyles.nextBtn}>
                Next
              </Button>
            </Col>
          </Grid> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  imgUploadView: {
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'dashed',
    marginTop: 25,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  docView: {
    height: 56,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 25,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 5,
  },
  dropdownText2: {
    color: '#000000',
    fontSize: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 5,
  },
  boder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
  },
  radioStyle: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

const multiSelectStyles = StyleSheet.create({
  dropdown: {
    height: 55,
    backgroundColor: 'transparent',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 25,
    paddingLeft: 14,
    paddingRight: 10,
  },
  dropdown2: {
    height: 55,
    backgroundColor: 'transparent',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 14,
    paddingRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  selectedStyle: {
    borderRadius: 50,
    backgroundColor: '#FFD9CF',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
});

export default TutorEditExperienceScreen;
