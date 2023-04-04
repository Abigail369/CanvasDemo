<template>
  <div class="menu">
    <div class="menu_item" v-for="(item, i) in menus" :key="i" @click="clickMenu(item)">
      {{ item.name }}
    </div>
  </div>

  <router-view />
</template>
<script setup lang="ts">
import router from "@/plugins/router";
import { ref } from "vue";

const menus = ref([
  {
    name: "star",
    path: "/star",
  },

  {
    name: "ball",
    path: "/ball",
  },
  {
    name: "gobang",
    path: "/gobang",
  },
]);
const clickMenu = (item: { path: string; name: string }) => {
  router.push(item.path);
};
</script>
<style scoped lang="less">
.menu {
  display: flex;
  .menu_item {
    top: 52px;
    cursor: pointer;
  }
  .menu_item {
    font-size: 18px;
    color: #b7e3cb;
    padding: 10px 46px;
  }
}
</style>
