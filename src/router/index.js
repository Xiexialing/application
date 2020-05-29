import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Application',
        component: () => import(/* webpackChunkName: "application" */ '../views/application/index.vue')
    },
    {
        path: '/addStepOne',
        name: 'AddStepOne',
        component: () => import(/* webpackChunkName: "application" */ '../views/application/pages/AddStepOne.vue')
    },
    {
        path: '/anchor',
        name: 'Anchor',
        component: () => import(/* webpackChunkName: "anchor" */ '../views/anchor')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
