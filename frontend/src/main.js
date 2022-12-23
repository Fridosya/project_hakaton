import { createApp } from 'vue/dist/vue.esm-bundler'
import { Bootstrap } from 'bootstrap'
import VueTheMask from 'vue-the-mask'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.css'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueTheMask)
app.use(VueCookies)
app.use(Bootstrap)

//инициализация стейта
const sessionid = app.$cookies.get('sessionid')

if (sessionid) {
    store.commit('mutateisAuthorized', true)
    store.commit('mutateUser', JSON.parse(localStorage.getItem('user')))
    store.commit('mutateAccount', JSON.parse(localStorage.getItem('account')))
}

app.mount('#app')