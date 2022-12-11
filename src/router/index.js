import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectCreateView from '../views/ProjectCreateView.vue'
import ProjectUpdateView from '../views/ProjectUpdateView.vue'
import MemberCreateView from '../views/MemberCreateView.vue'
import MarkdownView from '../views/MarkdownView.vue'
import GoogleLogin from '../views/GoogleLogin.vue'
import ProjectInformsView from '../views/ProjectInformsView.vue'
import ProjectMemberView from '../views/ProjectMemberView.vue'

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
    path: '/project/:id/update',
    name: 'projectupdate',
    props: true,
    component: ProjectUpdateView
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
  },
  {
    path: '/project/:id/markdown',
    name: 'markdown',
    component: MarkdownView
  },
  {
    path: '/project/:id/Informs',
    name: 'projectnotice',
    component: ProjectInformsView
  },
  {
    path: '/project/:id/Member',
    name: 'projectmember',
    component: ProjectMemberView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
