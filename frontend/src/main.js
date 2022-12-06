import { createApp } from 'vue/dist/vue.esm-bundler'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import store from '@/store'
import router from '@/router'


const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueTheMask)

//инициализация стейта
const sessionid = app.$cookies.get('sessionid')

if (sessionid) {
    store.commit('mutateisAuthorized', true)
}

app.mount('#app')
