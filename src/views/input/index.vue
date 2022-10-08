<template>
  <div class="">
    <div>
      数字输入框：
      <NumberInput v-model="number" />
      {{ number }}
    </div>
    <div>
      下拉框1
      <SelectInput v-model="select1" :options="options1" />
      {{ select1 }}
    </div>
    <div>
      下拉框2
      <SelectInput v-model="select2" :options="options2" />
      {{ select2 }}
    </div>
    <div>
      下拉框3
      <SelectInput v-model="select3" remote :remote-method="getOptions3" filterable />
      {{ select3 }}
    </div>
    <div>
      多选1
      <CheckboxGroup v-model="check1" :options="options1" />
      {{ check1 }}
    </div>
    <div>
      多选2
      <CheckboxGroup v-model="check2" type="button" :options="options2" />
      {{ check2 }}
    </div>
    <div>
      单选1
      <RadioGroup v-model="radio1" :options="options1" />
      {{ radio1 }}
    </div>
    <div>
      单选2
      <RadioGroup v-model="radio2" type="button" :options="options2" />
      {{ radio2 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import SelectInput from '@/components/CustomInput/SelectInput.vue';
import { getOptions } from '@/api/options';
import RadioGroup from '@/components/CustomInput/RadioGroup.vue';

const number = ref();
const select1 = ref();
const options1 = reactive([
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶' },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' },
]);
setTimeout(() => {
  options1.push({ value: '选项6', label: 'xxx' });
}, 5000);
const select2 = ref();
const options2 = ref(
  Promise.resolve([
    { value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' },
    { value: '选项5', label: '北京烤鸭' },
  ])
);
setTimeout(() => {
  options2.value = Promise.resolve([
    { value: '选项1', label: '黄金糕' },
    { value: '选项2', label: '双皮奶' },
    { value: '选项3', label: '蚵仔煎' },
    { value: '选项4', label: '龙须面' },
    { value: '选项5', label: '北京烤鸭' },
    { value: '选项6', label: '北京烤鸭1111' },
  ]);
}, 5000);
const select3 = ref();
const getOptions3 = ref(getOptions);
const check1 = ref();
const check2 = ref();
const radio1 = ref();
const radio2 = ref();
</script>

<style lang="scss" scoped></style>
