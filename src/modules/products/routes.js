export default [
    {
        path: '/products-list',
        name: 'products-list',
        meta: {module: 'products'},
        component: () => import('./components/pages/products-list.vue')

    },
    {
        path: '/product/:id',
        name: 'products-create',
        meta: {module: 'products'},
        component: () => import('./components/pages/product-view.vue')

    },

];