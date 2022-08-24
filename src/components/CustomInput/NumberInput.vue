<template>
  <ElInputNumber v-model="localValue"></ElInputNumber>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: true,
});

const props = defineProps({
  modalValue: { type: Number, default: undefined },
});

const localValue = computed({
  get() {
    return props.modalValue === null ? undefined : props.modalValue;
  },
  set() {},
});
</script>

<style lang="scss" scoped></style>
