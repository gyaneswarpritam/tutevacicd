import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const getCourseList = async (data, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}scheduleClass/allCourses`,
    data,
    config,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCourseNameList = async (token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}course/courseNameList`,
    config,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCourseListByParam = async (token, data) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}course/courseList`,
    {
      itemPerPage: data.itemPerPage,
      page: data.page,
      name: data?.name
    },
    config,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getLevelList = async token => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(`${BASE_URL}level/levelList`, {}, config);
  return response.data.data;
};

const getCourseDetails = async (id, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}course/getCourseStudent/${id}`,
    config,
  );
  return response.data.data;
};

const studentEnrollToCourse = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}course/mapCourse/${reqData.courseId}/${reqData.userId}`,
    {},
    config,
  );
  return response.data.data;
};

const addNotifications = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}notification/create`,
    reqData,
    config,
  );
  return response.data.data;
};

const addPushNotifications = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}notification/push`,
    reqData,
    config,
  );
  return response.data.data;
};
const getNotifications = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}notification/getDetails`,
    reqData,
    config,
  );

  return response.data.data;
};

const errorMessage = error => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};
const studentCourseService = {
  getCourseList,
  getCourseListByParam,
  getCourseDetails,
  getLevelList,
  studentEnrollToCourse,
  addNotifications,
  getNotifications,
  errorMessage,
  addPushNotifications,
  getCourseNameList
};

export default studentCourseService;
