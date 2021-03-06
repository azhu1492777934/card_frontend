import axios from 'axios'
import qs from 'qs'
import {getStorage, getCardServerToken} from "../utilies";

// axios.defaults.timeout =  10000;

axios.interceptors.request.use(function (config) {

  if (config.method === 'post' && config.url.indexOf('/accountCenter') !== -1||config.method === 'post' && config.url.indexOf('/recharge/refund') !== -1||config.method === 'post' && config.url.indexOf('Refund/getRefund') !== -1||config.method === 'post' && config.url.indexOf('/appRateApi') !== -1) {
    config.data = qs.stringify(config.data);
    config.data = config.data
  }
  if (getStorage('token')) {
    config.headers.Authorization = getStorage('token');
  }
  // 处理数据
  if (config.url.indexOf('/api') !== -1||config.url.indexOf('/newiot') !== -1) {
    if (config.method === 'post') {
      config.headers['Qhyl-Token'] = getCardServerToken(config.data)
    } else if (config.method === 'get') {
      config.headers['Qhyl-Token'] = getCardServerToken(config.params)
    }
  }
  return config;  //添加这一行
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response.data
}, err => {
  if (Object.prototype.toString.call(err) === '[object object]' || Object.prototype.toString.call(err) === '[object Error]') {
    if (err.response.status && err.response.status === 401 && err.config.url.indexOf('/accountCenter') > -1) {
      return Promise.resolve(err.response.data);
    } else if (err.response.data.error === 10007 && err.config.url.indexOf('/accountCenter') > -1) {
      return Promise.resolve(err.response.data)
    } else {
      let msg;
      err.response.status ? msg = `服务出小差啦${err.response.status}` : msg = '好像找不到资源了';
      return Promise.resolve({
        status: err.response.status ? err.response.status : 200,
        state: 0,
        msg: msg
      });
    }
  }
});

function _post(url, param) {
  return axios({
    method: 'post',
    url,
    data: param,
  })
}

function _get(url, param) {
  return axios({
    method: 'get',
    url,
    params: param,
  })
}

export {_post, _get}