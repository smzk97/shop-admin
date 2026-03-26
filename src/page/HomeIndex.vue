<template>
    <div>
        后台首页
    </div>
    <div>
        {{ data }}
    </div>
    <el-button @click="logout">
        退出登录
    </el-button>
</template>
<script setup lang="ts">
import { useUserMsgStore } from '@/store/index'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { MessageBox, Notification } from '@/composable/utility'
import { logOut } from '@/api/manager'
import { removeToken } from '@/composable/auth'
const router = useRouter()
const useStore = useUserMsgStore()
const data = reactive(useStore.user).value.data.username
function logout() {
    MessageBox("是否退出登录？").then(() => {
        logOut().then(() => {

            // 移除cookie
            removeToken()
            // 清除当前用户信息
            useStore.SaveUserMsg({})
            // 消息通知
            Notification('退出登录成功')
            // 跳转到登录页面
            router.push('/login')
        })

    })
}
</script>