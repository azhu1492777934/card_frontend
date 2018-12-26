import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'normalize.css'
import '../src/assets/css/reset.css'
import '../src/assets/less/common.less'
// import 'flexible'
import 'lib-flexible/flexible'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
