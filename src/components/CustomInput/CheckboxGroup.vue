<template>
  <ElCheckboxGroup v-model="localValue">
    <component :is="componentName" v-for="option in list" :key="option.value" :label="option.value">
      {{ option.label }}
    </component>
  </ElCheckboxGroup>
</template>

<script lang="ts" setup>
import { usePromiseOptions } from '@/composable/options-promise';
import { ref, computed } from 'vue';
import { MaybeOptions } from '@/@types/options';
import useVModel from '@/composable/v-model';
// import { ElCheckbox, ElCheckboxButton } from 'element-plus';
// import 'element-plus/es/components/checkbox/style/css';
// import 'element-plus/es/components/checkbox-button/style/css';

const props = defineProps<{
  type?: 'button';
  modelValue?: Array<string | number>;
  options: MaybeOptions;
}>();
const emit = defineEmits(['update:modelValue']);
const { list } = usePromiseOptions(props);
const localValue = useVModel(props, emit);
const componentName = computed(() => (props.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox'));
</script>

<style lang="scss" scoped></style>
