import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

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
    path: '/projectindex',
    name: 'projectindex',
    component: () =>
      import(
        /* webpackChunkName: "projectindex" */ '../views/ProjectIndexView.vue'
      )
  },
  {
    path: '/projectcreate',
    name: 'projectcreate',
    component: () =>
      import(
        /* webpackChunkName: "projectcreate" */ '../views/ProjectCreateView.vue'
      )
  },
  {
    path: '/membercreate',
    name: 'membercreate',
    component: () =>
      import(
        /* webpackChunkName: "projectcreate" */ '../views/MemberCreateView.vue'
      )
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
