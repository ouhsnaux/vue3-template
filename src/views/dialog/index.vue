<template>
  <div>
    <button @click="show1 = true">打开弹框1</button>
    <CustomDialog v-model="show1" title="标题" :on-ok="onOk1">弹框1的内容</CustomDialog>
    <button @click="show2 = true">打开弹框2</button>
    <CustomDialog v-model="show2" title="标题" :on-ok="onOk2">确定3s后关闭</CustomDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const show1 = ref(false);
const onOk1 = () => {
  console.log('onOk1');
};
const show2 = ref(false);
const onOk2 = () => {
  console.log('onOk2');
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};
</script>

<style lang="scss" scoped></style>
