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
  pwa: {
    iconPaths: {
      favicon16: 'img/icons/favicon-16x16.png',
      favicon32: 'img/icons/favicon-32x32.png',
      appleTouchIcon: 'img/icons/favicon-32x32.png',
      maskIcon: 'img/icons/favicon-32x32.png',
      msTileImage: 'img/icons/favicon-32x32.png',
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
        target: 'https://iottt.china-m2m.com',
        changeOrigin: true,
        pathRewrite: {
          '^/iot': ''
        }
      },
      '/kachiApi': {
        target: "http://kachitest.china-m2m.com",
        changeOrigin: true,
        pathRewrite: {
          '^/kachiApi': ""
        }
      },
      '/newiot': {
        target: "http://iotmanager-test.china-m2m.com",
        changeOrigin: true,
        pathRewrite: {
          '^/newiot': ""
        }
      },
      '/pay': {
        target: "https://paytt.china-m2m.com",
        changeOrigin: true,
        pathRewrite: {
          '^/pay': ""
        }
      },
    }
  }
}