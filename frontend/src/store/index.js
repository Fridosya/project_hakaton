import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoading: false,
        isAuthenticated: false,
        token: '',
        user: {
            id: 0,
            name: ''
        },
        role: {
            id: 0,
            name: ''
        }
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
                state.user.username = localStorage.getItem('username')
                state.user.id = localStorage.getItem('userid')
                state.role.id = localStorage.getItem('role_id')
                state.role.name = localStorage.getItem('role_name')
            } else {
                state.token = ''
                state.isAuthenticated = false
                state.user.id = 0
                state.user.name = ''
                state.role.id = 0
                state.role.name = ''
            }
        },
        setIsLoading(state, status) {
            state.isLoading = status
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        },
        setUser(state, user) {
            state.user = user
        },
        setRole(state, role) {
            state.role = role

            localStorage.setItem('role_id', role.id)
            localStorage.setItem('role_name', role.name)
        }
    },
    actions: {},
    modules: {}
})