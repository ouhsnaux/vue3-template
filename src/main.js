import { createApp } from 'vue';
import App from './App.vue';
import config from './config';

const app = createApp(App).mount('#app');

app.$config = config;
