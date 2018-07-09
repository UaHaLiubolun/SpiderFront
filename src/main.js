import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import axios from 'axios'


Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
