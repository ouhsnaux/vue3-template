import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from '@/router';
import store from '@/store';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.use(store);
app.mount('#app');
