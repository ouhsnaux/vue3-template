<template>
  <ElDialog v-model="show" custom-class="custom-dialog">
    <slot></slot>
    <template v-if="!footerHide" #footer>
      <el-button @click="close">取消</el-button>
      <el-button :loading="loading" type="primary" @click="confirm">确定</el-button>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useVModel from '@/composable/v-model';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    onOk?: Function;
    footerHide?: boolean;
  }>(),
  { footerHide: false, onOk: () => {} }
);
const emit = defineEmits(['update:modelValue']);
const show = useVModel(props, emit);
const loading = ref(false);
const close = () => {
  show.value = false;
};
const confirm = () => {
  loading.value = true;
  Promise.resolve(props.onOk())
    .then(() => {
      close();
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
// TODO 样式无法设置
:deep(.custom-dialog) {
  max-height: calc(100vh - 6vh - 150px);
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;

  .el-dialog__header,
  .el-dialog__footer {
    flex: none;
  }

  .el-dialog__header {
    box-shadow: 0px 1px 1px #ddd;
    z-index: 1;
  }

  .el-dialog__footer {
    box-shadow: 0px -1px 1px #ddd;
    padding-bottom: 10px;
  }

  .el-dialog__body {
    overflow: auto;
  }
}
</style>
