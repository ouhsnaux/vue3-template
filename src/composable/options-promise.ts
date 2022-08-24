import type { Ref } from 'vue';
import { ref, watchEffect } from 'vue';
import { Options, MaybeOptions } from '@/@types/options';

export const usePromiseOptions = <T extends Record<string, any>>(props: T) => {
  const list: Ref<Options> = ref([]);

  watchEffect(() => {
    const { options } = props;
    let data: MaybeOptions | (() => MaybeOptions) = [];
    if (options) {
      data = options as MaybeOptions;
    }
    if (data instanceof Promise) {
      data.then((value) => {
        list.value = value;
      });
    } else {
      list.value = data as Options;
    }
  });
  return { list };
};
