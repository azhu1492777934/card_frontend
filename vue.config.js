const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  chainWebpack: config => {
    // 移除prefetch 插件
    config.plugins.delete('prefetch')
    // 另一种做法
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || [];
    //   options[0].fileBlacklist.push(/myasynncRoute(.)+?\.js$/);
    //   return options
    // })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 1024, //对超过1k的数据进行压缩
          deleteOriginalAssets: false//是否删除源文件
        })]
      }
    }
  },
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://cardserver_test.china-m2m.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/accountCenter': {
        target: 'http://uc-test.api.china-m2m.com',
        changeOrigin: true,
        pathRewrite: {
          '^/accountCenter': ''
        }
      },
      '/iot': {
        target: 'https://iottest.china-m2m.com',
        changeOrigin: true,
        pathRewrite: {
          '^/iot': ''
        }
      },
      '/releaseApi': {
        target: "http://cardserver_mac.china-m2m.com",
        changeOrigin: true,
        pathRewrite: {
          '^/releaseApi': ""
        }
      },
      '/kachiApi': {
        target: "http://kachitest.china-m2m.com",
        changeOrigin: true,
        pathRewrite: {
          '^/kachiApi': ""
        }
      },

    }
  }
}