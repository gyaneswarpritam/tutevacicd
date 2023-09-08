import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Card, Appbar, Button, FAB } from 'react-native-paper';
import MainStyleSheet from '../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import OnboardingStyles from '../styleSheet/OnboardingStyle';
import {
  commonCourseListByPage,
  courseList,
  courseNames,
} from '../store/features/common/commonCourseSlice';
import { Col, Grid, Row } from 'react-native-easy-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './common/Loader';
import CommonSearchComp from './Student/CommonSearchComp';
import OnboardingComponent from './common/OnboardingComponent';
import { Logo, Search } from '../assets/images';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    courses,
    coursePages,
    isLoading,
    courseNameList,
    isError,
    message,
    isIndicator,
  } = useSelector(state => state.commonCourse);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnboard, setShowOnboard] = useState(true);

  useEffect(() => {
    fetchStoreData();
    dispatch(courseList());
    dispatch(courseNames());
  }, []);

  const fetchStoreData = async () => {
    const onboard = await AsyncStorage.getItem('onboard');
    if (onboard) {
      setShowOnboard(false);
    } else {
      setShowOnboard(true)
    }
  };

  const renderFooter = ({ item }) => {
    return isIndicator ? (
      <View style={searchStyles.loader}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (currentPage <= coursePages && courses?.length >= 10) {
      setCurrentPage(currentPage + 1);
      dispatch(
        commonCourseListByPage({
          itemPerPage: 10,
          page: currentPage + 1,
          name: name,
        }),
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        onPress={() =>
          navigation.navigate('CourseDetails', { data: item })
        }>
        <View>
          <CommonSearchComp classData={item} navigation={navigation} dividerShow={true} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    showOnboard ? <OnboardingComponent setShowOnboard={() => setShowOnboard(false)} /> :
      <>
        <SafeAreaView>
          <StatusBar animated={true} backgroundColor={colors.secondary} barStyle="dark-content" />
          <Appbar.Header style={[searchStyles.navbar, { backgroundColor: colors.secondary }]}>
            <Grid>
              <Row style={{ margin: 6 }}>
                <Col size={60}>
                  <Logo width={150} height={43} />
                </Col>
                <Col size={15}>
                  <TouchableOpacity onPress={() => navigation.navigate('SearchList')}>
                    <View style={{ paddingTop: 12, paddingLeft: 20 }}>
                      <Search />
                    </View>
                  </TouchableOpacity>
                </Col>
                <Col size={25}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#F96D06', color: '#FFFFFF', width: 67, height: 34, borderRadius: 21, margin: 10 }}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={{ textAlign: 'center', paddingTop: 6, color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' }}>Sign In </Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </Appbar.Header>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {courses && courses.length > 0 ?
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={courses}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListFooterComponent={renderFooter}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0}
                  // ListEmptyComponent={emptyComponent}
                  contentContainerStyle={{ paddingBottom: 80, paddingTop: 10, paddingHorizontal: 10 }}
                /> : <></>}
            </>
          )}
        </SafeAreaView>
      </>
  );
};

const searchStyles = StyleSheet.create({
  border: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    shadowColor: '#DDDDDD',

    shadowOpacity: 1,
    shadowRadius: 1.0,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  navbar: {
    height: 80,
    paddingTop: 15,
    elevation: 5
  }
});

export default HomeScreen;
