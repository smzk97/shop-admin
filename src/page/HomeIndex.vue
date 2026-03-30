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
                        <router-view v-slot="{ Component }">
                            <transition name="animal" mode="out-in">
                                <KeepAlive :max="10">
                                    <component :is="Component"></component>
                                </KeepAlive>
                            </transition>
                        </router-view>
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

.animal-enter-from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}

.animal-enter-to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.animal-leave-from {
    opacity: 1;
}

.animal-leave-to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.animal-enter-active,
.animal-leave-active {
    transition: opacity 0.3s ease;
}
</style>
