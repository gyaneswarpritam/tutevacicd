import StudentDashboardScreen from '../components/Student/StudentDashboardScreen';
import ScheduleClassScreen from '../components/Student/ScheduleClassScreen';
import NotificationScreen from '../components/Student/NotificationScreen';
import StudentAccountSettingScreens from '../components/Student/StudentAccountSettingScreens';
import ClassDetailsStudentScreen from '../components/Student/ClassDetailsStudentScreen';
import SearchScreen from '../components/Student/SearchScreen';
import FilterScreen from '../components/Student/FilterScreen';
import StudentEditProfileScreen from '../components/Student/StudentEditProfileScreen';
import MapComponent from '../components/common/MapComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StudentCourseViewScreen from '../components/Student/StudentCourseViewScreen';
import CourseListScreen from '../components/Student/CourseListScreen';
import SearchCourseListScreen from '../components/Student/SearchCourseListScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const StudentTabRoutes = () => {
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
            <Tab.Screen name={homeName} component={StudentDashboardScreen} />
            <Tab.Screen name={scheduleName} component={ScheduleClassScreen} />
            <Tab.Screen name={notificationName} component={NotificationScreen} />
            <Tab.Screen name={accountName} component={StudentAccountSettingScreens} />
        </Tab.Navigator>
    )
}

export const StudentStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={StudentTabRoutes} />
            <Stack.Screen
                name="ClassDetailsStudent"
                component={ClassDetailsStudentScreen}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="StudentEditProfile" component={StudentEditProfileScreen} />
            <Stack.Screen name="Map" component={MapComponent} />
            <Stack.Screen name="StudentCourseView" component={StudentCourseViewScreen} />
            <Stack.Screen name="CourseListScreen" component={CourseListScreen} />
            <Stack.Screen name="SearchCourseList" component={SearchCourseListScreen} />
        </Stack.Navigator>
    );
};