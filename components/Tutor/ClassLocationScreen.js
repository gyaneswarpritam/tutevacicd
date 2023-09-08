import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Keyboard } from 'react-native';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import CompleteBar from '../common/CompleteBar';
import PointLabel from '../common/PoinLabel';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Appbar } from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../common/Input';
import { useSelector } from 'react-redux';

const ClassLocationScreen = ({ navigation, route }) => {
  const { user } = useSelector(state => state.auth);
  const { editData } = route.params;
  const [errors, setErrors] = useState({});
  const [editFullData, setEditFullData] = useState({});
  const [inputs, setInputs] = useState({
    address: user.personalDetails.address,
    zipCode: user.personalDetails.zipCode,
    location: user.location
  });

  useEffect(() => {
    if (editData) {
      setInputs(editData);
      setEditFullData(editData);
    }
  }, []);

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.address) {
      handleError('Address is required', 'address');
      valid = false;
    }
    if (!inputs.zipCode) {
      handleError('Zipcode is required', 'zipCode');
      valid = false;
    }

    if (inputs.address && inputs.zipCode) {
      valid = true;
    } else {
      valid = false;
    }
    if (valid) {
      await AsyncStorage.setItem('classLocation', JSON.stringify(inputs));
      if (editData) {
        navigation.navigate('ClassSchedule', { editFullData: editFullData });
      } else {
        navigation.navigate('ClassSchedule', { editFullData: '' });
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
      <View style={[OnboardingStyles.container, { backgroundColor: '#F6F6F6' }]}>
        <Appbar.Header style={MainStyleSheet.navBar}>
          <Appbar.Action
            icon="close"
            onPress={() => navigation.navigate('My Classes')}
          />
          <Appbar.Content title={editData ? 'Edit Class' : 'Create New Class'} />
        </Appbar.Header>
        <View style={Styles.subHeader} />
        <View style={Styles.scroll_view}>
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={{ paddingHorizontal: 20, width: '100%' }}>
              <CompleteBar title={'Step 2 of 3'} percentage={'66%'} />
            </View>
            <View
              style={{ paddingHorizontal: 25, marginBottom: 30, marginTop: 25 }}>
              <PointLabel number={1} title={'Class Location Details'} />
              <Input
                label="Address"
                placeholder="Enter Address"
                onChangeText={text => handleOnChange(text, 'address')}
                error={errors.address}
                value={inputs.address}
                onFocus={() => {
                  handleError(null, 'address');
                }}
                editable={false}
              />
              <Input
                label="zipCode"
                placeholder="Enter zipCode"
                keyboardType="numeric"
                onChangeText={text => handleOnChange(text, 'zipCode')}
                error={errors.zipCode}
                value={inputs.zipCode}
                onFocus={() => {
                  handleError(null, 'zipCode');
                }}
                editable={false}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <Grid style={OnboardingStyles.footerBtn}>
        <Col>
          <Button
            mode={'outlined'}
            uppercase={false}
            labelStyle={{ color: '#000000', fontSize: 18 }}
            style={OnboardingStyles.cancelBtn}
            onPress={() => navigation.navigate('CreateClass')}>
            Back
          </Button>
        </Col>
        <Col>
          <Button
            onPress={() => validate()}
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={OnboardingStyles.nextBtn}>
            Next
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
});

export default ClassLocationScreen;
