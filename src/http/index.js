import vue from 'vue'
import axios from 'axios'
const service = axios.create({
    timeout:5000
})
service.interceptors.request.use(function (config) {
    
})

service.interceptors.response.use(function (response) {
    
})

function _post(url,data){
    service.post({
        method:'post',
        url:url,
        data:data,
    })
}

function _get(url,data) {
    service.get({
        url:url,
        data:data,
    }).then(response =>{
        resolve(response.data)
    }).then(err =>{
        reject(err)
    })
}
export {_post,_get}