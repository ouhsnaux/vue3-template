import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { useEnv } from './build/index';

export default ({ mode }) => {
  const { VITE_USE_MOCK, VITE_API_BASE_URL } = useEnv(loadEnv(mode, process.cwd()));
  return {
    plugins: [
      vue(),
      VITE_USE_MOCK &&
        viteMockServe({
          mockPath: 'mock',
          localEnabled: true,
          // prodEnabled: true,
          // injectCode: `
          //   import { setupProdMockServer } from './mock';
          //   setupProdMockServer();
          // `,
          // logger: true,
        }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      DefineOptions(),
      process.env.REPORT &&
        visualizer({
          open: true,
        }),
    ],
    server: {
      open: true,
      host: true,
      proxy: {
        [VITE_API_BASE_URL]: {
          target: 'http://www.baidu.com',
          changeOrigin: true,
          rewrite: (url) => url.replace(new RegExp(`^${VITE_API_BASE_URL}`), ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
};
