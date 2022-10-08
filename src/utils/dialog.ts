export const getSlots = (fields: Array<any>) =>
  fields.map((item) => item.input.slotName).filter((item) => !!item);
