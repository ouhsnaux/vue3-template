<template>
  <ElMenu class="menu-container">
    <ElMenuItem v-for="route in routes" :key="route.url">
      <router-link :to="route.url">
        {{ route.label }}
      </router-link>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts" setup>
const routes = [
  { label: '输入框', url: '/input' },
  { label: '动态输入框', url: '/dynamic-input' },
];
</script>

<style lang="scss" scoped></style>
