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
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../common/Loader';
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import {
    commonCourseListByPage,
    courseList,
    courseNames,
} from '../../store/features/common/commonCourseSlice';
import CommonSearchComp from '../Student/CommonSearchComp';
import AutoSuggestionComponent from '../common/AutoSuggestionComponent';

const SearchCourseListScreen = ({ navigation }) => {
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

    useEffect(() => {
        // dispatch(courseList());
        dispatch(courseNames());
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
                onPress={() =>
                    navigation.navigate('CourseDetails', { data: item })
                }>
                <View>
                    <CommonSearchComp classData={item} dividerShow={true} />
                </View>
            </TouchableOpacity>
        );
    };

    const emptyComponent = () => {
        return (
            <View
                style={{ margin: 10, padding: 10, flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', padding: 10 }}>
                    Sorry, No Class Available
                </Text>
                <Text style={{ textAlign: 'center', padding: 20 }}>
                    Please checck the spelling or try searching for something else
                </Text>
                <Card style={[MainStyleSheet.card, searchStyles.border]}>
                    <Button
                        onPress={() => dispatch(courseList())}
                        uppercase={false}
                        labelStyle={{ color: '#FFFFFF', fontSize: 18 }}
                        style={OnboardingStyles.submitBtn}>
                        <Text>Search Again</Text>
                    </Button>
                </Card>
            </View>
        );
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#FFFBF0' }}>
                <StatusBar animated={true} backgroundColor="#FFFFFF" />
                <Appbar.Header style={[{ backgroundColor: '#FFFFFF', height: 80, paddingTop: 15, elevation: 5 }]}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={async () => {
                            dispatch(courseList());
                            navigation.navigate('Home');
                        }}
                    />
                </Appbar.Header>
                <AutoSuggestionComponent
                    courses={courseNameList}
                    selectedSkills={name => {
                        setName(name);
                        setCurrentPage(1);
                    }} />
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {name ? <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={courses}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={renderFooter}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0}
                            // ListEmptyComponent={emptyComponent}
                            contentContainerStyle={{ paddingBottom: 80, paddingTop: 10, paddingHorizontal: 8 }}
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
});
const multiSelectStyles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#000000',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000000',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#000000',
    },
    selectedStyle: {
        borderRadius: 50,
        backgroundColor: '#FFD9CF',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0,
    },
});

export default SearchCourseListScreen;
