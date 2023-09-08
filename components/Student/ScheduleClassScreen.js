import React from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppbarViewComponent from '../common/AppbarViewComponent';
import MainStyleSheet from '../../styleSheet/MainStyleSheet';

const ScheduleClassScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppbarViewComponent title="Schedule" icon={"arrow-left-thin-circle-outline"}
                navigatePressed={() => navigation.goBack()} />
            <ScrollView
                style={[MainStyleSheet.scrollView]}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={{ marginBottom: 100 }}>
                    <Text style={[MainStyleSheet.fontBoldLato, MainStyleSheet.textHeading, MainStyleSheet.textHeadingMargin, { marginBottom: 10 }]}>
                        Schedule
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ScheduleClassScreen