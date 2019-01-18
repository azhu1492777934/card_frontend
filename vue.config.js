/*
* payCenter:支付中心
* accountCenter:用户中心
* card_server:后台
* card_server2:包月套餐解约
* */


var domain_test = {
    card_server : 'https://cardserver_test.china-m2m.com',
    accountCenter : 'http://uc-test.api.china-m2m.com',
    card_server2:'http://cardserver_mac.china-m2m.com/'
}
var domain_production = {
    card_server : 'https://cardserver_test.china-m2m.com',
    accountCenter : 'http://uc.api.china-m2m.com',
}

module.exports = {
    devServer: {
        port:8080,
        disableHostCheck:true,
        proxy: {
            '/api': {
                target:'http://cardserver_test.china-m2m.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/accountCenter':{
                // target:domain_test.accountCenter,
                target:'http://uc-test.api.china-m2m.com',
                changeOrigin:true,
                pathRewrite:{
                    '^/accountCenter':''
                }
            },
            '/releaseApi':{
                target:domain_test.card_server2,
                changeOrigin:true,
                pathRewrite:{
                    '^/releaseApi':""
                }
            },
        }
    }
}