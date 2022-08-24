<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
