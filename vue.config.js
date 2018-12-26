module.exports = {
    devServer: {
        disableHostCheck:true,
        proxy: {
            '/api': {
                target: 'https://zfbtest.china-m2m.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/wy':{
                target:'http://music.163.com/api',
                changeOrigin:true,
                pathRewrite:{
                    '^/wy':''
                }
            },
        }
    }
}