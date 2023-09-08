import React, {
    useEffect,
    useState,
} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Keyboard,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {
    Divider,
    Text,
} from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import AppbarViewComponent from '../common/AppbarViewComponent';
import SubmitButton from '../common/SubmitButton';
import { useTheme } from '@react-navigation/native';
import { addMinutesAndFormatString, sortTimes } from '../../utils/slotTime_help';
import { createCourse, updateCourse, updateSlots } from '../../store/features/tutorCourse/tutorCourseSlice';
import { Edit } from '../../assets/images';

const ConfirmScheduleScreen = ({ route, navigation }) => {
    const { colors } = useTheme();
    const editData = route?.params?.editData;
    const { courseForm, selectedSlots, isError, coureseDetails } = useSelector(state => state.tutorCourse);
    const dispatch = useDispatch();

    const editSlot = (dayName, data) => {
        navigation.navigate('SlotBook', { editData: editData, editDay: dayName, data: data });
    }

    const confirBooking = () => {
        const courseFormData = { ...courseForm, ...{ timePeriods: ConvertedTimePeriods(selectedSlots) } }

        if (editData) {
            dispatch(updateCourse({ editId: editData, data: courseFormData }));
            navigation.navigate('ClassCreatedSuccess', { message: 'updated' });
        } else {
            dispatch(createCourse({ data: courseFormData }));
            navigation.navigate('ClassCreatedSuccess', { message: 'created' });
        }

    }

    // const getKeysWithArrayValues = (data) => {
    //     const keysWithArrays = [];

    //     for (const key in data) {
    //         if (Array.isArray(data[key]) && data[key].length > 0) {
    //             keysWithArrays.push(key);
    //         }
    //     }

    //     return keysWithArrays;
    // }
    useEffect(() => {
        if (editData) {
            const convertedData = convertDataToHHMM(coureseDetails?.data?.timePeriods);
            dispatch(updateSlots(convertedData));
            // const daySelected = getKeysWithArrayValues(coureseDetails?.data?.timePeriods);
            // if (daySelected) {
            //     setSelectedDay(daySelected[0])
            // }
        }
    }, [editData])

    function convertToHHMM(number) {
        if (typeof number === 'number' && (number >= 100 && number <= 9999)) {
            const stringNumber = number.toString();
            if (stringNumber.length === 3) {
                return `${stringNumber.slice(0, 1)}:${stringNumber.slice(1)}`;
            } else if (stringNumber.length === 4) {
                return `${stringNumber.slice(0, 2)}:${stringNumber.slice(2)}`;
            }
        }
        return "Invalid input";
    }

    function convertDataToHHMM(data) {
        const convertedData = { ...data };

        for (const day in convertedData) {
            if (Array.isArray(convertedData[day])) {
                convertedData[day] = convertedData[day].map(item => convertToHHMM(item.start));
            }
        }
        return convertedData;
    }

    const convertToNewFormat = (timePeriods) => {
        const days = Object.keys(timePeriods);
        const newTimePeriods = {};

        days.forEach((day) => {
            if (timePeriods[day].length > 0) {
                newTimePeriods[day] = timePeriods[day].map((timeRange) => {
                    const timeRangeVal = addMinutesAndFormatString(timeRange, courseForm.duration)
                    const [startTime, endTime] = timeRangeVal.split(' - ');

                    return {
                        start: convertToMilitaryTime(startTime),
                        end: convertToMilitaryTime(endTime)
                    };
                });
            }
        });

        return newTimePeriods;
    };
    const convertToMilitaryTime = (timeString) => {
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':');

        let militaryHours = parseInt(hours);
        if (period === 'PM' && militaryHours !== 12) {
            militaryHours += 12;
        } else if (period === 'AM' && militaryHours === 12) {
            militaryHours = 0;
        }

        const militaryTime = militaryHours * 100 + parseInt(minutes);
        return militaryTime;
    };
    const ConvertedTimePeriods = (timePeriods) => {
        return convertToNewFormat(timePeriods);
    };

    const TextView = ({ data }) => {
        const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        return (
            <View >
                {dayOrder.map(dayName => (
                    <View key={dayName}>
                        {data[dayName].length > 0 && (
                            <>
                                <View style={styles.parent}>
                                    <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10, { flexBasis: '85%' }]}>
                                        {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
                                    </Text>
                                    <TouchableOpacity style={{ justifyContent: 'flex-end' }}
                                        onPress={() => editSlot(dayName, data[dayName])}>
                                        <Edit width={20} height={20} />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.parent, styles.listContent]}>
                                    {sortTimes(data[dayName]).map((value) => {
                                        return (<Text key={value} style={[MainStyleSheet.fontSemiQuicksand, styles.list]}>
                                            {`\u2022 `} {addMinutesAndFormatString(value, courseForm.duration)}
                                        </Text>)
                                    })}


                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <Divider />
                                </View>
                            </>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppbarViewComponent title={'Confirm Schedule'} icon={"arrow-left-thin-circle-outline"}
                navigatePressed={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[MainStyleSheet.scrollView]}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ marginVertical: 10 }}>
                    <TextView data={selectedSlots} />
                </View>
                <SubmitButton title="CONFIRM SLOTS" onPress={() => confirBooking()}
                    bgColor={'#222222'} btnTextColor={colors.primary}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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


export default ConfirmScheduleScreen;
