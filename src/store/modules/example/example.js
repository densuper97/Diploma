export default {
    // namespaced: true,
    state: {
        count: 120,
    },
    getters: {
        count: state => { return state.count }
    },
    actions: {
        add: function ({commit}) { commit('add') }
    },
    mutations: {
        add: (state) => { state.count = state.count + 1 }
    }
}