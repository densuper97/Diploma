import api from '../../../utils/api'

export default {
    state: {
        groups: [],
    },
    getters: {
        groups: state => {
            return state.groups
        },
        getGroup: state => id => {
            return state.groups.find(x => x.id == id)
        }
        // filteredList: (state, name) => {
        //     return state.groups.filter(group => {
        //         return group.name.toLowerCase().includes(name.toLowerCase());
        //     });
        // }
    },
    actions: {
        getGroups: function ({
            commit
        }) {
            commit('setGroups')
        },
        getStaticGroups: function ({
            commit
        }) {
            commit('setStaticGroups')
        }
    },
    mutations: {
        setGroups: (state) => {
            state.groups = api.getGroups()
        },
        setStaticGroups: (state) => {
            state.groups = api.getStaticGroups()
        }
    }
}