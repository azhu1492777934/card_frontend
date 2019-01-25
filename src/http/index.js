import axios from 'axios'
import qs from 'qs'
import {getStorage} from "../utilies";

// axios.defaults.timeout =  10000;

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

    if(Object.prototype.toString.call(err)=='[object object]'){
        return Promise.resolve({
            state:0,
            msg:'服务出小差啦('+ err.response.status+')'
        })
    }
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