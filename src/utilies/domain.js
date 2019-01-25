/*
* 支付中心重定向url
* */

let global_variables = {
    authorized_redirect_url : '',
    version : '1.0'
}

// if(process.env.NODE_ENV == 'development'){
if(process.env.NODE_ENV == 'production'){
    global_variables.authorized_redirect_url = 'http://cardserver.china-m2m.com'
}else{
    global_variables.authorized_redirect_url = 'http://cardserver-test.china-m2m.com'
}

export default global_variables