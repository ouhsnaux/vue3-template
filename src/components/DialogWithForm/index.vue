<template>
  <CustomDialog v-model="show" :on-ok="confirm" append-to-body destroy-on-close>
    <CustomForm ref="customFormRef" :fields="fields" :data="data" v-bind="form">
      <template v-for="item in slots" #[item]>
        <slot :name="item" />
      </template>
    </CustomForm>
  </CustomDialog>
</template>

<script setup lang="ts">
import useVModel from '@/composable/v-model';
import { computed, watch, watchEffect, ref } from 'vue';
import { getSlots } from '@/utils/dialog';
import getDefaultData from '@/utils/form/get-default';
import { ElMessage } from 'element-plus';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    fields: Array<any>;
    data: object;
    onOk?: (...args: any) => Promise<any>;
    // form props
    form?: object;
  }>(),
  {
    onOk: Promise.resolve,
    form: () => ({}),
  }
);
const emits = defineEmits(['update:modelValue', 'update:data']);
const show = useVModel(props, emits);
const slots = computed(() => getSlots(props.fields));
const setData = (data: object) => {
  emits('update:data', data);
};
const customFormRef = ref();
const refreshData = () => {
  setData({
    ...getDefaultData(props.fields),
    ...props.data,
  });
};
// TODO 验证fields变化，是否触发变更
watchEffect(() => refreshData);
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      refreshData();
    } else {
      setData(getDefaultData(props.fields));
      customFormRef?.value?.resetFields();
    }
  }
);
const confirm = async () => {
  await customFormRef.value.validate();
  await props.onOk();
  ElMessage.success('操作成功');
};
</script>
