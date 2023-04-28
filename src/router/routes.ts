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
        path: 'project',
        name: 'Project',
        children: [
          {
            path: 'create/:network?',
            name: 'ProjectCreate',
            component: () => import('pages/Projects/ProjectCreate.vue'),
          },
          {
            path: 'detail/:id',
            name: 'ProjectPage',
            component: () => import('pages/Projects/ProjectPage.vue'),
          },
        ],
      },
      {
        path: 'event',
        name: 'Event',
        children: [
          {
            path: 'create/:network?',
            name: 'EventCreate',
            component: () => import('pages/Events/EventCreate.vue'),
          },
          {
            path: 'detail/:id',
            name: 'EventPage',
            component: () => import('pages/Events/EventPage.vue'),
          },
        ],
      },

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
        path: 'network-managment',
        name: 'NetworkManagment',
        component: () => import('pages/Network/NetworkManagement.vue'),
      },
      {
        path: 'explore/projects',
        name: 'ExploreProjectsPage',
        component: () => import('pages/Explore/ExploreProjectsPage.vue'),
      },
      /*{
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },*/
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
