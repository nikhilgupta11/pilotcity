import { RouteConfig } from 'vue-router';
import Mobile from './Mobile.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/mobile',
    name: 'Mobile',
    component: Mobile,
    meta: {
      requiresAuth: true,
      layout: 'no-nav'
    }
  }
];

export default routes;
