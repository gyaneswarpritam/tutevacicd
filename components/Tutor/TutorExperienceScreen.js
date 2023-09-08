import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TextInput as NewTextInput,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import CompleteBar from './../common/CompleteBar';
import PointLabel from './../common/PoinLabel';
import TagSelect from './../common/TagSelect';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Appbar, RadioButton, Text } from 'react-native-paper';
import Input from './../common/Input';
import DocumentPicker, { types } from 'react-native-document-picker';
import { BASE_URL } from './../constants/Config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { TIMEZONE } from '../../constants/timezones';
import Loader from './../common/Loader';
import AppbarViewComponent from '../common/AppbarViewComponent';
import SubmitButton from '../common/SubmitButton';
import { ButtonArrow } from '../../assets/images';
import { signupStoreData } from '../../store/features/common/commonSlice';

const TutorExperienceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { signupData } = useSelector(
    state => state.commonData,
  );
  // const { industrySkillSpecializationInterestTypes } = useSelector(
  //   state => state.commonData,
  // );
  // const [timeZone, setTimeZoneData] = useState(TIMEZONE);

  // const [selectedResume, setSelectedResume] = useState('');
  const [errors, setErrors] = useState({});
  // const [skillList, setSkillList] = useState([]);
  // const [industryList, setIndustryList] = useState([]);
  // const [specialisationList, setSpecialisationList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    // teachingWay: '',
    teachingWayDetails: '',
    profession: '',
    // skills: '',
    // industry: '',
    // specialisation: '',
    // currentCompany: '',
    // pastCompanies: '',
    // resume: '',
    // timezone: '',
  });

  // useEffect(() => {
  //   fetchStoreData();
  // }, []);

  // const fetchStoreData = async () => {
  //   const userRegisterData = await AsyncStorage.getItem('userExperienceData');
  //   if (userRegisterData) {
  //     const storageData = JSON.parse(userRegisterData);
  //     setInputs(storageData);
  //   }
  // };

  // useEffect(() => {
  //   if (industrySkillSpecializationInterestTypes) {
  //     setIndustryList(
  //       industrySkillSpecializationInterestTypes.filter(
  //         item => item.type == 'industry',
  //       ),
  //     );
  //     const skilListData = industrySkillSpecializationInterestTypes.filter(
  //       item => item.type == 'skill',
  //     );
  //     const skillListValue = skilListData.map(function (item) {
  //       return item['name'];
  //     });
  //     setSkillList(skillListValue);
  //     setSpecialisationList(
  //       industrySkillSpecializationInterestTypes.filter(
  //         item => item.type == 'specialization',
  //       ),
  //     );
  //   }
  // }, []);
  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    // if (!inputs.teachingWay) {
    //   handleError('Way of learning is required', 'teachingWay');
    //   valid = false;
    // }
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
    // if (!inputs.skills) {
    //   handleError('Skills Name is required', 'skills');
    //   valid = false;
    // }
    // if (!inputs.industry) {
    //   handleError('Industry is required', 'industry');
    //   valid = false;
    // }
    // if (!inputs.specialisation) {
    //   handleError('Specialisation is required', 'specialisation');
    //   valid = false;
    // }
    // if (!inputs.currentCompany) {
    //   handleError('Current Company is required', 'currentCompany');
    //   valid = false;
    // }
    // if (!inputs.pastCompanies) {
    //   handleError('Past Companies is required', 'pastCompanies');
    //   valid = false;
    // }
    // if (!inputs.resume) {
    //   handleError('Resume is required', 'resume');
    //   valid = false;
    // }
    // if (!inputs.timezone) {
    //   handleError('Timezone is required', 'timezone');
    //   valid = false;
    // }
    if (
      // inputs.teachingWay &&
      inputs.profession
      // inputs.skills &&
      // inputs.industry &&
      // inputs.specialisation
      // inputs.currentCompany &&
      // inputs.resume &&
      // inputs.timezone
    ) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      const newSignupData = { ...signupData, ...inputs }
      dispatch(signupStoreData(newSignupData))
      // await AsyncStorage.setItem('userExperienceData', JSON.stringify(inputs));
      navigation.navigate('TutorSocial');
    }
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  // const docUpload = (formdata, filename) => {
  //   setLoading(true);
  //   fetch(`${BASE_URL}upload/uploadFile`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formdata,
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       setLoading(false);
  //       setInputs(prevState => ({ ...prevState, resume: json.data }));
  //       setSelectedResume(filename);
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };

  // const chooseFromDoc = response => {
  //   const doc = new FormData();
  //   doc.append('file', {
  //     uri: response[0].uri,
  //     name: response[0].name,
  //     type: response[0].type,
  //   });
  //   docUpload(doc, response[0].name);
  // };

  // const selectedSkills = skillArr => {
  //   setInputs(prevState => ({ ...prevState, skills: skillArr }));
  // };

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
                  <Text style={Styles.dropdownText2}>
                    Tell us about your way of teaching
                  </Text>
                  <View style={[Styles.boder, { marginTop: 30 }]}>
                    <View style={{ padding: 15, paddingBottom: 0 }}>
                      <NewTextInput
                        value={inputs.teachingWayDetails}
                        onChangeText={text => {
                          handleOnChange(text, 'teachingWayDetails');
                        }}
                        multiline={true}
                        placeholder={'Please type here'}
                        placeholderTextColor={'#000000'}
                        textAlignVertical={'top'}
                        maxLength={500}
                        style={OnboardingStyles.textArea}
                        contextMenuHidden={false}
                      />
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 13 }}>500 characters only</Text>
                        <Button
                          onPress={() => setAboutTxt('')}
                          uppercase={false}
                          style={{
                            paddingHorizontal: 0,
                            width: 50,
                            position: 'relative',
                            right: -6,
                          }}
                          labelStyle={{
                            color: '#FF7454',
                            fontSize: 10,
                            textAlign: 'right',
                            width: 50,
                          }}>
                          Clear
                        </Button>
                      </View>
                    </View>
                  </View>
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

export default TutorExperienceScreen;
