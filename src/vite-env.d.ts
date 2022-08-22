/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string,
  readonly VITE_API_TIME_OUT: number,
  readonly VITE_USE_MOCK: boolean,
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare type Recordable<T = any> = Record<string, T>;
