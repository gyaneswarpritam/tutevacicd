import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { Appbar } from 'react-native-paper';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useSelector } from 'react-redux';
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.extend(LocalizedFormat)

const CalendarScreen = ({ navigation }) => {
    const today = dayjs().format('YYYY-MM-DD');
    const { notifylist } = useSelector(state => state.tutorCourse);
    const [items, setItems] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDate, setselectedDate] = useState(today);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December", "January"
    ];

    const renderEmptyDate = () => {
        return (
            // <TouchableOpacity style={styles.item}>
            //     <Text style={[styles.itemText, { textAlign: 'center' }]}>No Classes available.</Text>
            // </TouchableOpacity>
            <></>
        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const loadItems = (day) => {
        const items = items || {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];
                    for (let x of notifylist) {
                        if (strTime == dayjs(x.notifyDate).format('YYYY-MM-DD')) {
                            items[strTime].push({
                                name: x.courseName,
                                startTime: `${dayjs.utc(x?.startTime).local().format('hh:mm A')}`,
                                endTime: `${dayjs.utc(x?.endTime).local().format('hh:mm A')}`,
                                height: Math.max(50, Math.floor(Math.random() * 150)),
                                day: strTime
                            });
                        }
                    }
                }
            }

            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });

            setItems(newItems);
        }, 1000);
    }

    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                style={[styles.item, { height: reservation?.height }]}
                onPress={() => Alert.alert(reservation?.name)}
            >
                <Text style={{ fontSize, color }}>{reservation?.name}</Text>
                <Text style={{ fontSize, color }}>{reservation?.startTime} - {reservation?.endTime}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={MainStyleSheet.navBar}>
                <Appbar.Action
                    icon="arrow-left"
                    onPress={() => navigation.navigate('Dashboard')}
                />
                <Appbar.Content title="Manage Classes" />
            </Appbar.Header>
            {/* <Calendar /> */}
            {/* <CalendarList /> */}
            <Text style={styles.monthView}>{selectedMonth}</Text>
            <Agenda
                items={items}
                loadItemsForMonth={(chooseMonth) => {
                    loadItems(chooseMonth);
                    setSelectedMonth(monthNames[chooseMonth.month]);
                }}
                selected={selectedDate}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    monthView: {
        width: 100,
        height: 30,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default CalendarScreen;