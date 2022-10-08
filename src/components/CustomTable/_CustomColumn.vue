<template>
  <el-table-column>
    <template v-if="!(children && children.length > 0) && slotName" #default="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
    <template v-if="children && children.length > 0">
      <CustomColumn v-for="child in children" :key="child.prop" v-bind="child">
        <template v-for="slot in getColumnSlots(child)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </CustomColumn>
    </template>
    <template v-if="headerSlotName" #header>
      <slot :name="headerSlotName" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { getColumnSlots, type Column } from './utils';

defineOptions({
  name: 'CustomColumn',
});

withDefaults(
  defineProps<{
    children?: Array<Column>;
    slotName?: string;
    headerSlotName?: string;
  }>(),
  {
    children: () => [],
    slotName: '',
    headerSlotName: '',
  }
);
</script>

<style lang="scss" scoped></style>
