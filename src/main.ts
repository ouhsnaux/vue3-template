import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import components from '@/components/index';
import App from './App.vue';
import '@/assets/styles/index.scss';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(components);
app.mount('#app');
