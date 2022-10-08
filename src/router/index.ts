import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
import NotFound from '@/components/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: 'input',
    children: [
      {
        path: 'input',
        component: () => import('@/views/input/index.vue'),
      },
      {
        path: 'form',
        component: () => import('@/views/form/index.vue'),
      },
      {
        path: 'form-utils',
        component: () => import('@/views/form-utils/index.vue'),
      },
      {
        path: 'dialog',
        component: () => import('@/views/dialog/index.vue'),
      },
      {
        path: 'table',
        component: () => import('@/views/table/index.vue'),
      },
      {
        path: 'dialog-with-form',
        component: () => import('@/views/dialog-with-form/index.vue'),
      },
    ],
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
