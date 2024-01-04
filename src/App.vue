<template>
  <router-view />
</template>

<script setup>
import { get } from "@/http"
import { ElMessage } from "element-plus";
import { useStore } from "@/stores";
import router from "@/router/index.js";

const store = useStore()

/**
if (store.auth.user == null) {
  get("/api/user/get-user-info", (message) => {
    store.auth.user = message
    router.push("/index")
  }, () => {
    store.auth.user = null
  })
}
 */


</script>

<style scoped></style>