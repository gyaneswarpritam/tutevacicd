import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Appbar, Divider } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Col, Grid } from 'react-native-easy-grid';
//Components
import Upnextcom from './UpnextComp';
//Style
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import { BASE_URL, VIDEO_APP_ID } from '../constants/Config';
import { updateCourse } from '../../store/features/tutorCourse/tutorCourseSlice';
// import VideoScreen from '../VideoScreen';
// import AgoraUIKit from 'agora-rn-uikit';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import {
  addNotification,
  addPushNotification,
  enrollToCourse,
} from '../../store/features/studentCourse/studentCourseSlice';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);

const ClassDetailsStudentScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const { user } = useSelector(state => state.auth);
  const { enrolledCourses } = useSelector(state => state.studentCourse);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [classList, setClassList] = useState({});
  const [skills, setSkills] = useState([]);
  const [videoCall, setVideoCall] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{ key: 'first', title: 'ABOUT CLASS' }]);
  const [dayTime, setDayTime] = useState([]);

  const [connectionData, setConnectionData] = useState({
    appId: VIDEO_APP_ID,
    channel: '',
    token: '',
  });

  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
    },
  };

  const stopCall = () => {
    setVideoCall(false);
  };

  useEffect(() => {
    const map = {
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 7
    };
    const final = [...data?.timings].sort((a, b) => {
      return map[a.day] - map[b.day];
    });
    setDayTime(final);

    setClassList(data);
    let skillsList =
      Object.keys(data).length > 0
        ? data?.skills.map(item => item['name'])
        : [];
    setSkills(skillsList.join(','));
    if (data?.videoToken == '') {
      getVideoToken(`${data.name}-${data.tutorID._id}`);
    } else {
      setConnectionData({
        appId: VIDEO_APP_ID,
        channel: `${data.name}-${data.tutorID._id}`,
        token: data?.videoToken,
      });
    }
  }, [classList, videoError]);

  const getVideoToken = channelName => {
    fetch(`${BASE_URL}token-generate/access-token?channelName=${channelName}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        dispatch(
          updateCourse({ editId: data?._id, data: { videoToken: json?.token } }),
        );
        setConnectionData({
          appId: VIDEO_APP_ID,
          channel: channelName,
          token: json?.token,
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(updateCourse({ editId: data._id, data: { videoToken: '' } }));
        setVideoError(true);
      });
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
      activeColor={'#FF7454'}
      inactiveColor={'#B2B2B2'}
      indicatorStyle={{ backgroundColor: '#FF7454', height: 3 }}
      style={{ backgroundColor: '#FFFFFF', elevation: 0 }}
    />
  );

  const AboutClass = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
      }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}>
        <TextView title={'Industry:'} details={classList?.industry?.name} />
        <TextView
          title={'Specialisation:'}
          details={classList?.specialization?.name}
        />
        <TextView title={'Skills:'} details={skills} />
        <TextView title={'Level:'} details={classList?.level?.name} />
        <TextView
          title={'Objective of the course:'}
          details={classList.objective}
        />
        <TextView title={'prerequistie:'} details={classList.prerequistie} />
        <TextView title={'Class Address:'} details={classList.address} />
        <TextView title={'Start Date:'} details={classList && classList?.startDate
          ? dayjs.utc(classList?.startDate).local().format('ll')
          : classList.startDate} />
        <TextView title={'End Date:'} details={classList && classList?.endDate
          ? dayjs.utc(classList?.endDate).local().format('ll')
          : classList.endDate} />
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>
          Class Timings
        </Text>
        {dayTime &&
          dayTime?.length > 0 &&
          dayTime.map(res => {
            return (
              <Text
                key={res._id}
                style={{
                  fontSize: 13,
                  color: '#000000',
                  marginTop: 6,
                  lineHeight: 20,
                }}>
                Every {res.day} |{' '}
                {dayjs.utc(classList?.startTime).local().format('hh:mm A')} -{' '}
                {dayjs.utc(classList?.endTime).local().format('hh:mm A')}
              </Text>
            );
          })}
        <TextView title={'Class Size:'} details={classList.size} />
        <TextView title={'Class Fees:'} details={classList.fees} />
        <TextView
          title={'Open for Enrollment:'}
          details={classList?.open_enrollment ? 'Open' : 'Closed'}
        />
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    first: AboutClass,
  });

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
          message: `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName} enrolled to the course ${course?.name}`,
        }),
      );
      dispatch(
        addPushNotification({
          device_token: course?.tutorID?.deviceToken,
          title: `Enrolled to ${course?.name}`,
          message: `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName} enrolled to the course ${course?.name}`,
        }),
      );
    } catch (err) {
      console.log(err);
      Alert.alert('Something went wrong');
    }
  };

  return videoCall ? (
    // <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    <></>
  ) : (
    // <VideoScreen connectionData={connectionData} stopCall={() => stopCall()} />
    // <></>
    <StripeProvider publishableKey="pk_test_XCSqlDyEbQqC9VsKwasGf6WT">
      <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
        <Appbar.Header style={MainStyleSheet.navBar}>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.navigate('Enrolled Classes')}
          />
          <Appbar.Content title="Class Details" />
        </Appbar.Header>
        <View style={Styles.subHeader}>
          <View style={Styles.card}>
            <View style={Styles.left}>
              {classList && classList.media ? <Image
                style={Styles.img}
                source={{ uri: classList.media }}
                unoptimized={true}
              /> :
                <Image
                  style={{ width: 120, height: 80, resizeMode: 'contain' }}
                  source={require('../../assets/images/noimage.jpg')}

                />}
            </View>
            <View style={Styles.right}>
              <View style={Styles._inner}>
                <Text
                  style={{ fontSize: 14, color: '#000000', fontWeight: '700' }}>
                  {classList.name}
                </Text>
              </View>
              <View style={[Styles._innerNext, { marginTop: 4 }]}>
                <Image
                  style={{ height: 20, width: 16 }}
                  source={require('../../assets/images/location.png')}
                />
                <Text style={Styles.locationTxt}>{classList.address}</Text>
              </View>
              <View style={Styles._innerNext}>
                <Image
                  style={{ height: 17, width: 17 }}
                  source={require('../../assets/images/calendar.png')}
                />
                <Text style={Styles.calTxt}>
                  {classList && classList?.startDate
                    ? dayjs.utc(classList?.startDate).local().format('ll')
                    : classList.startDate}{' '}
                  {dayjs.utc(classList?.startTime).local().format('hh:mm A')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 14,
            backgroundColor: '#F6F6F6',
            marginTop: 40,
          }}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
        {classList?.studentEnrolled || enrolledCourses ? (
          <Button
            onPress={() => setVideoCall(true)}
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={[OnboardingStyles.nextBtn]}>
            Start Call
          </Button>
        ) : (
          classList?.open_enrollment && classList?.totalEnrolled < classList?.size ? <Button
            onPress={() => subscribe(classList, user)}
            // disabled={
            //   !classList?.open_enrollment &&
            //   classList?.totalEnrolled >= classList?.size
            // }
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={[OnboardingStyles.nextBtn]}>
            Enroll Now
          </Button> : <Button
            uppercase={false}
            labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
            style={[OnboardingStyles.nextBtn]}>
            Enrollment Closed
          </Button>
        )}
      </View>
    </StripeProvider>
  );
};

const TextView = ({ title, details }) => {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>
        {title}
      </Text>
      <Text
        style={{ fontSize: 13, color: '#000000', marginTop: 6, lineHeight: 20 }}>
        {details}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  subHeader: {
    height: 90,
    width: '100%',
    backgroundColor: '#302C54',
    paddingHorizontal: 14,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F4EB0C',
    borderRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
  },
  _inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 5,
    alignItems: 'center',
  },
  _tb: {
    flexDirection: 'row',
    marginTop: 8,
  },
  _innerNext: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  left: {
    //flex:1
  },
  right: {
    flex: 1.5,
    paddingLeft: 14,
    justifyContent: 'center',
  },
  img: {
    height: 79,
    width: 119,
  },
  iconWraper: {
    padding: 8,
  },
  icon: {
    height: 16,
    width: 16,
  },
  locationTxt: {
    color: '#000000',
    fontSize: 12,
    marginLeft: 8,
  },
  calTxt: {
    color: '#999999',
    fontSize: 10,
    marginLeft: 8,
  },
  boldTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  normalTxt: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'left',
  },
});

export default ClassDetailsStudentScreen;
