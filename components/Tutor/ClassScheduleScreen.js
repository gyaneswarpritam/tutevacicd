import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Keyboard } from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import CompleteBar from '../common/CompleteBar';
import PointLabel from '../common/PoinLabel';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Appbar, Text, RadioButton } from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatepickerComponent from '../common/DatepickerComponent';
import CheckboxComponent from '../common/CheckboxComponent';
import { selectDays } from '../../constants/Constant';
import { BASE_URL } from '../constants/Config';
import Input from '../common/Input';
import { NotifyMessage } from '../common/NotifyMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCourse,
  updateCourse,
} from '../../store/features/tutorCourse/tutorCourseSlice';
import Loader from '../common/Loader';
import * as RNLocalize from "react-native-localize";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
dayjs.extend(utc)
dayjs.extend(tz)

const ClassScheduleScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { editFullData } = route.params;
  const { user } = useSelector(state => state.auth);
  const {
    courses,
    createdCourse,
    updatedCourse,
    isSuccess,
    isError,
    isLoading,
    message,
  } = useSelector(state => state.tutorCourse);
  const [token, setToken] = useState('');
  const [daysData, setDaysData] = useState('');
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState('');
  const [inputs, setInputs] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timings: [],
    type: '',
  });

  useEffect(() => {
    if (user) {
      setToken(user.token.token);
    }
    if (Object.keys(editFullData).length > 0) {
      const selectedDays = [];
      editFullData.timings.map(res => {
        selectedDays.push(res.day);
        selectDays.map(resp => {
          resp.value == res.day ? resp.checked = true : ''
        })
      });
      setDaysData([...selectDays])
      setInputs({
        startDate: editFullData.startDate,
        endDate: editFullData.endDate,
        startTime: editFullData.startTime,
        endTime: editFullData.endTime,
        type: editFullData.type,
        timings: selectedDays
      });
      setEditId(editFullData._id);
    } else {
      setDaysData(selectDays)
      setInputs({
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        timings: [],
        type: '',
      });
    }
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.startDate) {
      handleError('Start Date is required', 'startDate');
      valid = false;
    }
    if (!inputs.endDate) {
      handleError('Start Date is required', 'endDate');
      valid = false;
    }
    if (!inputs.startTime) {
      handleError('Start Time is required', 'startTime');
      valid = false;
    }
    if (!inputs.endTime) {
      handleError('End Time is required', 'endTime');
      valid = false;
    }
    if (!inputs.type) {
      handleError('Class Type is required', 'type');
      valid = false;
    }
    if (inputs.timings.length == 0) {
      handleError('Select days is required', 'timings');
      valid = false;
    }
    if (
      inputs.startDate &&
      inputs.endDate &&
      inputs.startTime &&
      inputs.endTime &&
      inputs.type &&
      inputs.timings.length > 0
    ) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      const daysTiming = [];
      const time = inputs?.startTime
        ? `${dayjs.utc(inputs.startTime).local().format('hh:mm A')} - ${dayjs.utc(inputs.endTime).local().format('hh:mm A')}`
        : '';

      inputs.timings.map(res => {
        const timingData = {
          day: res,
          time: time,
        };
        daysTiming.push(timingData);
      });

      const classDetails = await AsyncStorage.getItem('classDetails');
      const classDetailsData = JSON.parse(classDetails);
      const classLocation = await AsyncStorage.getItem('classLocation');
      const classLocationData = JSON.parse(classLocation);
      const data = {
        name: classDetailsData.name,
        level: classDetailsData.level,
        media: classDetailsData.media,
        objective: classDetailsData.objective,
        prerequistie: classDetailsData.prerequistie,
        industry: classDetailsData.industry,
        specialization: classDetailsData.specialization,
        skills: classDetailsData.skills,
        address: classLocationData.address,
        zipCode: classLocationData.zipCode,
        location: classLocationData.location,
        type: inputs.type,
        startDate: inputs.startDate,
        endDate: inputs.endDate,
        startTime: inputs.startTime,
        endTime: inputs.endTime,
        timings: daysTiming,
        size: classDetailsData.size,
        fees: classDetailsData.fees,
        timezone: RNLocalize.getTimeZone()
      };

      if (editId) {
        dispatch(updateCourse({ editId: editId, data: data }));
        AsyncStorage.removeItem('classDetails');
        AsyncStorage.removeItem('classLocation');
        NotifyMessage("Class Updated Successfully");
        navigation.navigate('Dashboard');
      } else {
        dispatch(createCourse({ data: data }));
        AsyncStorage.removeItem('classDetails');
        AsyncStorage.removeItem('classLocation');
        NotifyMessage("Class Created Successfully");
        navigation.navigate('Dashboard');
      }
    }
  };
  const handleOnChange = (text, input) => {
    if (input == 'startDate') {
      setInputs(prevState => ({ ...prevState, ['startTime']: text }));
      setInputs(prevState => ({ ...prevState, ['endTime']: text }));
    }
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const setCheckboxDate = (value, checked) => {
    if (checked) {
      inputs.timings.push(value);
    } else {
      const index = inputs.timings.indexOf(value);
      if (index > -1) {
        inputs.timings.splice(index, 1);
      }
    }
  };

  const changeAmPmTo24HrWithDate = (str, newDate) => {
    let time = str.toUpperCase();
    let hours = Number(time?.match(/^(\d+)/)[1]);
    let minutes = Number(time?.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return new Date(newDate.split('T')[0] + ' ' + sHours + ":" + sMinutes)
  }

  const formatAMPM = date => {
    if (date instanceof Date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
  };

  return (
    <>
      <View style={[OnboardingStyles.container, { backgroundColor: '#F6F6F6' }]}>
        <Appbar.Header style={MainStyleSheet.navBar}>
          <Appbar.Action
            icon="close"
            onPress={() => navigation.navigate('My Classes')}
          />
          <Appbar.Content title={editId ? 'Edit Class' : 'Create New Class'} />
        </Appbar.Header>
        <View style={Styles.subHeader} />
        <View style={Styles.scroll_view}>
          {isLoading ? (
            <Loader />
          ) : (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <View style={{ paddingHorizontal: 20, width: '100%' }}>
                <CompleteBar title={'Step 3 of 3'} percentage={'100%'} />
              </View>
              <View
                style={{
                  paddingHorizontal: 25,
                  marginBottom: 30,
                  marginTop: 25,
                }}>
                <PointLabel number={3} title={'Class Schedule'} />
                <View style={Styles.container}>
                  {/* <Text>{JSON.stringify(inputs)}</Text> */}
                  <Text style={Styles.dropdownText}>Select Days</Text>
                  {daysData &&
                    daysData.map(item => {
                      return (
                        <View style={Styles.item} key={item.value}>
                          <CheckboxComponent
                            label={item.label}
                            value={item.value}
                            setCheckboxDate={setCheckboxDate}
                            checkedValue={item.checked}
                          />
                        </View>
                      );
                    })}
                </View>
                <Text>
                  {errors?.timings && inputs?.timings?.length == 0 && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.timings}
                    </Text>
                  )}
                </Text>
                <Row>
                  <Col size={100}>
                    <Text style={Styles.dropdownText2}>
                      Tell us about your way of teaching
                    </Text>
                    <View style={[Styles.boder, { marginTop: 30 }]}>
                      <View style={{ paddingHorizontal: 2, paddingVertical: 8 }}>
                        <RadioButton.Group
                          value={inputs.type}
                          onValueChange={text =>
                            handleOnChange(text, 'type')
                          }>
                          <RadioButton.Item
                            color="#999999"
                            labelStyle="#999999"
                            label="In Person"
                            value="In-Person"
                            style={Styles.radioStyle}
                          />
                          <RadioButton.Item
                            color="#999999"
                            labelStyle="#999999"
                            label="Online"
                            value="Online"
                            style={Styles.radioStyle}
                          />
                        </RadioButton.Group>
                      </View>
                    </View>
                  </Col>
                </Row>
                <Text>
                  {errors.type && !inputs.type && (
                    <Text style={{ fontSize: 12, color: 'red' }}>
                      {errors.type}
                    </Text>
                  )}
                </Text>
                {/* <Input
                  label="Class Type"
                  placeholder="Enter Class Type"
                  onChangeText={text => handleOnChange(text, 'type')}
                  error={errors.type}
                  value={inputs.type}
                  onFocus={() => {
                    handleError(null, 'type');
                  }}
                /> */}
                {inputs?.startDate ? <DatepickerComponent
                  mode={'date'}
                  label={'Start Date'}
                  value={new Date(inputs.startDate)}
                  setInputDate={data => handleOnChange(data, 'startDate')}
                  error={errors.startDate}
                /> : <></>}
                {inputs?.endDate ? <DatepickerComponent
                  mode={'date'}
                  label={'End Date'}
                  value={new Date(inputs.endDate)}
                  setInputDate={data => handleOnChange(data, 'endDate')}
                  error={errors.endDate}
                /> : <></>}
                {inputs?.startTime ? <DatepickerComponent
                  mode={'time'}
                  label={'Start Time'}
                  value={new Date(inputs.startTime)}
                  setInputDate={data => handleOnChange(data, 'startTime')}
                  error={errors.startTime}
                /> : <></>}
                {inputs?.endTime ? <DatepickerComponent
                  mode={'time'}
                  label={'End Time'}
                  value={new Date(inputs.endTime)}
                  setInputDate={data => handleOnChange(data, 'endTime')}
                  error={errors.endTime}
                /> : <></>}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      <Grid style={OnboardingStyles.footerBtn}>
        <Col>
          <Button
            mode={'outlined'}
            uppercase={false}
            labelStyle={{ color: '#000000', fontSize: 18 }}
            style={OnboardingStyles.cancelBtn}
            onPress={() => navigation.navigate('ClassLocation', { editFullData: editFullData })}>
            Back
          </Button>
        </Col>
        <Col>
          <Button
            onPress={() => validate()}
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={OnboardingStyles.nextBtn}>
            {editId ? 'Update' : 'Next'}
          </Button>
        </Col>
      </Grid>
    </>
  );
};

const Styles = StyleSheet.create({
  subHeader: {
    height: 90,
    width: '100%',
    backgroundColor: '#302C54',
    paddingHorizontal: 14,
  },
  boder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E0E0E0',
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
  scroll_view: {
    flex: 1,
    marginHorizontal: 18,
    position: 'relative',
    top: -70,
    zIndex: 99999,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  checkBoxStyle: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 30,
    borderWidth: 1,
    padding: 8,
    borderColor: '#E0E0E0',
    borderRadius: 4,
  },
  item: {
    width: '50%',
  },
});

export default ClassScheduleScreen;
