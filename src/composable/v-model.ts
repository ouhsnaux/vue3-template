import { computed } from 'vue';

const useVModel = <T extends Record<string, any>>(
  props: T,
  emit: Function,
  { name = 'modalValue' } = {}
) => {
  return computed({
    get() {
      return props[name];
    },
    set(val) {
      emit(`update:${name}`, val);
    },
  });
};

export default useVModel;
