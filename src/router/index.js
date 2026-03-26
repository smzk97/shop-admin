import { createRouter, createWebHashHistory } from 'vue-router'
import HomeIndex from '@/page/HomeIndex.vue'
import AboutPage from '@/page/AboutPage.vue'
import NotFound from '@/page/NotFound.vue'
import LoginIndex from '@/page/LoginIndex.vue'
import adminIndex from '@/layouts/adminIndex.vue'

const routes = [
  {
    path: '/',
    component: adminIndex,
    children: [{
      path: '',
      component: HomeIndex,
      meta: { title: "首页" }
    }]
  },
  { path: '/about', component: AboutPage, meta: { title: "关于" } },
  { path: '/login', component: LoginIndex, meta: { title: "登录" } },
  { path: '/:matchPath(.*)*', component: NotFound, meta: { title: "404" } },
  
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router