import * as React from 'react';
import { Text, StyleSheet, Image, Alert } from 'react-native';
import {
  Title,
  Subheading,
  Paragraph,
  Divider,
  List,
  Button,
} from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { BASE_URL } from '../constants/Config';
import { useDispatch, useSelector } from 'react-redux';
import {
  enrollToCourse,
  addNotification,
  addPushNotification,
} from '../../store/features/studentCourse/studentCourseSlice';
import { format } from 'date-fns';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);

const SearchComp = ({ classData, userdata }) => {
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const stripe = useStripe();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const subscribe = async (course, userdata) => {
    try {
      const response = await fetch(
        `${BASE_URL}course/payCourse/${course?._id}/${userdata?._id}`,
        {
          method: 'POST',
          body: JSON.stringify({ amount: course?.fees }),
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${userdata?.token?.token}`,
          },
        },
      );
      const data = await response.json();

      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
        googlePay: true,
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      dispatch(enrollToCourse(course?._id));
      dispatch(
        addNotification({
          course: course,
          message: `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName} register to the course ${classData?.name}`,
        }),
      );
      dispatch(
        addPushNotification({
          device_token: course?.tutorID?.deviceToken,
          title: `Enrolled to ${classData?.name}`,
          message: `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName} register to the course ${classData?.name}`,
        }),
      );
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };
  return (
    <Grid>
      <Row style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15 }}>
        <Col size={30}>
          {classData && classData.media ? <Image
            style={{ width: 100, height: 90, borderRadius: 4 }}
            source={{ uri: classData.media }}
            unoptimized={true}
          /> :
            <Image
              style={{ width: 100, height: 90, borderRadius: 4, resizeMode: 'contain' }}
              source={require('../../assets/images/noimage.jpg')}

            />}
        </Col>
        <Col size={68} style={{ paddingLeft: 15 }}>
          <Title style={SearchCompStyle.mainTitle}>{classData?.name}</Title>
          <Subheading style={SearchCompStyle.subTitle}>
            <Image
              source={require('./../../assets/images/icon/location.png')}
            />
            <Text>{classData?.address}</Text>
          </Subheading>
          <Subheading style={SearchCompStyle.pTitle}>
            <Image
              source={require('./../../assets/images/icon/calendar.png')}
            />
            <Text>
              {classData && classData?.startDate
                ? dayjs.utc(classData?.startDate).local().format('ll')
                : classData.startDate}{' '}
              {dayjs.utc(classData?.startTime).local().format('hh:mm A')}
            </Text>
          </Subheading>
        </Col>
      </Row>
      <Row style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Col size={100}>
          <Paragraph style={SearchCompStyle.paragraph}>
            {classData?.objective}
          </Paragraph>
        </Col>
      </Row>
      <Row style={{ backgroundColor: '#F8F8F8' }}>
        <Col size={100}>
          <List.Item
            title={props => (
              <Text style={{ color: '#000000', fontSize: 12 }}>
                {classData?.tutorID?.personalDetails?.firstName}{' '}
                {classData?.tutorID?.personalDetails?.lastName} |{' '}
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 12,
                    fontWeight: 'bold',
                    paddingLeft: 1,
                  }}>
                  ${classData?.fees}
                </Text>
              </Text>
            )}
            left={props => (
              <List.Icon
                {...props}
                icon={() => (
                  <Image
                    source={{
                      uri: classData?.tutorID?.personalDetails?.photo || null,
                    }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                )}
              />
            )}
            right={props =>
              classData?.studentEnrolled ? (
                <Text
                  style={{
                    color: '#',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingRight: 10,
                    paddingTop: 10,
                    color: '#FF7454',
                  }}>
                  Enrolled
                </Text>
              ) : (
                <Button
                  {...props}
                  labelStyle={{
                    fontSize: 12,
                    color: '#ffffff',
                    letterSpacing: 0,
                    textTransform: 'capitalize',
                  }}
                  onPress={() => subscribe(classData, user)}
                  disabled={
                    !classData.open_enrollment &&
                    classData.totalEnrolled >= classData.size
                  }
                  style={SearchCompStyle.enrollBtn}>
                  Enroll Now
                </Button>
              )
            }
          />
        </Col>
      </Row>
    </Grid>
  );
};
const SearchCompStyle = StyleSheet.create({
  mainTitle: {
    color: '#000000',
    fontSize: 16,
    bottom: 9,
    // fontWeight: 100,
  },
  subTitle: {
    color: '#000000',
    fontSize: 14,
    top: -14,
    letterSpacing: 0,
  },
  pTitle: {
    color: '#999999',
    fontSize: 12,
    top: -8,
    letterSpacing: 1,
  },
  paragraph: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 10,
  },
  enrollBtn: {
    backgroundColor: '#FF7454',
    fontSize: 12,
    borderRadius: 4,
  },
});

export default SearchComp;
