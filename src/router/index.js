import { createRouter, createWebHashHistory } from 'vue-router';

import customersRoutes from '../modules/customers/routes';
import categoriesRoutes from '../modules/categories/routes';
import productsRoutes from '../modules/products/routes';

import sharedRoutes from '../modules/shared/routes';

let routes = [
  {
    path: '/:catchAll(.*)',
    name: 'unknown',
    redirect: '/404'
  },
  {
    path: '/',
    name: 'no-route',
    redirect: '/customers-list'
  },
  
];
routes = [...customersRoutes,...sharedRoutes,...categoriesRoutes, ...productsRoutes, ...routes ];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});


export default router;
