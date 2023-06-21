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
      {
        path: 'our-members',
        name: 'OurMembersPage',
        component: () => import('pages/Team/TeamPage.vue'),
      },

      /* App routes */

      {
        path: 'project',
        name: 'Project',
        children: [
          {
            path: 'create/:network?',
            name: 'ProjectCreate',
            meta: { requiresAuth: true },
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
        path: 'blog',
        name: 'Blog',
        children: [
          {
            path: 'create/:network?',
            name: 'PostCreate',
            meta: { requiresAuth: true },
            component: () => import('pages/Blog/PostCreate.vue'),
          },

          {
            path: 'detail/:id',
            name: 'PostPage',
            component: () => import('pages/Blog/PostPage.vue'),
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
            meta: { requiresAuth: true },
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
        path: 'profile/:user',
        name: 'Profile',
        redirect: '',
        children: [
          {
            path: 'experiences',
            name: 'ProfileExperiences',
            component: () =>
              import('pages/User/components/ProfileExperiences.vue'),
          },
          {
            path: '',
            name: 'ProfileFeed',
            component: () => import('pages/User/components/ProfileFeed.vue'),
          },
        ],
        component: () => import('pages/User/ProfilePage.vue'),
      },
      {
        path: 'network-management',
        name: 'NetworkManagement',
        meta: { requiresAuth: true },
        component: () => import('pages/Network/NetworkManagement.vue'),
        redirect: 'network-management/projects',
        props: true,
        children: [
          {
            path: 'projects',
            name: 'NetworkManagementProjects',
            component: () => import('pages/Network/components/ProjectsManagement.vue')
          },
          {
            path: 'events',
            name: 'NetworkManagementEvents',
            component: () => import('pages/Network/components/EventsManagement.vue')
          },
          {
            path: 'blog',
            name: 'BlogManagementProjects',
            component: () => import('pages/Network/components/BlogPostManagement.vue')
          },
          {
            path: 'members',
            name: 'MembersManagementProjects',
            component: () => import('pages/Network/components/MembersManagement.vue')
          }
        ]
      },
      {
        path: 'explore/projects',
        name: 'ExploreProjectsPage',
        component: () => import('pages/Explore/ExploreProjectsPage.vue'),
      },
      {
        path: 'explore/events',
        name: 'ExploreEventsPage',
        component: () => import('pages/Explore/ExploreEventsPage.vue'),
      },
      {
        path: 'explore/blog',
        name: 'ExploreBlogPage',
        component: () => import('pages/Explore/ExploreBlogPage.vue'),
      },

      {
        path: '/under-construction',
        name: 'UnderConstructionPage',
        component: () => import('../pages/Common/UnderConstruction.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Auth/LoginPage.vue'),
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('../pages/Auth/RecoverPassword.vue'),
  },

  {
    path: '/change-password',
    name: 'ResetPassword',
    component: () => import('../pages/Auth/ResetPassword.vue'),
    props: (route) => ({
      token: route.query.token || '',
    }),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
