/*
* 支付中心重定向url
* */
import cardEnv from './env/env.card';
import mifiEnv from './env/env.mifi';

let global_variables = {
    packed_project : 'mifi1', // 修改项目
    authorized_redirect_url : '',
    version : '1.1',
    isIos:navigator.userAgent.toLowerCase().indexOf('iphone') > -1 ? true : false ,//判断是否为ios
}
/*
* 当前打包项目
* */

if(process.env.NODE_ENV == 'development'){
// if(process.env.NODE_ENV == 'production'){
    global_variables.authorized_redirect_url = global_variables.packed_project == 'mifi' ?
        mifiEnv.mifiProductionDomain : cardEnv.cardProductionDomain;
}else{
    global_variables.authorized_redirect_url = global_variables.packed_project == 'mifi' ?
        mifiEnv.mifiDevelopDomain : cardEnv.cardDevelopDomain;
}
export default global_variables