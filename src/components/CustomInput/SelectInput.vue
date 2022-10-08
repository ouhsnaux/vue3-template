<template>
  <ElSelect v-model="localValue" :loading="loading" :remote-method="localRemoteMethod">
    <ElOption
      v-for="option in list"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    ></ElOption>
  </ElSelect>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePromiseOptions } from '@/composable/options-promise';
import { MaybeOptions, Options } from '@/@types/options';
import useVModel from '@/composable/v-model';

const props = defineProps<{
  modelValue?: string | number;
  options?: MaybeOptions;
  // eslint-disable-next-line no-unused-vars
  remoteMethod?: (...args: any) => Promise<Options>;
}>();
const emit = defineEmits(['update:modelValue']);

const { list } = usePromiseOptions(props);

const localValue = useVModel(props, emit);
const loading = ref(false);
const localRemoteMethod = (query?: string) => {
  loading.value = true;
  props.remoteMethod!(query)
    .then((value: Options) => {
      list.value = value;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
