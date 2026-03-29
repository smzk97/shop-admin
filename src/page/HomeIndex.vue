<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <adminHeader></adminHeader>
            </el-header>
            <el-container>
                <el-aside :width=store.adsideWidth style="transition: 0.3s">
                    <adminAside></adminAside>
                </el-aside>
                <el-main class="flex flex-col">
                    <adminTag></adminTag>
                    <div class="main-content">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import adminHeader from '@/components/adminHeader.vue'
import adminAside from '@/components/adminAside.vue'
import adminTag from '@/components/adminTag.vue'
import { useUserMsgStore } from '@/store/index'
const store = useUserMsgStore()
</script>
<style>
.main-content {
    margin-top: 44px;
    flex: 1;
    @apply overflow-auto;
}
</style>