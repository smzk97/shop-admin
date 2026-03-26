<template>
    <!-- 抽屉 -->
    <el-drawer v-model="drawer" :title=title :direction="direction" :size=size :close-on-click-modal="false">
        <div class="body">
            <slot></slot>
        </div>
        <div class="actions">
            <el-button type="primary">确认</el-button>
            <el-button type="default">取消</el-button>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const direction = ref('rtl')
const drawer = ref(false)
const open = () => { drawer.value = true }
const close = () => { drawer.value = false }
defineExpose({
    open,
    close,
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
<style scoped></style>