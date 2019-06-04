import Vue from 'vue'
import Router from 'vue-router'
import ShowTimeLine from '@/components/ShowTimeLine'
import EditTimeLine from '@/components/EditTimeLine'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/show',
      name: 'show',
      component: ShowTimeLine
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditTimeLine
    }
  ]
})
