import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
    },
    state() {
        return {
            userId: 'c3',
        };
    },

    mutations: {
        login() {
            this.state.isLoggedIn = true;
        },
        logout() {
            this.state.isLoggedIn = false;
        },
    },
    actions: {
        login(context) {
            context.commit('login');
        },
        logout(context) {
            context.commit('logout');
        },
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
});

export default store;