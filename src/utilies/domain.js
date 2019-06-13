/*
* 支付中心重定向url
* */
let global_variables = {
    packed_project : 'mifi', // 修改项目
    authorized_redirect_url : '',
    version : '1.1',
    mifi_project:{
        empty_router_url:'/mifi/card/index',
        DevelopDomain : 'http://mifiserver-test.china-m2m.com',
        ProductionDomain : 'https://mifiserver.china-m2m.com',
        app_key: 'LKyU8N3izh7b28dnQl5Wqziq6m',
        app_secret: 'fyGDWOHCfgyBHmHmY30Z3aE1k9mv1RXp6fYooK6sX728U',
    },
    card_project:{
        empty_router_url: '/weixin/card/lookup',
        DevelopDomain : 'http://cardserver-test.china-m2m.com',
        ProductionDomain : 'https://cardserver.china-m2m.com',
        app_key: 'XznBRoBGEgoCUtZbDbtL0G1QhE',
        app_secret: 'EThOWYkcwsrrCEsFTbgvHFWLaEJwrThDcYqrPbIuhufVp',
    },
    new_project:{
        empty_router_url: '/weixin/card/lookup',
        DevelopDomain : 'https://cardserver.qiyu-m2m.com',
        ProductionDomain : 'https://cardserver.qiyu-m2m.com',
    }
}

/*
* 当前打包项目
* */
// if(process.env.NODE_ENV == 'development'){
if(process.env.NODE_ENV == 'production'){
    global_variables.authorized_redirect_url = global_variables[`${global_variables.packed_project}_project`].ProductionDomain;
}else{
    global_variables.authorized_redirect_url = global_variables[`${global_variables.packed_project}_project`].DevelopDomain;
}

export default global_variables
