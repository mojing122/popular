<template>
    <el-menu default-active="1" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1" @click="router.push('/')">
            <template #title>
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </template>
        </el-menu-item>

        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <TrendCharts />
                </el-icon>
                <span>数据分析结果</span>
            </template>

            <el-menu-item index="2-1" @click="router.push('/COstatistics')">投诉对象统计</el-menu-item>
            <el-menu-item index="2-2" @click="router.push('/CQstatistics')">投诉问题统计</el-menu-item>
            <el-menu-item index="2-3">投诉行业统计</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <Grid />
                </el-icon>
                <span>风险分析</span>
            </template>

            <el-menu-item index="3-1">投诉对象风险分析</el-menu-item>
            <el-menu-item index="3-2">投诉问题风险分析</el-menu-item>
            <el-menu-item index="3-2">投诉行业风险分析</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <Management />
                </el-icon>
                <span>生成专报</span>
            </template>

            <el-menu-item index="4-1">新建专报任务</el-menu-item>

        </el-sub-menu>
    </el-menu>
</template>
  
<script lang="ts" setup>
import router from '@/router';


const handleOpen = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    //console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical {

    height: calc(100vh - 60px);
}
</style>