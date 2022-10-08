<template>
  <ElRadioGroup v-model="localValue">
    <component :is="component" v-for="option in list" :key="option.value" :label="option.value">
      {{ option.label }}
    </component>
  </ElRadioGroup>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { MaybeOptions } from '@/@types/options';
import { usePromiseOptions } from '@/composable/options-promise';
import useVModel from '@/composable/v-model';
// import { ElRadio, ElRadioButton } from 'element-plus';
// import 'element-plus/es/components/radio/style/css';
// import 'element-plus/es/components/radio-button/style/css';
// TODO props.modelValue, emit update:modelValue 如何复用
const props = defineProps<{
  modelValue?: string | number;
  options?: MaybeOptions;
  type?: 'button';
}>();
const emit = defineEmits(['update:modelValue']);
const { list } = usePromiseOptions(props);
const localValue = useVModel(props, emit);
const component = computed(() => (props.type === 'button' ? 'ElRadioButton' : 'ElRadio'));
</script>

<style lang="scss" scoped></style>
