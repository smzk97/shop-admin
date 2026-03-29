import router from '@/router/index'
import { addRoutes } from '@/router/index'
import { getToken } from '@/composable/auth'
import { Notification } from '@/composable/utility'
import { useUserMsgStore } from '@/store/index'

let hasGetInfo = false
// 全局前置守卫
router.beforeEach(async (to, from) => {

    // 获取token
    const token = getToken()

    // 进度条显示
    // showFullLoading()

    // 权限验证
    if (!token && to.path != '/login') {
        Notification('请先登录', 'error')
        return { path: '/login' }
    }

    // 防止重复登录
    if (token && to.path == '/login') {
        Notification('请勿重复登录', 'error')
        return { path: from.path ? from.path : '/home' }
    }

    if (token && to.path == '/')
        return { path: '/home' }

    // 如果token存在，获取用户信息
    let hasNewRoute = false
    if (token) {
        const useStore = useUserMsgStore()
        if (Object.keys(useStore.user).length === 0) {
            const data = await useStore.getInfoWrap()
            const menus = data.data.menus
            hasNewRoute = addRoutes(menus)
            // return hasNewRoute ? { ...to, replace: true } : true
            return { ...to, replace: true }
        }
    }
    document.title = to.meta.title + '-后台管理'
})

// 全局后置守卫
// router.afterEach((to, from) => {
//     // 关闭进度条显示
//     hideFullLoading()
// })
