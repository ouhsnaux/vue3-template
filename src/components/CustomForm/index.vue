<template>
  <ElForm ref="form" :model="data" :disabled="disabled">
    <ElFormItem v-for="field in fields" :key="field.form.prop" v-bind="field.form">
      <slot
        v-if="field.input.slotName"
        :name="field.input.slotName"
        v-bind="field.input"
        :disabled="disabled"
      />
      <!-- TODO 获取对象的深层值 -->
      <component
        :is="field.input.component"
        v-else
        :disabled="disabled"
        :model-value="data[field.form.prop]"
        v-bind="field.input"
        @update:model-value="onChange($event, field.form.prop)"
      />
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { FormInstance, ElMessage } from 'element-plus';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    data: Record<any, any>;
    // TODO Input类型
    fields: Array<any>;
    disabled?: boolean;
    tip?: string;
  }>(),
  { disabled: false, tip: '请完善表单' }
);
const onChange = (value: any, prop: string) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.data[prop] = value;
};
const form = ref<FormInstance>();
const validate = () =>
  form?.value?.validate?.().catch(() => {
    if (props.tip) {
      ElMessage.error(props.tip);
    }
    throw new Error();
  });
const resetFields = () => form?.value?.resetFields?.();
defineExpose({ validate, resetFields });
</script>

<style lang="scss" scoped></style>
