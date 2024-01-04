<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0px;">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideMenu></SideMenu>
        </el-aside>
        <el-container class="main-content">
          <el-main><router-view></router-view></el-main>
          <el-footer class="footer" height="30px">2024@yzu</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useStore } from "@/stores/index.js";
import Header from "@/components/index/Header.vue"
import SideMenu from "@/components/index/SideMenu.vue"

</script>


<style scoped>
.main-content {
  max-height: calc(100vh - 60px);
  overflow: hidden;
  padding: 0px;
  background-color: rgb(243, 246, 249);
}

.footer {
  line-height: 30px;
  text-align: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px -2px 5px 5px rgba(234, 234, 234, 0.481);
}
</style>