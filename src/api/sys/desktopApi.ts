import axios from 'axios';
// 获取基本信息
export const getBaseInfo = (params) =>
  axios
    .get('/js/api/desktop/getBaseInfo', { params: params })
    .then((response) => {
      // 处理响应数据
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // 处理错误
      // console.error(error);
      throw error;
    });
// 查询预约数据
export const listAppointment = (params) =>
  axios
    .get('/js/api/desktop/listAppointment', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
// 医生建议
export const listAdvice = (params) =>
  axios
    .get('/js/api/desktop/listAdvice', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
// 实时信息
export const getNowInfo = (params) =>
  axios
    .get('/js/api/desktop/getNowInfo', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
// 体温图表
export const listTemprature = (params) =>
  axios
    .get('/js/api/desktop/listTemprature', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
// 心率图表
export const listHeartRate = (params) =>
  axios
    .get('/js/api/desktop/listHeartRate', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
// 血压图表
export const listBloodPressure = (params) =>
  axios
    .get('/js/api/desktop/listBloodPressure', { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
