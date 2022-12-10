import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home.vue'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/project.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/tkinter-helper/'
})

const whiteList = ['/login', '/about', '/help', '/']

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.error("当前页面需登录才可访问!")
      next('/login')
    }
  }
})

export default router
