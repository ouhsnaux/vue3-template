import { createRouter, createWebHashHistory } from 'vue-router';
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: '/a',
  },
  {
    path: '/a',
    name: 'A',
    component: () => import('@/views/a/index.vue'),
  },
  {
    path: '/b',
    name: 'B',
    component: () => import('@/views/b/index.vue'),
  },
  {
    path: '/:_(.*)*',
    component: NotFound,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
