import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import { Col, Grid, Row } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../common/Loader';
import { format } from 'date-fns';
import { updateUserDeviceToken } from '../../store/features/auth/authSlice';
import { useTheme } from '@react-navigation/native';
import { Logo, Search } from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonFlatListCourse from '../common/CommonFlatListCourse';
import TitleHeader from '../common/TitleHeader';
import { industryList } from '../../store/features/common/commonSlice';
import { courseList, levelList } from '../../store/features/studentCourse/studentCourseSlice';
import ParentPopupScreen from './ParentPopupScreen';

const StudentDashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { courses, isLoading, isError, message, notification, upNextSliderList } =
    useSelector(state => state.studentCourse);
  const [activeCourse, setActiveCourse] = useState(0);
  const [completedCourse, setCompletedCourse] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
    dispatch(courseList());
    dispatch(industryList({}));
    dispatch(levelList({}));
    // dispatch(getNotification());

    // dispatch(cronNotifylist());
    // dispatch(upNextSliderCourses({ itemPerPage: 3, page: 1 }));
    // return () => {
    //   dispatch(reset());
    // };
  }, []);

  useEffect(() => {
    if (courses) {
      const d = new Date();
      const activeCourseCount = courses.filter(res => {
        return res.endDate > d.toISOString();
      }).length;
      setActiveCourse(activeCourseCount);
      const completedCourseCount = courses.filter(res => {
        return res.endDate < d.toISOString();
      }).length;
      setCompletedCourse(completedCourseCount);
    }
  }, [courses]);

  useEffect(() => {
    setTimeout(() => {
      updateDeviceToken();
    }, 2000);
  }, []);

  const updateDeviceToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    if (fcmToken) {
      dispatch(updateUserDeviceToken(fcmToken));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => { navigation.navigate('StudentCourseView', { data: item }) }}>
        <CommonFlatListCourse classData={item} dividerShow={false}
          horizontalList={true} />
      </TouchableOpacity>
    );
  };

  const myCoursesRender = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() => { navigation.navigate('StudentCourseView', { data: item }) }}>
        <CommonFlatListCourse classData={item} dividerShow={false}
          horizontalList={false} />
      </TouchableOpacity>
    );
  };

  const renderNotification = ({ item }) => {
    return (
      <View key={item?._id}>
        <Grid style={{ marginBottom: 10, marginTop: 10 }}>
          <Col size={80}>
            <Text style={DashboardStyles.recentTextStyle}>{item?.message}</Text>
          </Col>
          <Col size={20}>
            <Text style={DashboardStyles.recentStyle}>
              {format(new Date(item.createdAt), 'MMM do')}
            </Text>
          </Col>
        </Grid>
        <Divider style={{ backgroundColor: '#DDDDDD' }} />
      </View>
    );
  };

  const emptyNotifyComponent = () => {
    <View>
      <Grid style={{ marginBottom: 10, marginTop: 10 }}>
        <Col size={80}>
          <Text style={DashboardStyles.recentTextStyle}>
            No New Notification
          </Text>
        </Col>
      </Grid>
      <Divider style={{ backgroundColor: '#DDDDDD' }} />
    </View>;
  };

  const handleLoadMore = () => {
    if (currentPage <= coursePages && courses?.length >= 10) {
      setCurrentPage(currentPage + 1);
      dispatch(
        commonCourseListByPage({
          itemPerPage: 3,
          page: currentPage + 1,
          name: name,
        }),
      );
    }
  };

  const emptyComponent = () => {
    <View>
      <Text>No Data Found</Text>
    </View>
  }

  const renderFooter = () => {
    <View>
      <Text></Text>
    </View>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor={colors.secondary} barStyle="dark-content" />
      <Appbar.Header style={[DashboardStyles.navbar, { backgroundColor: colors.secondary }]}>
        <Grid>
          <Row>
            <Col size={60}>
              <Logo width={150} height={43} />
            </Col>
            <Col size={15}>
              <TouchableOpacity onPress={() => navigation.navigate('SearchCourseList')}>
                <View style={{ paddingTop: 12, paddingLeft: 20 }}>
                  <Search />
                </View>
              </TouchableOpacity>
            </Col>
            <Col size={25}>
              <View style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {user.type == 'parent' ?
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Icon name="circle-thin" size={50} color='#06B8F9' />
                    <Image source={require('../../assets/images/user.png')} style={{ height: 40, width: 40, position: 'absolute', zIndex: 99 }} />
                  </TouchableOpacity> :
                  <>
                    <Icon name="circle-thin" size={50} color='#06B8F9' />
                    <Image source={require('../../assets/images/user.png')} style={{ height: 40, width: 40, position: 'absolute', zIndex: 99 }} />
                  </>
                }
              </View>
            </Col>
          </Row>
        </Grid>
      </Appbar.Header>
      <ScrollView style={{ flex: 1, paddingHorizontal: 12, marginTop: 10 }}>
        {user.type == 'parent' ?
          <ParentPopupScreen modalVisible={modalVisible} closeModal={() => setModalVisible(false)} />
          : <></>}
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <Grid>
              {courses && courses.length > 0 ?
                <TitleHeader title={"Up Next"} onPress={() => { navigation.navigate('CourseListScreen') }} />
                : <></>}
              <Row>
                <Col>
                  {courses && courses.length > 0 &&
                    <FlatList nestedScrollEnabled
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={courses}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={renderFooter}
                      // onEndReached={handleLoadMore}
                      // onEndReachedThreshold={0}
                      // ListEmptyComponent={emptyComponent}
                      contentContainerStyle={{ paddingTop: 6 }}
                    />}
                </Col>
              </Row>
              <Row>
                <Col>
                  <TitleHeader title={"Personal Statistics"} showViewAll={false} onPress={() => { }} />
                </Col>
              </Row>
              <Row>
                <Col >
                  <View style={[DashboardStyles.personalStyle, { textAlign: 'right', marginLeft: 10 }]}>
                    <Text style={DashboardStyles.perTextStyle}>
                      {activeCourse}
                    </Text>
                    <Text style={DashboardStyles.perTextStyle2}>
                      Active Courses
                    </Text>
                  </View>
                </Col>
                <Col style={{ paddingLeft: 20 }}>
                  <View style={[DashboardStyles.personalStyle, { textAlign: 'right', marginRight: 15 }]}>
                    <Text style={DashboardStyles.perTextStyle}>
                      {completedCourse}
                    </Text>
                    <Text style={DashboardStyles.perTextStyle2}>
                      Completed Courses
                    </Text>
                  </View>
                </Col>
              </Row>
              <TitleHeader title={"My Courses"} onPress={() => { navigation.navigate('CourseListScreen') }} />
              <Row>
                <Col>
                  {courses && courses.length > 0 ?
                    <FlatList nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={courses}
                      renderItem={myCoursesRender}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={renderFooter}
                      // onEndReached={handleLoadMore}
                      // onEndReachedThreshold={0}
                      // ListEmptyComponent={emptyComponent}
                      contentContainerStyle={{ paddingTop: 6 }}
                    />
                    :
                    <></>
                  }
                </Col>
              </Row>
              <TitleHeader title={"Notifications"} onPress={() => { }} />
              <Row>
                <Col>
                  {notification && notification.length > 0 ?
                    <FlatList nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={notification}
                      renderItem={renderNotification}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={renderFooter}
                      // onEndReached={handleLoadMore}
                      // onEndReachedThreshold={0}
                      // ListEmptyComponent={emptyComponent}
                      contentContainerStyle={{ paddingTop: 6 }}
                    />
                    :
                    <></>
                  }
                </Col>
              </Row>
            </Grid>
          )}
        </>
      </ScrollView>
    </SafeAreaView >
  );
};

const DashboardStyles = StyleSheet.create({
  navbar: {
    height: 80,
    paddingTop: 15,
    elevation: 5
  },
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
  cardTwo: {
    fontSize: 14,
    color: '#000000',
  },
  perTextStyle: {
    color: '#707070',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  personalStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#707070',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    marginTop: 15,
    width: 137,
    height: 111
  },
  perTextStyle2: {
    color: '#707070',
    fontSize: 16,
    textAlign: 'center',
  },
  recentStyle: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'right',
  },
  recentTextStyle: {
    color: '#595959',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default StudentDashboardScreen;
