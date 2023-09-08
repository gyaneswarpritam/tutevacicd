import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import { Appbar, Button, Divider } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import Input from '../common/Input';
import { useDispatch, useSelector } from 'react-redux';
import { studentRegister } from '../../store/features/auth/authSlice';
import AppbarViewComponent from '../common/AppbarViewComponent';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import DropdownComponent from '../common/DropdownComponent';
import { Line } from '../../assets/images';
import SubmitButton from '../common/SubmitButton';
import { useTheme } from '@react-navigation/native';

const AddKidScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [numberOfKids, setNumberOfKids] = useState('1');
  const dispatch = useDispatch();
  const { signupData } = useSelector(
    state => state.commonData,
  );
  const { isSuccess, isError } = useSelector(state => state.auth);

  const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
  ];

  const [inputs, setInputs] = React.useState([
    {
      key: 0,
      name: '',
      age: '',
      gender: '',
    },
  ]);

  const submitHandler = async () => {
    Keyboard.dismiss();
    let valid = true;

    if (valid) {
      // setIsLoading(true);
      const studentDetails = {};
      studentDetails.email = signupData.email;
      studentDetails.password = signupData.password;
      studentDetails.type = signupData.role;
      studentDetails.personalDetails = signupData;
      studentDetails.location = signupData.location;
      inputs.forEach((v) => delete v.key);
      studentDetails.kids = inputs;
      if (signupData.role == 'parent') {
        dispatch(studentRegister(studentDetails));
      }

      if (isError) {
        return false;
      } else {
        // navigation.navigate('SignupSuccess');
      }
    }
  };

  const addHandler = (number) => {
    setInputs([]);
    let _inputs = [];
    for (let i = 1; i <= number; i++) {
      _inputs.push({
        key: i,
        name: '',
        age: '',
        gender: '',
      });
    }

    setInputs(_inputs);
  };

  const deleteHandler = key => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key, inputName) => {
    const _inputs = [...inputs];
    _inputs[key][inputName] = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <AppbarViewComponent title={'Add Kids'} icon={"arrow-left-thin-circle-outline"}
          navigatePressed={() => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={[MainStyleSheet.scrollView]}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{ paddingHorizontal: 1, marginBottom: 20 }}>
            <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin,
            { textAlign: 'center' }]}>
              Number of Kids you wish to add?
            </Text>
            <View style={{
              width: 80, flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '35%'
            }}>
              <DropdownComponent
                label=""
                data={data}
                labelField="label"
                valueField="value"
                value={numberOfKids}
                onChange={item => {
                  setNumberOfKids(item.value);
                  addHandler(item.value);
                }}
              />
            </View>
            <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin]}>
              Enter all the details below
            </Text>
            <Grid>
              {/* <Button
                onPress={addHandler}
                uppercase={false}
                labelStyle={{
                  color: '#FFFFFF',
                  fontSize: 11,
                  padding: 0,
                  margin: 0,
                }}
                style={OnboardingStyles.addChildBtn}>
                Add Child
              </Button> */}
              <Row>
                <Col>
                  {inputs.map((input, key) => (
                    <>
                      <View
                        key={key}
                      >
                        <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading,
                        { color: '#F96D06' }]}>
                          Kid {key + 1}
                        </Text>
                        <Input
                          label="Name"
                          placeholder="Enter Your Name"
                          value={input.name}
                          onChangeText={text => inputHandler(text, key, 'name')}
                        />
                        <Input
                          label="Age"
                          placeholder="Enter Your Age"
                          keyboardType={'numeric'}
                          value={input.age}
                          onChangeText={text => inputHandler(text, key, 'age')}
                        />
                        <Input
                          label="Gender"
                          placeholder="Enter Your Gender"
                          value={input.gender}
                          onChangeText={text => inputHandler(text, key, 'gender')}
                        />
                        {/* <TouchableOpacity
                        onPress={() => deleteHandler(key)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          paddingTop: 10,
                          paddingBottom: 10,
                        }}>
                        <Text style={{ color: '#F9B406' }}>Remove</Text>
                      </TouchableOpacity> */}
                      </View>
                      <View style={{ marginTop: 30, padding: 0, }}>
                        <Line />
                      </View>
                    </>
                  ))}
                </Col>
              </Row>
            </Grid>
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <SubmitButton title="SUBMIT NOW" onPress={submitHandler} buttonWidth={198}
              bgColor={'#222222'} btnTextColor={colors.primary}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AddKidScreen;
