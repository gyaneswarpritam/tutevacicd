import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const studentRegister = async useData => {
  const response = await axios.post(`${BASE_URL}students/create`, useData);
  return response.data;
};
const tutorRegister = async useData => {
  const response = await axios.post(`${BASE_URL}tutors/create`, useData);
  return response.data;
};
const studentLogin = async useData => {
  const response = await axios.post(`${BASE_URL}students/login`, useData);
  response.data.data['userRole'] = 'student';
  await AsyncStorage.setItem('userinfo', JSON.stringify(response.data.data));
  return response.data.data;
};
const tutorLogin = async useData => {
  const response = await axios.post(`${BASE_URL}tutors/login`, useData);
  response.data.data['userRole'] = 'tutor';
  await AsyncStorage.setItem('userinfo', JSON.stringify(response.data.data));
  return response.data.data;
};

const updateDeviceToken = async (useData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const userId = useData.user._id;
  if (useData.user.type == 'teacher') {
    const response = await axios.post(`${BASE_URL}tutors/updateTutorDeviceToken/${userId}`, { deviceToken: useData?.fcmToken }, config);
    return response.data.data;
  } else {
    const response = await axios.post(`${BASE_URL}students/updateStudentDeviceToken/${userId}`, { deviceToken: useData?.fcmToken }, config);
    return response.data.data;
  }
};

const logoutUser = async () => {
  return await AsyncStorage.removeItem('userinfo');
};
const userInfoStorage = async () => {
  const userInfoResult = await AsyncStorage.getItem('userinfo');
  if (userInfoResult !== null) {
    return JSON.parse(userInfoResult);
  }
  return null;
};

const errorMessage = error => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

const authService = {
  tutorRegister,
  studentRegister,
  logoutUser,
  studentLogin,
  tutorLogin,
  errorMessage,
  userInfoStorage,
  updateDeviceToken
};
export default authService;
