import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import AppbarViewComponent from "../common/AppbarViewComponent";
import { courseList } from "../../store/features/tutorCourse/tutorCourseSlice";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CommonSearchComp from "../Student/CommonSearchComp";
import CommonFlatListCourse from "../common/CommonFlatListCourse";
import { useState } from "react";


const MyClassScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    courses,
    coursePages,
    isIndicator,
  } = useSelector(state => state.tutorCourse);

  useEffect(() => {
    dispatch(courseList());
  }, []);

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
        onPress={() => { navigation.navigate('CourseView', { data: item }) }}>
        <View>
          <CommonFlatListCourse classData={item}
            horizontalList={false} dividerShow={true} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <AppbarViewComponent title={'My Courses'} icon={"arrow-left-thin-circle-outline"}
        navigatePressed={() => navigation.goBack()} />
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
export default MyClassScreen;
