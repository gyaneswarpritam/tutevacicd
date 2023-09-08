import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const updateTutorPassword = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}tutors/updateTutorPassword/${reqData.editId}`,
    reqData.data,
    config,
  );
  return response.data.data;
};

const getDetails = async (tutorId, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}tutors/getDetails/${tutorId}`,
    config,
  );
  return response.data.data;
};

const updateTutor = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}tutors/updateTutor/${reqData.tutorId}`,
    reqData.data,
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
const tutorProfileService = {
  updateTutorPassword,
  updateTutor,
  getDetails,
  errorMessage,
};

export default tutorProfileService;
