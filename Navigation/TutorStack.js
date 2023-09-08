import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TutorDashboardScreen from '../components/Tutor/TutorDashboardScreen';
import CreateClassScreen from '../components/Tutor/CreateClassScreen';
import NotifyTutorScreen from '../components/Tutor/NotifyTutorScreen';
import TutorAccountSettingScreens from '../components/Tutor/TutorAccountSettingScreens';
import CourserSlotScreen from '../components/Tutor/CourserSlotScreen';
import CourseScheduleScreen from '../components/Tutor/CourseScheduleScreen';
import ClassLocationScreen from '../components/Tutor/ClassLocationScreen';
import ClassScheduleScreen from '../components/Tutor/ClassScheduleScreen';
import ClassCreated from '../components/Tutor/ClassCreated';
import ClassDetailsScreen from '../components/Tutor/ClassDetailsScreen';
import UpnextcomTutor from '../components/Tutor/UpnextCompTutor';
import TutorEditProfileScreen from '../components/Tutor/TutorEditProfileScreen';
import TutorEditExperienceScreen from '../components/Tutor/TutorEditExperienceScreen';
import TutorEditSocialScreen from '../components/Tutor/TutorEditSocialScreen';
import MapComponent from '../components/common/MapComponent';
import MyUpNextClassScreen from '../components/Tutor/MyUpNextClassScreen';
import UpNextClassDetailsScreen from '../components/Tutor/UpNextClassDetailsScreen';
import SlotBookScreen from '../components/Tutor/SlotBookScreen';
import ConfirmScheduleScreen from '../components/Tutor/ConfirmScheduleScreen';
import CourseViewScreen from '../components/Tutor/CourseViewScreen';
import MyClassScreen from '../components/Tutor/MyClassScreen';
import ProfileCreatedSuccessScreen from '../components/Tutor/ProfileCreatedSuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const TutorTabRoutes = () => {
    const homeName = "Home";
    const scheduleName = "Schedule";
    const notificationName = "Notification";
    const accountName = "Account";

    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#F9B406',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                tabBarStyle: { padding: 10, height: 70 },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === scheduleName) {
                        iconName = focused ? 'calendar' : 'calendar-outline'
                    } else if (rn === notificationName) {
                        iconName = focused ? 'notifications' : 'notifications-outline'
                    } else if (rn === accountName) {
                        iconName = focused ? 'person-circle-sharp' : 'person-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name={homeName} component={TutorDashboardScreen} />
            <Tab.Screen name={scheduleName} component={CreateClassScreen} />
            <Tab.Screen name={notificationName} component={NotifyTutorScreen} />
            <Tab.Screen name={accountName} component={TutorAccountSettingScreens} />
        </Tab.Navigator>
    )
}

export const TutorStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={TutorTabRoutes} />
            <Stack.Screen name="CreateClass" component={CreateClassScreen} />
            <Stack.Screen name="CourseSlot" component={CourserSlotScreen} />
            <Stack.Screen name="ScheduleCourse" component={CourseScheduleScreen} />
            <Stack.Screen name="ClassLocation" component={ClassLocationScreen} />
            <Stack.Screen name="ClassSchedule" component={ClassScheduleScreen} />
            <Stack.Screen name="ClassCreatedSuccess" component={ClassCreated} />
            <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
            <Stack.Screen name="Upnext" component={UpnextcomTutor} />
            <Stack.Screen name="TutorEditProfile" component={TutorEditProfileScreen} />
            <Stack.Screen name="TutorEditExperience" component={TutorEditExperienceScreen} />
            <Stack.Screen name="TutorEditSocial" component={TutorEditSocialScreen} />
            <Stack.Screen name="Map" component={MapComponent} />
            <Stack.Screen name="UpNextClass" component={MyUpNextClassScreen} />
            <Stack.Screen name="UpNextClassDetails" component={UpNextClassDetailsScreen} />
            <Stack.Screen name="SlotBook" component={SlotBookScreen} />
            <Stack.Screen name="ConfirmSchedule" component={ConfirmScheduleScreen} />
            <Stack.Screen name="CourseView" component={CourseViewScreen} />
            <Stack.Screen name="MyClass" component={MyClassScreen} />
            <Stack.Screen name="ProfileCreatedSuccess" component={ProfileCreatedSuccessScreen} />
        </Stack.Navigator>
    );
};