import axios from 'axios';
const baseURL = 'https://account.wps.cn';

const account = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

// 添加响应拦截器
account.interceptors.response.use(
  response => {
    if (!response) {
      // 可以跳转到错误页面
    }
    return response.data;
  },

  error => {
    return Promise.reject(error);
  }
);

export default account;
