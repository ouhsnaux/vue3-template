import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteMockServe } from 'vite-plugin-mock';
// TODO ts fix
import { useEnv } from './build/index';

export default ({ mode }) => {
  const { VITE_USE_MOCK } = useEnv(loadEnv(mode, process.cwd()));
  return {
    plugins: [
      vue(),
      VITE_USE_MOCK &&
        viteMockServe({
          mockPath: 'mock',
        }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      process.env.REPORT &&
        visualizer({
          open: true,
        }),
    ],
    server: {
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: 'target',
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/api/, ''),
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
