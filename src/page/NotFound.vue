<template>
    <div class="flex justify-center item-center h-auto">
        <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了">
            <template #extra>
                <el-button type="primary" @click="$router.push({ path: '/home' })">回到首页</el-button>
            </template>
        </el-result>
    </div>
</template>