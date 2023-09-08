import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const getCourseList = async (token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}scheduleClass/courseTutorList`,
    {},
    config,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCronNotifylist = async (token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}course/notifylist`,
    {},
    config,
  );
  return { data: response.data.data };
};

const getUpNextCourses = async (token, data) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}course/upNextcourse`,
    {
      itemPerPage: data.itemPerPage,
      page: data.page,
    },
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
    `${BASE_URL}course/courseTutorList`,
    {
      itemPerPage: data.itemPerPage,
      page: data.page,
    },
    config,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCourseDetails = async (id, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}scheduleClass/getDetailsCourse/${id}`,
    config,
  );
  return response.data;
};

const getlevelList = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}level/levelList`,
    reqData.data,
    config,
  );
  return response.data.data;
};

const createCourseAPI = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}scheduleClass/createCourse`,
    reqData.data,
    config,
  );
  return response.data.data;
};

const updateCourseAPI = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}scheduleClass/updateCourse/${reqData.editId}`,
    reqData.data,
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
const tutorCourseService = {
  getCourseList,
  getCourseListByParam,
  getCourseDetails,
  createCourseAPI,
  updateCourseAPI,
  getlevelList,
  getNotifications,
  getCronNotifylist,
  getUpNextCourses,
  errorMessage,
};

export default tutorCourseService;
