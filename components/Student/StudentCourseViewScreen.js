import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
//Style
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useTheme } from '@react-navigation/native';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);
import AppbarViewComponent from '../common/AppbarViewComponent';
import CommonSearchComp from './CommonSearchComp';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tutorCourseDetails } from '../../store/features/tutorCourse/tutorCourseSlice';

const StudentCourseViewScreen = ({ route, navigation }) => {
  const { colors } = useTheme()
  const { data } = route.params;
  const dispatch = useDispatch();
  const [classList, setClassList] = useState(data);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'About' },
    { key: 'second', title: 'Schedule' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={[MainStyleSheet.fontBoldLato, { fontSize: 18, color: '#222222' }]}
      activeColor={'#222222'}
      inactiveColor={'#A2A2A2'}
      indicatorStyle={{ backgroundColor: colors.primary, height: 3 }}
      style={{ backgroundColor: '#FFFBF0', elevation: 0 }}
      onTabLongPress={(scene) => {
        const { route } = scene
        props.jumpTo(route.key)
      }}
      renderLabel={({ route, focused }) => (
        <Text style={[MainStyleSheet.fontBoldLato, { color: focused ? '#222222' : '#A2A2A2', fontSize: 20 }]}>
          {route.title.charAt(0).toUpperCase() + route.title.slice(1)}
        </Text>
      )}
    />
  );

  const AboutClass = () => (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 8 }}
      showsVerticalScrollIndicator={false}>
      <TextView title={'Name Of The Course'} details={classList?.name} />
      <TextView title={'Description'} details={classList?.description} />
      <TextView title={'Industry'} details={classList?.industry?.name} />
      <TextView
        title={'Specialisation:'}
        details={classList?.specialization?.name}
      />
      <TextView title={'Skills'} details={classList?.skills && classList?.skills?.length > 0 && classList?.skills.map(item => item.name).join(', ')} />
      <TextView title={'Level'} details={classList?.level?.name} />
      <TextView
        title={'Objective of the course'}
        details={classList.objective}
      />
      <TextView title={'Pre-requistie'} details={classList.prerequistie} />
      <TextView title={'Payment Terms'} details={classList.payment} />
      <TextView title={'Teaching Mode'} details={classList.prerequistie} />
      <TextView title={'Class Address'} details={classList.address} />
      <TextView title={'Class Size'} details={classList.size} />
      <TextView title={'Class Fees'} details={classList.amount} />
      <TextView
        title={'Duration'}
        details={classList?.duration == 30 ? '30 Minutes' : '1 Hour'}
      />
      <TextView title={'Start Date'} details={classList && classList?.startDate
        ? dayjs.utc(classList?.startDate).local().format('ll')
        : classList.startDate} />
      <TextView title={'End Date'} details={classList && classList?.endDate
        ? dayjs.utc(classList?.endDate).local().format('ll')
        : classList.endDate} />
    </ScrollView>
  );

  const formatTime = (time) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  const [convertedSchedule, setConvertedSchedule] = useState({});
  useEffect(() => {
    const convertedSchedule = {};
    for (const day in classList.timePeriods) {
      convertedSchedule[day] = classList.timePeriods[day].map(item => ({
        ...item,
        start: formatTime(item.start),
        end: formatTime(item.end)
      }));
    }
    setConvertedSchedule(convertedSchedule);
    dispatch(tutorCourseDetails(classList._id));
  }, []);

  const ScheduleClass = () => (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 8 }}
      showsVerticalScrollIndicator={false}>
      {Object.entries(convertedSchedule).map(([day, data]) => (
        data.length > 0 && (
          <React.Fragment key={day}>
            <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10, { flexBasis: '85%' }]}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>
            <View style={[styles.parent, styles.listContent]}>
              {data.map((value) => {
                return (<Text key={value._id} style={[MainStyleSheet.fontSemiQuicksand, styles.list]}>
                  {`\u2022 `} {value.start} - {value.end}
                </Text>)
              })}


            </View>
            <View style={{ marginVertical: 5 }}>
              <Divider />
            </View>
          </React.Fragment>
        )
      ))}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: AboutClass,
    second: ScheduleClass,
  });

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <AppbarViewComponent title={'Course Details'} icon={"arrow-left-thin-circle-outline"}
        rightIcon={false}
        navigatePressed={() => navigation.goBack()} />
      <Grid style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <Row style={{ flex: 0.17, marginTop: 1 }}>
          <CommonSearchComp classData={classList} dividerShow={false} enrollBtn={true} />
        </Row>
        <Row style={{ flex: 0.8 }}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </Row>
      </Grid>
    </SafeAreaView>
  );
};

const TextView = ({ title, details }) => {
  return (
    <>
      <View style={{ marginVertical: 15 }}>
        <Text style={[styles.listTitle, MainStyleSheet.fontBoldLato]}>
          {title}
        </Text>
        <Text
          style={[styles.listDesc, MainStyleSheet.fontSemiQuicksand]}>
          {details}
        </Text>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  listDesc: {
    fontSize: 14,
    color: '#524F50',
    marginTop: 6,
    lineHeight: 20,
  },
  listTitle: {
    fontSize: 18,
    color: '#222222',
  },
  right: {
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
  parent: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  list: {
    fontSize: 16,
    color: '#524F50',
    flexBasis: '50%'
  },
  listContent: {
    marginVertical: 8
  }
});

export default StudentCourseViewScreen;
