<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <adminHeader></adminHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <adminAside></adminAside>
                </el-aside>
                <el-main>
                    <adminTag></adminTag>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import adminHeader from '@/components/adminHeader.vue'
import adminAside from '@/components/adminAside.vue'
import adminTag from '@/components/adminTag.vue'
</script>
