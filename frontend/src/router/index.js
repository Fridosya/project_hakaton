import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

//pages
import HomePage from './routes/HomePage.vue'
import LoginPage from './routes/LoginPage.vue'
import RegisterPage from './routes/RegisterPage.vue'


const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/registration', component: RegisterPage, name: 'register' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authorized = store.getters.isAuthorized

    if (!['login', 'register'].includes(to.name) && !authorized) {
        next({ name: 'login' })
    } else if (['login', 'register'].includes(to.name) && authorized) {
        next({ name: from.name })
    }
    else next()
})

export default router
