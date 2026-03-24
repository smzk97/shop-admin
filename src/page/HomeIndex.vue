<template>
    <div>
        后台首页
    </div>
    <div>
        {{ data }}
    </div>
</template>
<script setup lang="ts">
import { useUserMsgStore } from '@/store/index'
import { reactive } from 'vue'
const useStore = useUserMsgStore()
const data = reactive(useStore.user)
</script>