import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import TeamsMembers from './components/teams/TeamMembers.vue';
import UsersList from './pages/UsersList.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams',
            meta: { needsAuth: true },
            path: '/teams', components: { default: TeamsList, footer: TeamsFooter }, children: [
                { name: 'team-members', path: '/teams/:teamId', component: TeamsMembers, props: true },
            ]
        },
        { path: '/users', components: { default: UsersList, footer: UsersFooter }, },
        { path: '/:notfound(.*)', component: NotFound },
    ],

    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});

router.beforeEach(function (to, from, next) {
    console.log('Global beforeEach');
    console.log(to, from);
    if (to.meta.needsAuth) {
        console.log('need auth');
        next();
    } else {
        next();
    }
});
router.afterEach(function (to, from) {
    // sending analytics data
    console.log('Global afterEach');
    console.log(to, from);
});

export default router;