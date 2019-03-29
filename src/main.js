import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from '../src/store/index'

import 'normalize.css'
require('../src/assets/css/loading/index.css')
require( '../src/assets/css/reset.css')
require( '../src/assets/less/common.less')
require('../src/assets/css/SourceHanSansCNRegular.css')

require('../src/assets/js/sha1.min')

// require('./mock')
require('../src/assets/js/sha1.min')

import 'lib-flexible/flexible'
import vueWeChatTitle from 'vue-wechat-title'
import globalFunction from '../src/utilies/global_function'//全局函数
import {_get} from "./http";
import {checkBrowser} from "./utilies";

import global_variables from '../src/utilies/domain'

const wx = require('weixin-js-sdk');
Vue.prototype.wx = wx;
Vue.prototype.global_variables = global_variables;

router.afterEach((to,from)=>{
    const u = navigator.userAgent.toLowerCase();
    if(u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger') return;
    if (to.path !== global.location.pathname) {
        location.assign(to.fullPath);
    };
    if(checkBrowser()=='wechat'){

        if(to.path=='/weixin/card/lookup'){
            _get('/api/v1/app/sign_info')
                .then(res=>{
                    if(res.state==1){
                        wx.config({
                            debug: false,
                            appId: res.data.appId,
                            signature: res.data.sign,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.noncestr,
                            jsApiList: ["scanQRCode"]
                        })
                    }
                })
        }

    }
});

Vue.config.productionTip = false;
Vue.use(globalFunction)
Vue.use(vueWeChatTitle)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
