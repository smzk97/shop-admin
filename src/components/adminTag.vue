<template>
    <div class="tag-list" :style="{ left: store.adsideWidth }">
        <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" style="min-width:100px"
            @tab-change="handle" @tab-remove="remove">
            <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>
        <div class="tag-dropdown">
            <el-dropdown @command="closeHandle">
                <span class="el-dropdown-own">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="closeAll">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="closeOther">关闭全部</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useUserMsgStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
const store = useUserMsgStore()
const route = useRoute()
const router = useRouter()
const editableTabsValue = ref(route.path)
const editableTabs = ref([
    {
        title: '后台首页',
        path: '/home'
    }
]);
(() => {
    const tabs = cookies.get('tabLists')
    editableTabs.value = tabs || editableTabs.value
})()
watch(
    () => route.path,
    (newPath) => {
        editableTabsValue.value = newPath
        if (!editableTabs.value.find(e => e.path == newPath)) {
            editableTabs.value.push({
                title: route.meta.title,
                path: newPath,
            })
        }
        cookies.set('tabLists', editableTabs.value)
    }
)
const handle = (e) => {
    router.push(e)
}
const remove = (e) => {
    let activePath = editableTabsValue.value
    editableTabs.value.forEach((tab, index) => {
        if (tab.path == e) {
            const newTab = editableTabs.value[index - 1] || editableTabs.value[index + 1]
            if (newTab) {
                activePath = newTab.path
            }
        }
    })
    editableTabsValue.value = activePath
    editableTabs.value = editableTabs.value.filter(mid => mid.path != e)
}
const closeHandle = (e) => {
    if (e == 'closeAll') {
        editableTabsValue.value = '/home'
        editableTabs.value = [
            {
                title: '后台首页',
                path: '/home'
            }
        ]
    } else {
        editableTabs.value = editableTabs.value.filter(e => e.path == editableTabsValue.value)
    }
    cookies.set('tabLists', editableTabs.value)
}
</script>
<style>
.tag-list {
    @apply fixed flex items-center bg-gray-100 px-2;
    top: 64px;
    height: 44px;
    right: 0;
}

.el-tabs__header {
    @apply !mb-0 !ml-2;
}

.el-tabs__item {
    height: 34px !important;
    border: 0 !important;
    @apply bg-white rounded;
}

.el-tabs__nav {
    @apply space-x-2;
}

.tag-dropdown {
    height: 18px;
    width: 18px;
    right: 4px;
    @apply ml-auto;
}

.el-dropdown-own {
    right: 8px;
    @apply bg-white mr-4 rounded;
}
</style>