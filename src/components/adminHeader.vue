<template>
    <div class="header">
        <div class="header-first">
            <el-icon class="mx-2">
                <ElementPlus />
            </el-icon>
            <span>商城后台</span>
        </div>
        <div class="header-second">
            <el-tooltip v-if="useStore.adsideWidth == '250px'" content="折叠菜单" placement="bottom" effect="dark">
                <el-icon>
                    <Fold @click="useStore.handleAsideWidth" />
                </el-icon>
            </el-tooltip>
            <el-tooltip v-else content="打开菜单" placement="bottom" effect="dark">
                <el-icon>
                    <Expand @click="useStore.handleAsideWidth" />
                </el-icon>
            </el-tooltip>
            <el-tooltip content="刷新" placement="bottom" effect="dark">
                <el-icon>
                    <Refresh @click="Fresh" />
                </el-icon>
            </el-tooltip>
        </div>
        <div class="header-third">
            <el-tooltip v-if="!isFullscreen" content="全屏" placement="bottom" effect="dark">
                <el-icon class="mr-8">
                    <FullScreen @click="toggle" />
                </el-icon>
            </el-tooltip>
            <el-tooltip v-else content="退出全屏" placement="bottom" effect="dark">
                <el-icon class="mr-8">
                    <Aim @click="toggle" />
                </el-icon>
            </el-tooltip>
            <el-avatar :src="avatar" class="mr-2" />
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="first">修改密码</el-dropdown-item>
                        <el-dropdown-item command="second">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <!-- 抽屉 -->
    <admin-Drawer title="修改密码" size="40%" ref="drawerRef">
        <el-form ref="RuleFormRef" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="prePassword" label="旧密码">
                <el-input v-model="form.prePassword" placeholder="请输入旧密码" @keyup.enter="SubmitForm(RuleFormRef)"
                    type="text">
                </el-input>
            </el-form-item>
            <el-form-item prop="newPassword" label="新密码">
                <el-input v-model="form.newPassword" placeholder="请输入新密码" @keyup.enter="SubmitForm(RuleFormRef)"
                    type="password" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="reNewPassword" label="确认密码">
                <el-input v-model="form.reNewPassword" placeholder="请重新输入新密码" @keyup.enter="SubmitForm(RuleFormRef)"
                    type="password">
                </el-input>
            </el-form-item>
        </el-form>
    </admin-Drawer>

</template>
<script setup>
import { useUserMsgStore } from '@/store/index'
import { useFullscreen } from '@vueuse/core'
import { MessageBox, Notification } from '@/composable/utility'
import { logOut, upDatePassword } from '@/api/manager'
import { useRouter } from 'vue-router'
import { removeToken } from '@/composable/auth'
import { ref, reactive } from 'vue'
import adminDrawer from './adminDrawer.vue'
const RuleFormRef = ref()
const form = reactive({
    prePassword: '',
    newPassword: '',
    reNewPassword: '',
})
const rules = reactive({
    prePassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    reNewPassword: [
        { required: true, message: '请重新输入新密码', trigger: 'blur' },
    ],
})
const { isFullscreen, toggle } = useFullscreen()
const router = useRouter()
const useStore = useUserMsgStore()
const userData = useStore.user
const username = userData.data.username
const avatar = userData.data.avatar
const loading = ref(false)
const drawerRef = ref(null)
const handleCommand = (command) => {
    switch (command) {
        case "first":
            breakDrawer()
            break
        case "second":
            logout()
            break
    }
}
const SubmitForm = async (FormRef) => {
    if (!FormRef) return
    await FormRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            upDatePassword(form.prePassword, form.newPassword, form.reNewPassword)
                .then(res => {
                    loading.value = true

                    // 提示成功
                    Notification('修改成功')

                })
                .finally(() => {
                    loading.value = false
                })
        }
        else
            console.log('error submit!', fields)
    })
}
function breakDrawer() {
    drawerRef.value.open()
}
function Fresh() {
    location.reload()
}
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
<style scoped>
.header {
    @apply flex items-center bg-indigo-700 text-light-100 text-xl left-0 right-0 top-0 fixed;
    height: 64px;
}

.header-first {
    @apply flex items-center justify-center;
    width: 250px;
    cursor: pointer;
}

.header-second {
    @apply flex items-center justify-center space-x-4;
    cursor: pointer;
}

.header-third {
    @apply flex items-center ml-auto mr-4;
    cursor: pointer;
}

.el-dropdown-link {
    @apply text-light-100;
}
</style>