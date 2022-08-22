import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/components/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/a',
    component: () => import('@/views/A.vue'),
  },
  {
    path: '/hello',
    component: () => import('@/views/HelloWorld.vue'),
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
