import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectCreateView from '../views/ProjectCreateView.vue'
import MemberCreateView from '../views/MemberCreateView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   // route level code-splitting
  //   // this generates a separate chunk (login.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  // },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  {
    path: '/project',
    name: 'projectindex',
    component: () =>
      import(/* webpackChunkName: "project" */ '../views/ProjectIndexView.vue')
  },
  {
    path: '/projectcreate',
    name: 'projectcreate',
    component: ProjectCreateView
  },
  {
    path: '/membercreate',
    name: 'membercreate',
    component: MemberCreateView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
