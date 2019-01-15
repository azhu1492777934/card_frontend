import vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {getStorage} from "../utilies";

const service = axios.create({
    timeout: 10000
})
service.interceptors.request.use(function (config) {

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

service.interceptors.response.use(function (response) {
    return response.data
})


function _post(url,param){
    return new Promise((resolve,reject)=>{
        service({
            method:'post',
            url,
            data:param,
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            resolve({
                state:0,
                msg:'服务出小差啦，请稍后再试'
            })
        })
    })
}


function _get(url,param){

    return new Promise((resolve,reject)=>{
        service({
            method:'get',
            url,
            params:param,
            // cancelToken:new CancelToken(c=>{
            //     cancel=c
            // })
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            resolve({
                state:0,
                msg:'服务出小差啦，请稍后再试'
            })
        })
    })
}

export {_post, _get}