<template>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" :title=title :direction="direction" :size=size :close-on-click-modal="false"
        :loading="loading">
        <div class="body">
            <slot></slot>
        </div>
        <div class="actions">
            <el-button type="primary" @click="$emit('targetEvent')">确认</el-button>
            <el-button type="default">取消</el-button>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const direction = ref('rtl')
const drawer = ref(false)
const loading = ref(false)
const open = () => { drawer.value = true }
const close = () => { drawer.value = false }
const showLoading = () => { loading.value = true }
const hideLoading = () => { loading.value = false }

defineExpose({
    open,
    close,
    showLoading,
    hideLoading,
})
defineProps({
    title: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: "40%"
    }
})
</script>
<style>
.el-drawer {
    @apply flex flex-col;
}

.el-drawer__body {
    flex: 1;
    @apply flex flex-col;
}

.el-drawer .body {
    overflow-y: auto;
    padding-top: 0 !important;
}

.el-drawer .actions {
    height: 40px;
    @apply mt-auto;
}
</style>