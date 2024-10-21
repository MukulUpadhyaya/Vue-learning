import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./pages/requests/RequestReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id', component: CoachDetails, props: true, children: [
                { path: 'contact', component: ContactCoach },
            ]
        },
        { path: '/register', name:'register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/auth', name:'auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/request', name:'request', component: RequestReceived, meta: { requiresAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next({ name: 'auth' });
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next({ name: 'coaches' });
	} else {
		next();
	}
    
});

export default router;