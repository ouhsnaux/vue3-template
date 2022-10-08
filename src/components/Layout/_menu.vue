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
  { label: '表单', url: '/form' },
  { label: '弹框', url: '/dialog' },
  { label: '表格', url: '/table' },
  { label: '弹框内嵌表单', url: '/dialog-with-form' },
];
</script>

<style lang="scss" scoped></style>
