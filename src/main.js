import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'normalize.css'
import '../src/assets/css/reset.css'
import '../src/assets/less/common.less'
// import 'flexible'
import 'lib-flexible/flexible'
import vueWeChatTitle from 'vue-wechat-title'
import globalFunction from '../src/utilies/global_function'//全局函数
import {domain_list,domain_list_test} from "./utilies/domain";
Vue.prototype.domain_list = domain_list
Vue.prototype.domain_list_test = domain_list_test;
Vue.config.productionTip = false

Vue.use(globalFunction)
Vue.use(vueWeChatTitle)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
