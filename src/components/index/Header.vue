<template>
    <div class="header">
        <a class="header-icon">舆情监测系统</a>
        <div class="header-user">
            <el-avatar shape="square" :size="30"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
        </div>
    </div>
</template>

<script setup>

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
}
</style>