import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from "@/stores/index.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'welcome-login',
                    component: () => import('@/components/welcome/LoginPage.vue')
                },
                {
                    path: 'register',
                    name: 'welcome-register',
                    component: () => import('@/components/welcome/RegisterPage.vue')
                },
                {
                    path: 'forget',
                    name: 'welcome-forget',
                    component: () => import('@/components/welcome/ForgetPage.vue')
                }
            ],
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexView.vue'),
            children: [
                {
                    path: '',
                    name: 'dataview',
                    component: () => import('@/components/index/DataView.vue')
                },
                {
                    path: '/COstatistics',
                    name: 'complaintObjectStatistics',
                    component: () => import('@/components/index/ComplaintObjectStatistics.vue')
                },
                {
                    path: '/CQstatistics',
                    name: 'complaintQuestionStatistics',
                    component: () => import('@/components/index/ComplaintQuestionStatistics.vue')
                },

            ],
        }
    ]
})

router.beforeEach((to, from, next) => {
    const store = useStore()
    if (store.user != null && to.name.startsWith("welcome-")) {
        next('/index')
        console.log('0');
    } else if (store.user == null && to.fullPath.startsWith('/index')) {
        next('/');
        console.log(store.user);
    } else if (to.matched.length === 0) {
        next('/index')
    } else {
        next()
    }
})

export default router