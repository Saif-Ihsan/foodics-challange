export default [
    {
        path: '/customers-list',
        name: 'customers-list',
        meta: {module: 'customers'},
        component: () => import('./components/pages/customers-list.vue')

    },
    {
        path: '/customer/:id',
        name: 'customers-create',
        meta: {module: 'customers'},
        component: () => import('./components/pages/customer-view.vue')

    },

];