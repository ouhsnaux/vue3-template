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
import { ElCheckbox, ElCheckboxButton } from 'element-plus';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/checkbox-button/style/css';

const props = defineProps<{
  type?: string;
  modalValue?: Array<string>;
  options: MaybeOptions;
}>();

const { list } = usePromiseOptions(props);
const localValue = ref(props.modalValue);
const componentName = computed(() => (props.type === 'button' ? ElCheckboxButton : ElCheckbox));
</script>

<style lang="scss" scoped></style>
