<template>
  <ElInputNumber v-model="localValue"></ElInputNumber>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: true,
});

const props = defineProps({
  modelValue: { type: Number, default: undefined },
});
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get() {
    return props.modelValue === null ? undefined : props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>

<style lang="scss" scoped></style>
