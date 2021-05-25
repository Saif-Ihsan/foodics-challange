export default [
    {
        path: '/categories-list',
        name: 'categories-list',
        meta: {module: 'categories'},
        component: () => import('./components/pages/categories-list.vue')

    },
    {
        path: '/category/:id',
        name: 'categories-create',
        meta: {module: 'categories'},
        component: () => import('./components/pages/category-view.vue')
    },
    {
        path: '/categories-sort',
        name: 'categories-sort',
        meta: {module: 'categories'},
        component: () => import('./components/pages/categories-sort.vue')
    },

];