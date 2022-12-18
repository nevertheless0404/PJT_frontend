import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// axios를 import
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'
import koKR from '@kangc/v-md-editor/lib/lang/ko-KR'

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueMarkdownEditor)
VueMarkdownEditor.lang.use('ko-KR', koKR)
Vue.config.productionTip = false


axios.defaults.baseURL = process.env.VUE_APP_API_URL

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$axios = axios
// 다른 컴포넌트에서는 import 없이 this.$axios로 사용가능
