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
import { useDispatch, useSelector } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo, Search } from '../../assets/images';
import CommonSearchComp from './CommonSearchComp';
import { courseList, courseNames } from '../../store/features/studentCourse/studentCourseSlice';
import Loader from '../common/Loader';
import AppbarViewComponent from '../common/AppbarViewComponent';
import { commonCourseListByPage } from '../../store/features/common/commonCourseSlice';

const CourseListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    courses,
    coursePages,
    isLoading,
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
          navigation.navigate('StudentCourseView', { data: item })
        }>
        <View>
          <CommonSearchComp classData={item} navigation={navigation} dividerShow={true} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <AppbarViewComponent title={'All Courses'} icon={"arrow-left-thin-circle-outline"}
        navigatePressed={() => navigation.goBack()} />
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

export default CourseListScreen;
