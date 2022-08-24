import { getLast } from '@/utils/array';
import { defineAsyncComponent } from 'vue';
import type { App } from 'vue';

const parseComponentName = (path: string) => {
  const pathArr: Array<string> = path.slice(2, -4).split('/');
  const last = getLast(pathArr);
  if (last === 'index') {
    return getLast(pathArr, 2);
  }
  return last;
};

export default {
  install(app: App<Element>) {
    const components = import.meta.glob('./**/*.vue');
    Object.entries(components).forEach(([key, component]) => {
      const componentName = parseComponentName(key);
      if (!componentName || componentName.startsWith('_')) return;
      // TODO ts报错
      // @ts-ignore
      app.component(componentName, defineAsyncComponent(component));
    });
  },
};
