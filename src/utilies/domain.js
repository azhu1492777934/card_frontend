/*
* 支付中心重定向url
* */

let global_variables = {
    authorized_redirect_url : '',
    version : '1.1',
    isIos:navigator.userAgent.toLowerCase().indexOf('iphone') > -1 ? true : false ,//判断是否为ios
}

if(process.env.NODE_ENV == 'development'){
// if(process.env.NODE_ENV == 'production'){
    global_variables.authorized_redirect_url = 'http://mifiserver-test.china-m2m.com'
    // global_variables.authorized_redirect_url = 'https://cardserver.china-m2m.com'
}else{
    // global_variables.authorized_redirect_url = 'http://cardserver-test.china-m2m.com'

    global_variables.authorized_redirect_url = 'http://mifiserver-test.china-m2m.com'
}

export default global_variables