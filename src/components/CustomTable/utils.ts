export interface Column {
  [x: string]: any;
  slotName?: string;
  headerSlotName?: string;
  children: Array<Column>;
}

export const getColumnSlots = (column: Column) => {
  let result: Array<string> = [];
  if (column.slotName) {
    result.push(column.slotName);
  }
  if (column.headerSlotName) {
    result.push(column.headerSlotName);
  }
  if (column.children) {
    column.children.forEach((child) => {
      result = result.concat(getColumnSlots(child));
    });
  }
  return result;
};
