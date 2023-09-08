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
    Appbar,
    Divider,
    RadioButton,
    Text,
} from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../common/Loader';
import DatepickerComponent from '../common/DatepickerComponent';
import AppbarViewComponent from '../common/AppbarViewComponent';
import { Col, Grid, Row } from 'react-native-easy-grid';
import PreviousNextButton from '../common/PreviousNextButton';
import { useTheme } from '@react-navigation/native';
import { clearSlots, courseFormCreate } from '../../store/features/tutorCourse/tutorCourseSlice';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(LocalizedFormat);

const CourseScheduleScreen = ({ route, navigation }) => {
    const editData = route?.params?.editData;
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { courseForm, coureseDetails } = useSelector(state => state.tutorCourse);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState('');
    const [daysData, setDaysData] = useState('');
    const [inputs, setInputs] = useState({
        duration: '',
        startDate: new Date(),
        endDate: new Date(),
    });

    useEffect(() => {
        if (editData) {
            setInputs({
                duration: (coureseDetails?.data?.duration).toString(),
                startDate: new Date((coureseDetails?.data?.startDate).toString()),
                endDate: new Date((coureseDetails?.data?.endDate).toString()),
            });
        }
    }, [editData])

    const validate = async () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.duration) {
            handleError('Duration is required', 'duration');
            valid = false;
        }
        if (!inputs.startDate) {
            handleError('Start Date is required', 'startDate');
            valid = false;
        }
        if (!inputs.endDate) {
            handleError('End Date is required', 'endDate');
            valid = false;
        }

        if (
            // inputs.frequency &&
            inputs.duration &&
            inputs.startDate &&
            inputs.endDate
        ) {
            valid = true;
        } else {
            valid = false;
        }
        if (valid) {
            if (editData) {
                const courseFormData = { ...courseForm, ...inputs }
                dispatch(courseFormCreate(courseFormData));
                navigation.navigate('ConfirmSchedule', { editData: editData });
            } else {
                const courseFormData = { ...courseForm, ...inputs }
                dispatch(courseFormCreate(courseFormData));
                navigation.navigate('SlotBook')
            }
        }
    };
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleOnChangeDate = (text, input) => {
        // text = dayjs.utc(text).local().format('YYYY/MM/DD');
        text = new Date((text).toString())
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppbarViewComponent title={editId ? 'Edit Schedule Class' : 'Schedule Class'}
                icon={"arrow-left-thin-circle-outline"}
                navigatePressed={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[MainStyleSheet.scrollView]}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {loading ? <Loader /> :
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10]}>
                            Duration
                        </Text>
                        <View style={MainStyleSheet.radioContainer}>
                            <RadioButton.Group
                                value={inputs.duration}
                                onValueChange={text => {
                                    handleOnChange(text, 'duration');
                                    dispatch(clearSlots());
                                }}>
                                <View style={MainStyleSheet.radioButtonContainer}>
                                    <Grid>
                                        <Row>
                                            <Col size={50}>
                                                <RadioButton.Item
                                                    uncheckedColor={colors.primary}
                                                    color={colors.primary}
                                                    label="30 Minutes"
                                                    value="30"
                                                    style={MainStyleSheet.radioButtonReverse}
                                                />
                                            </Col>
                                            <Col size={50}>
                                                <RadioButton.Item
                                                    uncheckedColor={colors.primary}
                                                    color={colors.primary}
                                                    label="1 Hour"
                                                    value="60"
                                                    style={MainStyleSheet.radioButtonReverse}
                                                />
                                            </Col>
                                        </Row>
                                    </Grid>
                                </View>
                            </RadioButton.Group>
                            {errors && errors.duration && <Text style={{ fontSize: 12, color: 'red' }}>{errors.duration}</Text>}
                        </View>
                        <Divider />
                        <DatepickerComponent
                            mode={'date'}
                            label={'Start Date'}
                            value={inputs.startDate}
                            setInputDate={data => handleOnChangeDate(data, 'startDate')}
                            error={errors.startDate}
                        />
                        <DatepickerComponent
                            mode={'date'}
                            label={'End Date'}
                            value={inputs.endDate}
                            setInputDate={data => handleOnChangeDate(data, 'endDate')}
                            error={errors.endDate}
                        />
                        <PreviousNextButton prevTitle={'Previous'} nextTitle={'Next'}
                            nextNavigate={'SlotBook'} onPressNext={validate}
                            onPressPrev={() => navigation.goBack()}
                        />

                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 30,
        borderWidth: 1,
        padding: 8,
        borderColor: '#E0E0E0',
        borderRadius: 4,
    },
    subHeader: {
        height: 90,
        width: '100%',
        backgroundColor: '#302C54',
        paddingHorizontal: 14,
    },
    imgUploadView: {
        height: 80,
        width: '100%',
        borderWidth: 1,
        borderColor: '#000000',
        borderStyle: 'dashed',
        marginTop: 25,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    docView: {
        height: 56,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginTop: 25,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    dropdownText: {
        color: '#000000',
        fontSize: 12,
        backgroundColor: '#fff',
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 5,
    },
    boder: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#E0E0E0',
    },
    radioStyle: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-start',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    boder: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 6,
    },
    dropdownText2: {
        color: '#000000',
        fontSize: 12,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 22,
        left: 10,
        zIndex: 5,
    },
});


export default CourseScheduleScreen;
