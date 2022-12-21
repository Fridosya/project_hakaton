import { createApp } from 'vue/dist/vue.esm-bundler'
import VueTheMask from 'vue-the-mask'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueTheMask)
app.use(VueCookies)

app.component('CDatepicker', Datepicker)

app.config.globalProperties.$http = axios.create({
    withCredentials: true
})

//инициализация стейта
const sessionid = app.$cookies.get('sessionid')

if (sessionid) {
    store.commit('mutateisAuthorized', true)
    store.commit('mutateUser', JSON.parse(localStorage.getItem('user')))
    store.commit('mutateAccount', JSON.parse(localStorage.getItem('account')))
}

app.mount('#app')
