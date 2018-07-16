import Vue from 'vue'
import Router from 'vue-router'
import SpiderList from '@/components/SpiderList'
import Home from '@/components/Home'
import ListInfo from '@/components/ListInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/spider',
      name: 'SpiderList',
      component: SpiderList
    },
    {
      path: '/home',
      name: 'Name',
      component: Home,
      children: [
        {
          path: '/listInfo/:url',
          name: 'ListInfo',
          component: ListInfo
        }
      ]
    }
  ]
})
