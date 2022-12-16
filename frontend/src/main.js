import { createApp } from 'vue/dist/vue.esm-bundler'
import VueTheMask from 'vue-the-mask'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import store from '@/store'
import router from '@/router'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueTheMask)
app.use(VueCookies)

//инициализация стейта
const sessionid = app.$cookies.get('sessionid')

if (sessionid) {
    store.commit('mutateisAuthorized', true)
    store.commit('mutateUser', JSON.parse(localStorage.getItem('user')))
    store.commit('mutateAccount', JSON.parse(localStorage.getItem('account')))
}

app.mount('#app')
