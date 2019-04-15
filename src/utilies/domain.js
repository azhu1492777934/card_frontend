/*
* 支付中心重定向url
* */
let global_variables = {
    packed_project : 'mifi1', // 修改项目
    authorized_redirect_url : '',
    version : '1.1',
    mifi_project:{
        empty_router_url:'/mifi/card/index',
        mifiDevelopDomain : 'http://mifiserver-test.china-m2m.com',
        mifiProductionDomain : 'https://mifiserver.china-m2m.com',
    },
    card_project:{
        empty_router_url: '/weixin/card/lookup',
        cardDevelopDomain : 'http://cardserver-test.china-m2m.com',
        cardProductionDomain : 'https://cardserver.china-m2m.com',
    }
}
/*
* 当前打包项目
* */

// if(process.env.NODE_ENV == 'development'){
if(process.env.NODE_ENV == 'production'){
    global_variables.authorized_redirect_url = global_variables.packed_project === 'mifi' ? global_variables.mifi_project.mifiProductionDomain : global_variables.card_project.cardProductionDomain;
}else{
    global_variables.authorized_redirect_url = global_variables.packed_project === 'mifi' ? global_variables.mifi_project.mifiDevelopDomain : global_variables.card_project.cardDevelopDomain;
}
export default global_variables;