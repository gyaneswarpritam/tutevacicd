import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const getCourseList = async (data) => {
  const response = await axios.post(
    `${BASE_URL}scheduleClass/allcourse`,
    data,
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCourseNameList = async () => {
  const response = await axios.get(
    `${BASE_URL}scheduleClass/courseNameList`
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};

const getCourseListByParam = async (data) => {
  const response = await axios.post(
    `${BASE_URL}scheduleClass/allcourse`,
    {
      itemPerPage: data.itemPerPage,
      page: data.page,
      name: data?.name
    }
  );
  return { data: response.data.data, totalPages: response.data.totalPages };
};


const getCourseDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}scheduleClass/getCourseStudent/${id}`
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
const commonCourseService = {
  getCourseList,
  getCourseListByParam,
  getCourseDetails,
  errorMessage,
  getCourseNameList
};

export default commonCourseService;
