<template>
  <CustomTable :columns="columns" :data="data" border stripe />
  <CustomTable :columns="columns1" :data="data" border stripe>
    <template #date="scope">
      <el-date-picker v-model="scope.row.date" />
    </template>
    <template #address>地址表头</template>
  </CustomTable>
  <CustomTable :columns="columns2" :data="tableData" border stripe />
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const columns = reactive([
  { prop: 'date', label: '日期', width: 180 },
  { prop: 'name', label: '姓名', width: 180 },
  { prop: 'address', label: '地址', width: 200 },
]);
const columns1 = reactive([
  { prop: 'date', label: '日期', width: 180, slotName: 'date' },
  {
    prop: 'name',
    label: '姓名',
    width: 180,
    formatter: (data: any) => {
      return `xxx ${data.name} xxx`;
    },
  },
  { prop: 'address', label: '地址', width: 200, headerSlotName: 'address' },
]);
const columns2 = reactive([
  {
    prop: 'date',
    label: '日期',
    width: 150,
  },
  {
    label: 'Delivery Info',
    children: [
      {
        prop: 'name',
        label: 'Name',
        width: 120,
      },
      {
        label: 'Address Info',
        children: [
          {
            prop: 'state',
            label: 'State',
            width: 120,
          },
          {
            prop: 'city',
            label: 'city',
            width: 120,
          },
          {
            prop: 'address',
            label: 'address',
          },
          {
            prop: 'zip',
            label: 'zip',
            width: 120,
          },
        ],
      },
    ],
  },
]);
const data = reactive([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
]);
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];
</script>
