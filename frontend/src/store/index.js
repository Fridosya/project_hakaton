import { createStore } from 'vuex'


const store = createStore({
    actions: {
        fetchApps({ commit }, axiosInstance) {
            axiosInstance.
                get('https://localhost:8000/project_apps/', { withCredentials: true })
                .then(res => {
                    commit('setApps', res.data)
                })
        },
    },
    mutations: {
        mutateisAuthorized(state, isAuthorized) {
            state.isAuthorized = isAuthorized
        },
        mutateUser(state, user) {
            state.user = user
        },
        mutateAccount(state, account) {
            state.account = account
        },
        setApps(state, apps) {
            state.apps = apps
        },
        deleteApp(state, id) {
            state.apps.splice(state.apps.findIndex(app => app.id == id), 1)
        }
    },
    state() {
        return {
            apps: [],

            isAuthorized: false,
            user: false,
            account: false
        }
    },
    getters: {
        isAuthorized(state) {
            return state.isAuthorized
        },
        currentUser(state) {
            return state.user
        },
        currentAccount(state) {
            return state.account
        },
        apps(state) {
            return state.apps
        }
    }
})

export default store