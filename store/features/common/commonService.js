import axios from 'axios';
import { BASE_URL } from '../../../components/constants/Config';

const getTypeList = async reqData => {
  const response = await axios.post(`${BASE_URL}types/typeList`, reqData.data);
  return response.data.data;
};
const getIndustryList = async reqData => {
  const response = await axios.post(
    `${BASE_URL}industry/industryList`,
    reqData.data,
  );
  return response.data.data;
};
const getSpecializationList = async reqData => {
  const response = await axios.post(
    `${BASE_URL}specialization/specializationList`,
    reqData.data,
  );
  return response.data.data;
};
const getSkillsList = async reqData => {
  const response = await axios.post(
    `${BASE_URL}skills/skillsList`,
    reqData.data,
  );
  return response.data.data;
};

const uploadFile = async reqData => {
  // const response = await axios.post(`${BASE_URL}upload/uploadFile`, reqData);
  // return response.data.data;
  let data = new FormData();
  data.append(
    'file',
    JSON.stringify({
      name: 'placeholder.jpg',
      uri: reqData.path,
      type: 'image/jpg',
    }),
  );
  const config = {
    method: 'post',
    body: data,
  };
  fetch(`${BASE_URL}upload/uploadFile`, config)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);
};

const errorMessage = error => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

const commonService = {
  errorMessage,
  getTypeList,
  getIndustryList,
  getSpecializationList,
  getSkillsList,
  uploadFile,
};
export default commonService;
