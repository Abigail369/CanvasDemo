<template>
  <div class="panel">
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>
<script setup lang="ts">
import { getToken } from "@/apis";
import { useRouter } from "vue-router";
const router = useRouter();
async function login() {
  const token = await getToken("admin", "123456");
  localStorage.setItem("token", token);
  router.push("/");
}
</script>
<style scoped lang="less">
.panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
