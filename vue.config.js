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

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    configureWebpack:config=>{
        if(process.env.NODE_ENV === 'production'){
            return{
                plugins:[new CompressionPlugin({
                    test:/\.js$|\.html$|\.css/,
                    threshold:1024, //对超过1k的数据进行压缩
                    deleteOriginalAssets:false//是否删除源文件
                })]
            }
        }
    },
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
                target:'http://uc-test.api.china-m2m.com',
                changeOrigin:true,
                pathRewrite:{
                    '^/accountCenter':''
                }
            },
            '/iot':{
                target:'https://iottest.china-m2m.com',
                changeOrigin:true,
                pathRewrite:{   
                    '^/iot':''
                }
            },
            '/releaseApi':{
                target:"http://cardserver_mac.china-m2m.com",
                changeOrigin:true,
                pathRewrite:{
                    '^/releaseApi':""
                }
            },
            '/kachiApi':{
                target:"http://kachitest.china-m2m.com",
                changeOrigin:true,
                pathRewrite:{
                    '^/kachiApi':""
                }
            },
            
        }
    }
}