import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import OnboardingStyles from '../../styleSheet/OnboardingStyle';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';
import { Appbar } from 'react-native-paper';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const ManageClassScreen = ({ navigation }) => {
    const [items, setItems] = useState({});

    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }



    return (
        <>
            <View style={OnboardingStyles.container}>
                <Appbar.Header style={MainStyleSheet.navBar}>
                    <Appbar.Action
                        icon="arrow-left"
                        onPress={() => navigation.navigate('Dashboard')}
                    />
                    <Appbar.Content title="Manage Calendar" />
                </Appbar.Header>
                {/* <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}> */}
                <View
                    style={{ flex: 1 }}>
                    <Calendar
                        markingType={'multi-dot'}
                        markedDates={{
                            '2023-03-25': { dots: [vacation, massage, workout] },
                            '2023-03-26': { dots: [massage, workout] }
                        }} />
                </View>
                {/* </ScrollView> */}
            </View>
        </>
    );
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
    }
});

export default ManageClassScreen