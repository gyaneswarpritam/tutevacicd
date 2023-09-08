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
    Text,
} from 'react-native-paper';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { useDispatch, useSelector } from 'react-redux';

import AppbarViewComponent from '../common/AppbarViewComponent';
import PreviousNextButton from '../common/PreviousNextButton';
import DropdownComponent from '../common/DropdownComponent';
import { updateSlots } from '../../store/features/tutorCourse/tutorCourseSlice';
import { NotifyMessage } from '../common/NotifyMessage';
import { addMinutesAndFormat } from '../../utils/slotTime_help';

const SlotBookScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const editData = route?.params?.editData;
    const { editDay, data } = route.params || '';
    const { courseForm, selectedSlots, coureseDetails } = useSelector(state => state.tutorCourse);

    const [days, setDays] = useState([
        {
            name: 'Monday',
            value: 'monday'
        },
        {
            name: 'Tuesday',
            value: 'tuesday'
        },
        {
            name: 'Wednesday',
            value: 'wednesday'
        },
        {
            name: 'Thursday',
            value: 'thursday'
        },
        {
            name: 'Friday',
            value: 'friday'
        },
        {
            name: 'Saturday',
            value: 'saturday'
        },
        {
            name: 'Sunday',
            value: 'sunday'
        },
    ]);
    const [slots, setSlots] = useState([]);
    const [selectedSlotsValue, setSelectedSlotsValue] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        if (editDay) {
            setSelectedDay(editDay);
            setSelectedSlotsValue(data);
        }
    }, [editDay])


    const onPressNext = () => {
        // const selectedSlotsWithDay = {};
        // selectedSlotsWithDay[selectedDay] = selectedSlotsValue;

        // // const selectedDayWithSlots = Object.keys[]
        // if (selectedSlotsValue.length > 0 && selectedDay) {
        //     dispatch(updateSlots(selectedSlotsWithDay));
        navigation.navigate('ConfirmSchedule', { editData: editData })
        // } else {
        //     NotifyMessage("Please choose day and slots.");
        // }

    }

    const generateTimeSlots = () => {
        const startTime = 1 * 60; // 8:00 AM in minutes
        const endTime = 24 * 60; // 6:00 PM in minutes
        const slotDuration = courseForm && courseForm.duration && parseInt(courseForm.duration) || 60; // 20 minutes per slot

        const slots = [];
        for (let time = startTime; time <= endTime - slotDuration; time += slotDuration) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }
        setSlots(slots);
    };

    useEffect(() => {
        generateTimeSlots();
    }, [])

    const toggleSlot = (index, value) => {
        if (selectedSlotsValue.includes(value)) {
            setSelectedSlotsValue(selectedSlotsValue.filter((slotValue, slotIndex) => slotValue !== value));
        } else {
            setSelectedSlotsValue([...selectedSlotsValue, value]);
        }
    };

    useEffect(() => {
        if (selectedSlotsValue.length > 0 && selectedDay) {
            const selectedSlotsWithDay = {};
            selectedSlotsWithDay[selectedDay] = selectedSlotsValue;
            dispatch(updateSlots(selectedSlotsWithDay));
        }
    }, [selectedSlotsValue])

    const onChangeUpdate = (value) => {
        setSelectedDay(value);
        setSelectedSlotsValue(selectedSlots[value]);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppbarViewComponent title={'Slot Book'} icon={"arrow-left-thin-circle-outline"}
                navigatePressed={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[MainStyleSheet.scrollView]}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMr10]}>
                        Pick from the available slots
                    </Text>
                    <View style={MainStyleSheet.radioContainer}>
                        <DropdownComponent
                            data={days}
                            value={selectedDay}
                            labelField="name"
                            valueField="value"
                            onChange={item => onChangeUpdate(item.value)}
                        />
                    </View>
                    <Text style={styles.infoText}>
                        After choosing each day, select a particular time duration from below you wish to spend learning on the above chosen day.
                    </Text>
                    <View style={styles.container}>
                        <View style={styles.slotContainer}>
                            {slots.map((slot, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.slot,
                                        selectedSlotsValue.includes(slot) && styles.selectedSlot,
                                    ]}
                                    onPress={() => toggleSlot(index, slot)}
                                >
                                    <Text style={styles.slotText}>{slot}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {selectedSlotsValue.length > 0 && (
                            <Text style={styles.infoText}>
                                You have selected {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}: {addMinutesAndFormat(selectedSlotsValue, parseInt(courseForm.duration))}
                            </Text>
                        )}
                    </View>
                    <PreviousNextButton prevTitle={'Previous'} nextTitle={'Next'}
                        nextNavigate={'SlotBook'} onPressNext={onPressNext}
                        onPressPrev={() => navigation.goBack()}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 8
    },
    slot: {
        width: '16%', // Adjust as needed
        height: 40,
        aspectRatio: 2 / 2, // Width:Height ratio
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#222222',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: '#FFFFFF'
    },
    selectedSlot: {
        backgroundColor: '#F9B406',
        borderColor: '#F9B406',
        color: '#FFFFFF'
    },
    slotText: {

    },
    selectedSlotText: {
        marginTop: 20,
        fontSize: 16,
    },
    infoText: {
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 15,
        fontSize: 12
    }
});


export default SlotBookScreen;
