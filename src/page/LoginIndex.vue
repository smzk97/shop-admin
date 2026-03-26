<template>
    <el-row class="row">
        <el-col :lg="16" :md="12">
            <div class="left">
                <div>
                    <div class="left-first-line">欢迎光临</div>
                    <div class="left-last-line">此站点是《vue3 + vite实战商城后台管理》项目演示地址</div>
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <div class="right-container">
                <h2 class="right-first-line">欢迎回来</h2>
                <div class="right-second-line">
                    <span class="left-line"></span>
                    <span class="text-gray-300">账号密码登录</span>
                    <span class="right-line"></span>
                </div>
                <div>
                    <el-form ref="RuleFormRef" :rules="rules" :model="form" class="w-[250px]">
                        <el-form-item prop="account">
                            <el-input v-model="form.account" placeholder="请输入账号" @keyup.enter="SubmitForm(RuleFormRef)"
                                type="text">
                                <template #prefix>
                                    <el-icon>
                                        <User />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" placeholder="请输入密码" @keyup.enter="SubmitForm(RuleFormRef)"
                                type="password" show-password>
                                <template #prefix>
                                    <el-icon>
                                        <Lock />
                                    </el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="SubmitForm(RuleFormRef)" round class="w-[250px] !text-xl"
                                :loading="loading">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/manager'
import { useRouter } from 'vue-router'
import { setToken } from '@/composable/auth'
import { Notification } from '@/composable/utility'
const form = reactive({
    account: '',
    password: '',
})
const loading = ref(false)
const router = useRouter()
const RuleFormRef = ref()
const rules = reactive({
    account: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '用户名长度必须在3到5个字内', trigger: 'blur' },
        { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, message: '用户名只能由中文、字母或数字组成', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})
const SubmitForm = async (FormRef) => {
    if (!FormRef) return
    await FormRef.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            login(form.account, form.password)
                .then(loginRes => {
                    loading.value = true
                    const token = loginRes.data.token
                    console.log(loginRes)

                    // 提示成功
                    Notification('登录成功')

                    // 保存token 
                    setToken(token)

                    // 跳转到后台首页
                    router.push('/home')

                })
                .finally(() => {
                    loading.value = false
                })
        }
        else
            console.log('error submit!', fields)
    })
}
</script>

<style scoped>
.row {
    @apply bg-purple-500 min-h-screen;
}

.left {
    @apply flex justify-center items-center h-full;
}

.left-first-line {
    @apply font-bold text-light-300 text-5xl mb-4;
}

.left-last-line {
    @apply text-gray-200 text-lg;
}

.right {
    @apply bg-light-100;
}

.right-container {
    @apply flex flex-col justify-center items-center h-full;
}

.right-first-line {
    @apply font-bold text-3xl;
}

.right-second-line {
    @apply flex space-x-2 justify-center items-center my-3;

    .left-line,
    .right-line {
        @apply h-[1px] w-16 bg-gray-200;
    }
}
</style>