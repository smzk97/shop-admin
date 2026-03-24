import router from '@/router/index'
import { getToken } from '@/composable/auth'
import { Notification } from '@/composable/utility'
import { useUserMsgStore } from '@/store/index'

router.beforeEach(async (to,from) => {
    const token = getToken()

    // 权限验证
    if(!token && to.path != '/login'){
        Notification('请先登录','error')
        return { path:'/login' }
    }

    // 防止重复登录
    if(token && to.path == '/login'){
        Notification('请勿重复登录','error')
        return { path:from.path ? from.path : '/' }
    }

    // 如果token存在，获取用户信息
    if(token){
        const useStore = useUserMsgStore()
        await useStore.getInfoWrap()
    }
})