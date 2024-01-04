<template>
  <div class="login-body">
    <div style="flex: 1;background-color: aqua">
      <el-image
          class="banner-image"
          src="https://images.unsplash.com/photo-1682685794761-c8e7b2347702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"/>
    </div>
    <div style="width: 35%;background-color: var(--el-bg-color)">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in">
          <component :is="Component" style="height: 100%"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.login-body{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.banner-image{
  width: 100%;
  height: 100%;
}
</style>