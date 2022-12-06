import { createStore } from 'vuex'


const store = createStore({
    actions: {
        login({ commit }) {
            commit('mutateisAuthorized', true)
        }
    },
    mutations: {
        mutateisAuthorized(state, isAuthorized) {
            state.isAuthorized = isAuthorized
        }
    },
    state() {
        return {
            isAuthorized: false,
            user: false
        }
    },
    getters: {
        isAuthorized(state) {
            return state.isAuthorized
        }
    }
})

export default store