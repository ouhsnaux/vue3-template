<template>
  <h1>普通表单</h1>
  <CustomForm label-width="100px" :data="data1" :fields="fields1" />
  <button @click="showFormData">确定</button>
  <h1>校验表单</h1>
  <CustomForm ref="form1" :data="data2" :fields="fields2" />
  <button @click="validate">确定</button>
  <h1>插槽表单</h1>
  <CustomForm :data="data3" :fields="fields3">
    <template #name="{ type }">
      <ElInput v-model="data3.name" :type="type" />
    </template>
  </CustomForm>
  <button @click="showFormData3">确定</button>
  <h1>表单联动</h1>
  <CustomForm :data="data4" :fields="fields4"></CustomForm>
  <button @click="showFormData4">确定</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import {
  fields1 as fields11,
  fields2 as fields12,
  fields3 as fields13,
  fields4 as fields14,
} from './schema';

const data1 = ref({});
const fields1 = reactive(fields11);
const showFormData = () => {
  console.log(data1);
};
const data2 = ref({});
const fields2 = reactive(fields12);
const form1 = ref();
const validate = () => {
  form1.value.validate().catch((e: any) => {
    ElMessage.error('请完善表单');
    throw new Error(e);
  });
};
const data3 = ref<Record<string, any>>({});
const fields3 = reactive(fields13);
const showFormData3 = () => {
  console.log(data3);
};
const data4 = ref<Record<string, any>>({});
const fields4 = reactive(fields14);
const showFormData4 = () => {
  console.log(data4);
};
const options1 = [{ label: '选项1', value: '1' }];
const options2 = [{ label: '选项12', value: '12' }];
fields4[0].input.onChange = (value: any) => {
  if (value.includes('1')) {
    fields4[1].input.options = Promise.resolve(options1);
  } else {
    fields4[1].input.options = Promise.resolve(options2);
  }
};
watch(
  () => data4.value.favorite1,
  (value) => {
    data4.value.favorite3 = [value];
  }
);
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
