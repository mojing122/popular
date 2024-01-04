<template>
    <div class="header">
        <a class="header-icon">舆情监测系统</a>
        <div class="header-user" @click="logout">
            <div style="margin-right: 20px;">
                <svg t="1704356777278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4260" width="30" height="30">
                    <path
                        d="M810.666667 170.666667h-85.333334a42.666667 42.666667 0 0 0 0 85.333333h42.666667v512h-42.666667a42.666667 42.666667 0 0 0 0 85.333333h85.333334a42.666667 42.666667 0 0 0 42.666666-42.666666V213.333333a42.666667 42.666667 0 0 0-42.666666-42.666666zM503.466667 315.733333a42.666667 42.666667 0 0 0-68.266667 51.2L512 469.333333H170.666667a42.666667 42.666667 0 0 0 0 85.333334h345.173333l-73.386667 104.106666a42.666667 42.666667 0 0 0 10.24 59.733334 42.666667 42.666667 0 0 0 24.746667 7.68 42.666667 42.666667 0 0 0 34.56-17.92l120.32-170.666667a42.666667 42.666667 0 0 0 0-50.346667z"
                        fill="#fff" p-id="4261"></path>
                </svg>
            </div>
            <el-avatar shape="square" :size="30"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import router from "@/router/index.js";
import { useStore } from "@/stores/index.js";
const store = useStore()

const logout = () => {

    ElMessage.success("账号登出")
    store.user = null
    router.push('/')

}
</script>

<style scoped>
.header {
    width: 100vw;
    height: 60px;
    background-color: #409EFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-icon {
    line-height: 60px;
    margin-left: 20px;
    font-size: 24px;
    color: aliceblue;
    font-weight: 600;
}

.header-user {
    margin-right: 20px;
    display: flex;
}
</style>