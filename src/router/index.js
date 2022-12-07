import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectCreateView from '../views/ProjectCreateView.vue'
import MemberCreateView from '../views/MemberCreateView.vue'
import GoogleLogin from '../views/GoogleLogin.vue'

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
  {
    path: '/google/callback/',
    name: 'GoogleLogin',
    component: GoogleLogin
  },
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
    path: '/project/:id',
    name: 'projectdetail',
    props: true,
    component: () =>
      import(/* webpackChunkName: "project" */ '../views/ProjectDetailVeiw.vue')
  },
  {
    path: '/projectcreate',
    name: 'projectcreate',
    component: ProjectCreateView
  },
  {
    path: '/project/:id/membercreate',
    name: 'membercreate',
    component: MemberCreateView
  },
  {
    path: '/project/:id/todo',
    name: 'todo_project',
    component: () =>
      import(/* webpackChunkName: "project" */ '../views/TodoProjectView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
