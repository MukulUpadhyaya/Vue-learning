import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
    },
    state() {
        return {
            isLoggedIn: false,
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
        isAuthenticated(state) {
            return state.isLoggedIn;
        }
    }
});

export default store;