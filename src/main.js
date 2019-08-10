import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from '../src/store/index'
import 'normalize.css'

import {GetUrlRelativePath} from './utilies/index'
import {Popover} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Popover);
import { Dialog } from 'vant';
Vue.use(Dialog);
require('../src/assets/css/loading/index.css');
require('../src/assets/css/reset.css');
require('../src/assets/css/SourceHanSansCNRegular.css');
require('./mock');
require('../src/assets/js/sha1.min');

import 'lib-flexible/flexible'
import vueBounce from 'vue-bounce'
import vueWeChatTitle from 'vue-wechat-title'
import globalFunction from '../src/utilies/global_function'//全局函数
import {_get} from "./http";
import {checkBrowser} from "./utilies";

import global_variables from '../src/utilies/domain'

const wx = require('weixin-js-sdk');
Vue.prototype.wx = wx;
Vue.prototype.global_variables = global_variables;


// 扫码请求
let scanUrlArray = ['/mifi/card/lookup', '/weixin/card/lookup', '/weixin/question/eqReplaceMent'];
let scanApi = global_variables.packed_project === 'mifi' ? '/api/v1/app/mifi_sign_info' : '/api/v1/app/sign_info';

router.afterEach((to, from) => {
  if (checkBrowser() === 'wechat') {
    if (scanUrlArray.includes(to.path)) {
      _get(scanApi, {url: `${global_variables.authorized_redirect_url}${to.path}`})
        .then(res => {
          if (res.state === 1) {
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
  const u = navigator.userAgent.toLowerCase();
  if (u.indexOf("like mac os x") < 0 || u.match(/MicroMessenger/i) != 'micromessenger') return;
  
  if (to.path !== global.location.pathname) {
    location.assign(to.fullPath);
  }
});

//适配IOS
window.appToken = function (msg) {
  localStorage.setItem("token", msg);
};

Vue.config.productionTip = false;
Vue.use(globalFunction);
Vue.use(vueWeChatTitle);
Vue.use(vueBounce);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
