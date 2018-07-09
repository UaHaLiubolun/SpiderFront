import Vue from 'vue'
import Router from 'vue-router'
import SpiderList from '@/components/SpiderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/spider',
      name: 'SpiderList',
      component: SpiderList
    }
  ]
})
