import axios from 'axios'
import qs from 'qs'
import {getStorage} from "../utilies";

axios.defaults.timeout =  10000;

axios.interceptors.request.use(function (config) {

    if (config.method === 'post' && config.url.indexOf('/accountCenter') !=-1 ) {
        config.data = qs.stringify(config.data);
        config.data = config.data
    }

    if(getStorage('token')){
        config.headers.Authorization =  getStorage('token');
    }

    return config;  //添加这一行
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data
},err => {
    let errCode = err.response.status;
    return Promise.resolve({
        state:0,
        msg:'服务出小差啦('+errCode+')'
    })
})


function _post(url,param){

    return axios({
        method:'post',
        url,
        data:param,
    })
}


function _get(url,param){

    return axios({
        method:'get',
        url,
        params:param,
    })
}

export {_post, _get}