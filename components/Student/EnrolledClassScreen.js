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
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Card, Button, Appbar, Divider, Title } from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BASE_URL } from '../constants/Config';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { studentCourseListByPage } from '../../store/features/studentCourse/studentCourseSlice';
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(LocalizedFormat)

const EnrolledClassScreen = ({ navigation }) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { courses, coursePages, isLoading, isError } = useSelector(
    state => state.studentCourse,
  );
  const [index, setIndex] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [routes] = React.useState([
    { key: 'first', title: 'ACTIVE' },
    { key: 'second', title: 'COMPLETED' },
  ]);

  useEffect(() => {
    if (!user) {
      navigation.navigate('StudentSignup');
    }
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, dispatch]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
      activeColor={'#FF7454'}
      inactiveColor={'#B2B2B2'}
      indicatorStyle={{ backgroundColor: '#FF7454', height: 3 }}
      style={Styles.tab}
    />
  );

  const renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item._id}
      onPress={() =>
        navigation.navigate('ClassDetailsStudent', { data: item })
      }>
      <View style={Styles.card}>
        <View style={Styles.left}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('ClassDetailsStudent', { data: item })
            }>
            {item && item.media ? <Image
              style={Styles.img}
              source={{ uri: item.media }}
              unoptimized={true}
            /> :
              <Image
                style={{
                  height: 79,
                  width: 120, resizeMode: 'contain'
                }}
                source={require('../../assets/images/noimage.jpg')}

              />}
          </TouchableWithoutFeedback>
        </View>
        <View style={Styles.right}>
          <View style={Styles._inner}>
            <Title style={{ fontSize: 14, color: '#000000' }}>
              {item.name}
            </Title>
          </View>
          <View style={[Styles._innerNext, { marginTop: 0 }]}>
            <Image
              style={{ height: 20, width: 16 }}
              source={require('../../assets/images/location.png')}
            />
            <Text style={Styles.locationTxt}>{item.address}</Text>
          </View>
          <View style={Styles._innerNext}>
            <Image
              style={{ height: 17, width: 17 }}
              source={require('../../assets/images/calendar.png')}
            />
            <Text style={Styles.calTxt}>
              {item && item?.startDate
                ? dayjs.utc(item?.startDate).local().format('ll')
                : item.startDate}

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
      dispatch(studentCourseListByPage({ itemPerPage: 10, page: currentPage + 1 }));
    }

  }

  const ActiveClass = () => (
    <View style={Styles.class_content}>
      <FlatList data={courses} renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={10}
      />
    </View>
  );

  const CompleteClass = () => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}></View>
  );

  const renderScene = SceneMap({
    first: ActiveClass,
    second: CompleteClass,
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={MainStyleSheet.navBar}>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Enrolled Classes" />
        {/* <Appbar.Action
          icon={require('../../assets/images/icon/search.png')}
          onPress={() => {
            
          }}
        /> */}
      </Appbar.Header>
      <View style={Styles.subHeader} />
      <View style={Styles.tabContainer}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
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
    width: 120,
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
  loader: {
    marginTop: 10,
    alignItems: 'center'
  }
});

export default EnrolledClassScreen;
