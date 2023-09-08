import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Keyboard } from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import Input from './../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { NotifyMessage } from '../common/NotifyMessage';
import AppbarViewComponent from '../common/AppbarViewComponent';
import SubmitButton from '../common/SubmitButton';
import { useTheme } from '@react-navigation/native';
import { tutorProfileUpdate } from '../../store/features/tutorCourse/tutorProfileSlice';

const TutorEditSocialScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { signupData } = useSelector(
    state => state.commonData,
  );
  const { isSuccess, isError } = useSelector(state => state.auth);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    twitter: '',
    facebook: '',
    linkedin: '',
  });

  useEffect(() => {
    if (profile) {
      setInputs({
        twitter: profile?.social?.twitter,
        facebook: profile?.social?.facebook,
        linkedin: profile?.social?.linkedin,
      });
    }
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;

    // if (checked) {
    //   valid = true;
    // } else {
    //   valid = false;
    //   NotifyMessage('Please acknowledge the infomation');
    // }
    if (valid) {
      const tutorDetails = {};
      tutorDetails.email = signupData.email;
      tutorDetails.password = signupData.password;
      tutorDetails.type = signupData.role;
      tutorDetails.personalDetails = signupData;
      tutorDetails.location = signupData.location;
      tutorDetails.experience = signupData.teachingWayDetails;
      tutorDetails.social = inputs;

      dispatch(tutorProfileUpdate(tutorDetails));
      if (isError) {
        return false;
      }
      navigation.navigate('ProfileCreatedSuccess', { message: 'created' })
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
        <AppbarViewComponent title={'Add Teacher'} icon={"arrow-left-thin-circle-outline"}
          navigatePressed={() => navigation.goBack()} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={Styles.content}>
            {/* <PointLabel number={4} title={'Social Details'} /> */}
            <Input
              label="Twitter"
              placeholder="Twitter link here"
              onChangeText={text => handleOnChange(text, 'twitter')}
              value={inputs.twitter}
              error={errors.twitter}
              onFocus={() => {
                handleError(null, 'twitter');
              }}
            />
            <Input
              label="Facebook"
              placeholder="Facebook link here"
              onChangeText={text => handleOnChange(text, 'facebook')}
              error={errors.facebook}
              value={inputs.facebook}
              onFocus={() => {
                handleError(null, 'facebook');
              }}
            />
            <Input
              label="Linkedin"
              placeholder="Linkedin link here"
              onChangeText={text => handleOnChange(text, 'linkedin')}
              error={errors.linkedin}
              value={inputs.linkedin}
              onFocus={() => {
                handleError(null, 'linkedin');
              }}
            />
            {/* <View style={Styles.checkbox}>
              <Checkbox
                color={'#707070'}
                uncheckedColor={'#707070'}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={Styles.agreeTxt}>
                {
                  'I hereby declare that the information\nfurnished is true, complete and\ncorrect to the best of my knowledge\nand belief.'
                }
              </Text>
            </View> */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <SubmitButton title="UPDATE NOW" onPress={validate} buttonWidth={198}
                bgColor={'#222222'} btnTextColor={colors.primary}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#F6F6F6',
    padding: 5,
    borderRadius: 4,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  agreeTxt: {
    marginTop: 5,
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 18,
    color: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default TutorEditSocialScreen;
