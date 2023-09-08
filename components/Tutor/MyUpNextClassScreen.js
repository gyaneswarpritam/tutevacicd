import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Card, Button, Appbar, Divider, Title } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { Col, Grid } from 'react-native-easy-grid';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BASE_URL } from '../constants/Config';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseList,
  courseListByPage,
  reset,
  tutorCourseDetails,
  upNextCourses,
} from '../../store/features/tutorCourse/tutorCourseSlice';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(LocalizedFormat)

const MyUpNextClassScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { courses, coursePages, isLoading, isError, message, upNextCourseList } = useSelector(
    state => state.tutorCourse,
  );
  const [token, setToken] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (user) {
      setToken(user.token.token);
    }
    dispatch(upNextCourses({ itemPerPage: 10, page: currentPage }));
  }, []);

  const navigateDetailsPage = ele => {
    dispatch(tutorCourseDetails(ele?.course));
    navigation.navigate('UpNextClassDetails');
  };

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item._id}
      onPress={() => navigateDetailsPage(item)}>
      <View style={Styles.card}>
        <View style={Styles.left}>
          <TouchableWithoutFeedback
            onPress={() => navigateDetailsPage(item)}>
            {item && item.media ? <Image
              style={Styles.img}
              source={{ uri: item.media }}
              unoptimized={true}
            /> :
              <Image
                style={[Styles.img, { resizeMode: 'contain' }]}
                source={require('../../assets/images/noimage.jpg')}
              />}
          </TouchableWithoutFeedback>
        </View>
        <View style={Styles.right}>
          <View style={Styles._inner}>
            <Title style={{ fontSize: 14, color: '#000000' }}>
              {item.courseName}
            </Title>
          </View>
          {/* <View style={[Styles._innerNext, { marginTop: 0 }]}>
            <Image
              style={{ height: 20, width: 16 }}
              source={require('../../assets/images/location.png')}
            />
            <Text style={Styles.locationTxt}>{item.address}</Text>
          </View> */}
          <View style={Styles._innerNext}>
            <Image
              style={{ height: 17, width: 17 }}
              source={require('../../assets/images/calendar.png')}
            />
            <Text style={Styles.calTxt}>
              {item && item?.notifyDate
                ? dayjs.utc(item?.notifyDate).local().format('ll')
                : slideVal?.notifyDate}

              {' '}
              {dayjs.utc(item?.startTime).local().format('hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>)
  }

  const renderFooter = ({ item }) => {
    return (
      isLoading ?
        <View style={Styles.loader}>
          <ActivityIndicator size={'large'} />
        </View> : null
    )
  }

  const handleLoadMore = () => {
    if (currentPage <= coursePages) {
      setCurrentPage(currentPage + 1)
      dispatch(upNextCourses({ itemPerPage: 10, page: currentPage + 1 }));
    }

  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={MainStyleSheet.navBar}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            navigation.navigate('Dashboard')
          }}
        />
        <Appbar.Content title="Upcoming Classes" />
        {/* <Appbar.Action
          icon={require('../../assets/images/icon/search.png')}
          onPress={() => {
            
          }}
        /> */}
      </Appbar.Header>
      <View style={Styles.subHeader} />
      <View style={Styles.tabContainer}>
        <FlatList data={upNextCourseList} renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0} />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  subHeader: {
    height: 100,
    width: '100%',
    backgroundColor: '#302C54',
    paddingHorizontal: 14,
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
  },
  tab: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    marginHorizontal: 16,
    marginTop: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  class_content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  _inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 5,
    alignItems: 'center',
  },
  _innerNext: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  left: {
    //flex:1
  },
  right: {
    flex: 1.5,
    paddingLeft: 14,
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
});

export default MyUpNextClassScreen;
