import { createRouter, createWebHashHistory } from 'vue-router'
// import store from '@/store'

//pages
import HomePage from './routes/HomePage.vue'
import LoginPage from './routes/LoginPage.vue'
import RegisterPage from './routes/RegisterPage.vue'
import AppsPage from './routes/AppsPage.vue'
import SotrAccountPage from './routes/SotrAccountPage.vue'
import OrgAccountPage from './routes/OrgAccountPage.vue'
import AppListPage from './routes/AppListPage.vue'
import AppPage from './routes/AppPage.vue'
import AppCreate from './routes/AppCreate.vue'


const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/login', component: LoginPage, name: 'login' },
    { path: '/registration', component: RegisterPage, name: 'register' },
    { path: '/applications', component: AppsPage, name: 'applications' },
    { path: '/account', component: SotrAccountPage, name: 'sotrAccount' },
    { path: '/accountOrg', component: OrgAccountPage, name: 'orgAccount'},
    { path: '/applications', component: AppListPage, name: 'applications' },
    { path: '/application/:id', component: AppPage, name: 'application'},
    { path: '/application/create', component: AppCreate, name: 'applicationCreate' },
    { path: '/application/:id/edit', component: AppCreate, name: 'applicationEdit', meta: { edit: true } },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     const authorized = store.getters.isAuthorized

//     // if (authorized) {
//     //     store.dispatch('setUserAndAccount')
//     // }

//     if (!['login', 'register'].includes(to.name) && !authorized) {
//         next({ name: 'login' })
//     } else if (['login', 'register'].includes(to.name) && authorized) {
//         next({ name: from.name })
//     } else next()
// })

export default router