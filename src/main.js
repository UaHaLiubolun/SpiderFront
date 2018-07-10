import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import tools from '@/tools'

const url = "http://localhost:8080"

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$url = url

Object.defineProperty(Vue.prototype, '$tools', {value: tools})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
