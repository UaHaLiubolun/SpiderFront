import Vue from 'vue'
import Router from 'vue-router'
import SpiderList from '@/components/SpiderList'
import Home from '@/components/Home'
import ListInfo from '@/components/ListInfo'
import AddSite from '@/components/AddSite'
import Tree from '@/components/Tree'
import TreeDetail from '@/components/TreeDetail'

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
        },
        {
          path: '/site/add',
          name: 'addSite',
          component: AddSite
        }
      ]
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Tree,
      children: [
        {
          path: '/treeDetail/:id',
          name: 'TreeDetail',
          component: TreeDetail
        },
      ]
    }
  ]
})
