<template>
  <div class="layout">
    <LayoutHeader class="layout-header" />
    <div class="layout-content">
      <Menu class="layout-menu" />
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './_menu.vue';
import LayoutHeader from './_header.vue';
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.layout-header {
  flex: none;
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  border: 1px solid #ddd;
  font-weight: bold;
  font-size: 24px;
}
.layout-content {
  flex: auto;
  display: flex;
  height: 100%;
}
.layout-menu {
  flex: none;
  width: 200px;
}
.layout-main {
  width: 100%;
  flex: auto;
  padding: 20px;
  overflow: auto;
}
</style>
