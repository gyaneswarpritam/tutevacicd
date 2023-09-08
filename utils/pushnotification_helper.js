import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async (user) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFCMToken(user);
    }
}

const getFCMToken = async (user) => {
    let fcmToken = await AsyncStorage.getItem("fcmtoken");
    if (!fcmToken) {
        try {
            let fcmTokenValue = await messaging().getToken();
            if (fcmTokenValue) {
                await AsyncStorage.setItem("fcmtoken", fcmTokenValue)
            }
        } catch (err) {
            console.log(err, 'Error in fcm token');
        }
    }
}

export const NotifictionListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("Notification on forground state...", remoteMessage)
    })
}