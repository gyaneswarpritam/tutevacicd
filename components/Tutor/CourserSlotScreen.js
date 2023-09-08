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
    RadioButton,
    Text,
} from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import Loader from '../common/Loader';
import DatepickerComponent from '../common/DatepickerComponent';
import { selectDays } from '../../constants/Constant';

const CourserSlotScreen = ({ route, navigation }) => {
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState('');
    const [daysData, setDaysData] = useState('');
    const [inputs, setInputs] = useState({
        frequency: '',
        duration: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        setDaysData([...selectDays])

    }, [])

    const validate = async () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.frequency) {
            handleError('Frequency is required', 'frequency');
            valid = false;
        }
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
            inputs.frequency &&
            inputs.duration &&
            inputs.startDate &&
            inputs.endDate
        ) {
            valid = true;
        } else {
            valid = false;
        }
        if (valid) {
            await AsyncStorage.setItem('classDetails', JSON.stringify(inputs));
            if (editId) {
                navigation.navigate('ClassLocation', { editData: classDetails });
            } else {
                navigation.navigate('ClassLocation', { editData: '' });
            }
        }
    };
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const selectedItems = text => {
        setInputs(prevState => ({ ...prevState, skills: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <View >
                <Appbar.Header style={MainStyleSheet.navBar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => {
                            navigation.navigate('Dashboard');
                        }}
                    />
                    <Appbar.Content title={editId ? 'Edit Course' : 'Schedule Course'} />
                    <TouchableOpacity onPress={() => validate()}>
                        <Text
                            style={{
                                color: '#F9B406',
                                fontSize: 20,
                                fontWeight: 'bold',
                                right: 10,
                            }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </Appbar.Header>
                <ScrollView keyboardShouldPersistTaps={'handled'}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {loading ? <Loader /> : <View
                        style={{ paddingHorizontal: 25, paddingBottom: 50, marginTop: 5, backgroundColor: '#FFFFFF' }}>
                        <View>
                            <View>
                                <Text style={Styles.dropdownText2}>Frequency</Text>
                                <View style={[Styles.boder, { marginTop: 30 }]}>
                                    <RadioButton.Group
                                    >
                                        <RadioButton.Item
                                            color="#999999"
                                            labelStyle="#999999"
                                            label="Daily"
                                            value="daily"
                                        />
                                        <RadioButton.Item
                                            color="#999999"
                                            labelStyle="#999999"
                                            label="Weekly"
                                            value="weekly"
                                        />
                                    </RadioButton.Group>
                                </View>
                            </View>
                            <View>
                                <Text style={Styles.dropdownText2}>Duration</Text>
                                <View style={[Styles.boder, { marginTop: 30 }]}>
                                    <RadioButton.Group
                                    >
                                        <RadioButton.Item
                                            color="#999999"
                                            labelStyle="#999999"
                                            label="30 Minutes"
                                            value="30"
                                        />
                                        <RadioButton.Item
                                            color="#999999"
                                            labelStyle="#999999"
                                            label="1 Hour"
                                            value="60"
                                        />
                                    </RadioButton.Group>
                                </View>
                            </View>
                            <DatepickerComponent
                                mode={'date'}
                                label={'Start Date'}
                                value={new Date()}
                                setInputDate={data => handleOnChange(data, 'startDate')}
                                error={errors.startDate}
                            />
                            <DatepickerComponent
                                mode={'date'}
                                label={'End Date'}
                                value={new Date()}
                                setInputDate={data => handleOnChange(data, 'endDate')}
                                error={errors.endDate}
                            />
                        </View>
                    </View>}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
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


export default CourserSlotScreen;
