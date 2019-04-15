import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

//统一拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//     return error
//   });


/* post方式下params为公共参数，data为需要传入的参数,需要将JSON格式用qs转成FORM表单格式 */
/* get方式下全部参数丢params里，不用传data*/ 


//获取token
export const getChargeRecord= obj => {return axios.get('api/v1/app/cards/refund/list?'+obj.params,).then(res=>res.data).catch(error=>error);};


//新增车辆
//  export const addCar= obj => {return axios.post('api/v1/vehicle/save-update-vehicle?'+obj.params,qs.stringify(obj.data)).then(res=>res.data).catch(error=>error);};


