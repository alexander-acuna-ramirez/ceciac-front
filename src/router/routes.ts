import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      /* General Routes */
      {
        path: 'home',
        name: 'HomePage',
        component: () => import('pages/Home/HomePage.vue'),
      },

      /* App routes */
      {
        path: 'feed',
        name: 'Feed',
        component: () => import('pages/Feed/FeedPage.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/User/ProfilePage.vue'),
      },
      {
        path: 'project',
        name: 'Project',
        children: [
          {
            path: ':id',
            name: 'ProjectPage',
            component: () => import('pages/Projects/ProjectPage.vue'),
          },
          {
            path: 'create/:network?',
            name: 'ProjectCreate',
            component: () => import('pages/Projects/ProjectCreate.vue'),
          },
        ],
      },

      {
        path: 'network-managment',
        name: 'NetworkManagment',
        component: () => import('pages/Network/NetworkManagement.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Auth/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
