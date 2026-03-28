<template>
    <div class="asider">
        <el-menu class="el-menu-vertical-demo" @select="handle" :collapse=isCollapse :default-active="defaultActive">
            <template v-for="(menu1, index1) in asideMenus" :key="index1">

                <el-sub-menu v-if="menu1.child && menu1.child.length > 0" :index="menu1.name">
                    <template #title>
                        <el-icon>
                            <component :is="menu1.icon"></component>
                        </el-icon>
                        <span>{{ menu1.name }}</span>
                    </template>
                    <el-menu-item v-for="(menu2, index2) in menu1.child" :key="index2" :index="menu2.frontpath">
                        <template #title>
                            <el-icon>
                                <component :is="menu2.icon"></component>
                            </el-icon>
                            <span>{{ menu2.name }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu v-else :index="menu1.frontpath">
                    <template #title>
                        <el-icon>
                            <component :is="menu1.icon"></component>
                        </el-icon>
                        <span>{{ menu1.name }}</span>
                    </template>
                </el-sub-menu>

            </template>
        </el-menu>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useUserMsgStore } from '@/store/index'
const store = useUserMsgStore()
const router = useRouter()
const route = useRoute()
const defaultActive = ref(route.path)
const isCollapse = computed(() => { return store.adsideWidth != '250px' })
const asideMenus = computed(() => { return store.menus })
function handle(e) {
    router.push('/home' + e)
}
</script>
<style scoped>
.asider {
    width: 250px;
    @apply mt-4 fixed;
    top: 64px;
    bottom: 0px;
}

.el-menu-vertical-demo {
    overflow-y: auto;
    height: 100%;
}

.el-menu-vertical-demo::-webkit-scrollbar {
    width: 0px;
}
</style>