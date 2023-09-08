import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const updateStudentPassword = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}student/updateStudentPassword/${reqData.editId}`,
    reqData.data,
    config,
  );
  return response.data.data;
};

const updateStudent = async (reqData, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_URL}students/updateStudent/${reqData.studentId}`,
    reqData.data,
    config,
  );
  return response.data.data;
};

const getDetails = async (studentId, token) => {
  const config = {
    headers: {
      'x-auth-token': `${token}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}students/getDetails/${studentId}`,
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
const studentProfileService = {
  updateStudentPassword,
  updateStudent,
  getDetails,
  errorMessage,
};

export default studentProfileService;
