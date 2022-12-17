import { createStore } from 'vuex'
import axios from 'axios'


const store = createStore({
    actions: {
        fetchApps({commit}) {
            axios.
                get('https://localhost:8000/project_apps/', {withCredentials: true})
                .then(res => {
                    commit('setApps', res.data)
                })
        }
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
        }
    },
    state() {
        return {
            apps: [],

            isAuthorized: false,
            user: false,
            account: false
            // isAuthorized: true,
            // user: {
            //     email: "best_contractor@mail.ru",
            //     first_name: "Константин",
            //     id: 2,
            //     is_contractor: true,
            //     is_customer: false,
            //     last_name: "Константинопольский",
            //     patronymic: null
            // },
            // account: {
            //     TIN: "1010101010",
            //     id: 1,
            //     phone_number: "79530001122",
            //     position: "Васек",
            //     short_title: null,
            //     user: {
            //         email: "best_contractor@mail.ru",
            //         first_name: "Константин",
            //         id: 2,
            //         is_contractor: true,
            //         is_customer: false,
            //         last_name: "Константинопольский",
            //         patronymic: null
            //     }
            // }
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