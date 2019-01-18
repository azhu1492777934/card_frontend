import axios from 'axios'
import qs from 'qs'
import {getStorage} from "../utilies";

// const service = axios.create({
//     timeout: 10000
// })
axios.interceptors.request.use(function (config) {

    if (config.method === 'post' && config.url.indexOf('/accountCenter') !=-1 ) {
        config.data = qs.stringify(config.data);
        config.data = config.data
    }

    if(getStorage('token')){
        config.headers.Authorization =  getStorage('token');
    }

    // if(returnCitySN.cip){
    //     config.headers.ip = returnCitySN.cip
    // }

    return config;  //添加这一行
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data
},err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.msg = '请求错误'
                break
            case 401:
                err.msg = '未授权，请登录'
                break
            case 403:
                err.msg = '拒绝访问'
                break
            case 404:
                err.msg = `请求地址出错: ${err.response.config.url}`
                break
            case 408:
                err.msg = '请求超时'
                break
            case 500:
                err.msg = '服务器内部错误'
                break
            case 501:
                err.msg = '服务未实现'
                break
            case 502:
                err.msg = '网关错误'
                break
            case 503:
                err.msg = '服务不可用'
                break
            case 504:
                err.msg = '网关超时'
                break
            case 505:
                err.msg = 'HTTP版本不受支持'
                break
            default:
        }
    }
    err.state = 0;
    alert('请求拦截错误 ');
    alert(err)
    return Promise.resolve(err)
})


function _post(url,param){

    return axios({
        method:'post',
        url,
        data:param,
    })


    // return new Promise((resolve,reject)=>{
    //     service({
    //         method:'post',
    //         url,
    //         data:param,
    //     }).then(res=>{
    //         resolve(res)
    //     }).catch(err=>{
    //         resolve({
    //             state:0,
    //             msg:'服务出小差啦，请稍后再试'
    //         })
    //     })
    // })
}


function _get(url,param){

    return axios({
        method:'get',
        url,
        params:param,
    })

    // return new Promise((resolve,reject)=>{
    //     service({
    //         method:'get',
    //         url,
    //         params:param,
    //         // cancelToken:new CancelToken(c=>{
    //         //     cancel=c
    //         // })
    //     }).then(res=>{
    //         resolve(res)
    //     }).catch(err=>{
    //         resolve({
    //             state:0,
    //             msg:'服务出小差啦，请稍后再试'
    //         })
    //     })
    // })
}

export {_post, _get}