import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import Home from '../views/Home'
import User from '../views/User'
import Mission from '../views/Mission'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'Layout',
      redirect: '/user',
      component: Layout,
      children: [
          {
              path: '/home',
              name: 'Home',
              component: Home,
              meta: {
                  title: 'Home'
              }
          },
          {
              path: '/user',
              name: 'User',
              component: User,
              meta: {
                  title: 'User'
              }
          },
          {
              path: '/mission',
              name: 'Mission',
              component: Mission,
              meta: {
                  title: 'Mission'
              }
          },
          
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
