import axios from 'axios';
const baseURL = 'https://f-api.wps.cn';
import CryptoJS from 'crypto-js';
const request = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

const globalConfig = {
  signature: {
    open: true,
    appKey: 'REFORM202006166U9R63MRV',
    appSecret: 'ptkAOFdsOFbvm9qQR50IHmVIUMcSSw3vsQh',
  },
};

// 需要加上拦截的请求
const interCeptUrl = [
  '/global/forms',
  '/global/global_collections',
  '/global/forms/search',
  '/global/forms/star',
  '/global/forms/delete',
  '/global/forms/duplicate',
  '/global/tags',
  '/global/tags/create',
  '/global/tags/update',
  '/global/tags/delete',
  '/global/template/create',
  '/global/tag/form',
  '/global/fills/delete',
  '/global/tag/form/create',
  '/global/tag/form/delete',
];

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    if (interCeptUrl.includes(config.url as string) || config.url?.startsWith('/global/form')) {
      // 给指定的请求加上header
      const md5 = CryptoJS.MD5(config.url as string).toString(CryptoJS.enc.Hex);
      const xDate = new Date().getTime().toString();
      const sha1Hash = CryptoJS.algo.SHA1.create();
      sha1Hash.update(globalConfig.signature.appSecret);
      sha1Hash.update(md5);
      sha1Hash.update(xDate);
      const hashResult = sha1Hash.finalize();
      const authorization = 'WPS-2:'.concat(
        globalConfig.signature.appKey,
        ':',
        hashResult.toString(CryptoJS.enc.Hex)
      );
      config.headers.set('X-Date', xDate);
      config.headers.set('Content-Md5', md5);
      config.headers.set('Authorization', authorization);
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    if (!response) {
      // 可以跳转到错误页面
    }

    //
    if (response.data.code !== 0) {
      // 这里可以进行错误处理
      return response.data;
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
