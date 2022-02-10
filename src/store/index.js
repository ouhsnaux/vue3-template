import { createStore } from 'vuex';

export default createStore({
  modules: {
    a: {
      namespaced: true,
      state: {
        count: 1,
      },
      mutations: {
        addOne(state) {
          state.count += 1;
        },
      },
      actions: {
        asyncAddOne({ commit }) {
          commit('addOne');
        },
      },
    },
    b: {
      namespaced: true,
      state: {
        count: 1,
      },
      mutations: {
        addOne(state) {
          state.count += 1;
        },
      },
      actions: {
        asyncAddOne({ commit }) {
          setTimeout(() => {
            commit('addOne');
          }, 100);
        },
      },
    },
  },
});
