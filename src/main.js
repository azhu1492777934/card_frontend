import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from '../src/store/index'

import 'normalize.css'
import '../src/assets/css/reset.css'
import '../src/assets/less/common.less'
import '../src/assets/css/SourceHanSansCNRegular.css'

import 'lib-flexible/flexible'
import vueWeChatTitle from 'vue-wechat-title'
import globalFunction from '../src/utilies/global_function'//全局函数
import {_get} from "./http";

const wx = require('weixin-js-sdk');
Vue.prototype.wx = wx

router.afterEach((to,from)=>{
    _get('/api/v1/app/sign_info')
        .then(res=>{
            if(res.state==1){
                wx.config({
                    debug: false,
                    appId: res.data.appId,
                    signature: res.data.sign,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.noncestr,
                    // timestamp:Math.round(new Date().getTime() / 1000),
                    // nonceStr:new Date().getMilliseconds()+'0'+Math.floor(Math.random()*10000),
                    jsApiList: ["scanQRCode"]
                })
            }
        })
})

Vue.config.productionTip = false
Vue.use(globalFunction)
Vue.use(vueWeChatTitle)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
