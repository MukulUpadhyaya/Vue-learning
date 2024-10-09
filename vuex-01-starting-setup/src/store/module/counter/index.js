
import counterMutations from './mutations.js';
import counterActions from './action.js';
import counterGetters from './getters.js';

// local module state
export default {
  namespaced: true, // now entire module detached from store, no potential nameclashes
  state() {
    return {
      counter: 0
    };
  },
  mutations: counterMutations,
  actions: counterActions,
  getters: counterGetters
};
