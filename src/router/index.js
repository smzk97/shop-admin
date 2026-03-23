import { createRouter, createWebHashHistory } from 'vue-router'
import HomeIndex from '@/page/HomeIndex.vue'
import AboutPage from '@/page/AboutPage.vue'
import NotFound from '@/page/NotFound.vue'
import LoginIndex from '@/page/LoginIndex.vue'

const routes = [
  { path: '/', component: HomeIndex },
  { path: '/about', component: AboutPage },
  { path: '/login', component: LoginIndex },
  { path: '/:matchPath(.*)*', component: NotFound },
  
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router