import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import components from '@/components/index';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

import App from './App.vue';
import '@/assets/styles/index.scss';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(components);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount('#app');
