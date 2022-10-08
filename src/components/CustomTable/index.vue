<template>
  <el-table ref="table" v-loading="loading" :data="data">
    <CustomColumn v-for="column in columns" :key="column.prop" v-bind="column">
      <template v-for="slot in getColumnSlots(column)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </CustomColumn>
  </el-table>
</template>

<script setup lang="ts">
import CustomColumn from './_CustomColumn.vue';
import { getColumnSlots, type Column } from './utils';

withDefaults(
  defineProps<{
    loading?: boolean;
    columns?: Array<Column>;
    data?: Array<Record<string, any>>;
  }>(),
  {
    loading: false,
    columns: () => [],
    data: () => [],
  }
);
</script>

<style lang="scss" scoped></style>
