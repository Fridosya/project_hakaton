<template>
  <Navbar />

  <!-- <section class="section background-blue">
      <router-view />
    </section>  -->
  <div class="container">
    <div class="columns">
      <template v-if="$store.state.isAuthenticated">
        <div class="column is-2">
          <div class="menu">
            <ul class="menu-list">
              <li>
                <router-link to="/" class="navbar-item">Главная страница</router-link>
              </li>
              <li>
                <router-link to="/bids" class="navbar-item">Найм подрядчиков</router-link>
                <ul>
                  <li>
                    <router-link to="/bids" class="navbar-item">Заявки</router-link>
                  </li>
                  <li>
                    <router-link to="/" class="navbar-item">Рейтинг организаций</router-link>
                  </li>
                  <li>
                    <router-link to="/" class="navbar-item">Договоры</router-link>
                  </li>
                  <li>
                    <router-link to="/" class="navbar-item">Паспорта проектов</router-link>
                  </li>
                </ul>
              </li>
              <li>
                <router-link to="/" class="navbar-item">Аналитика</router-link>
              </li>
              <li>
                <router-link to="/" class="navbar-item">Профиль сотрудника</router-link>
              </li>
              <li>
                <router-link to="/" class="navbar-item">Уведомления</router-link>
              </li>
              <li>
                <router-link to="/" class="navbar-item">Сообщения</router-link>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading': $store.state.isLoading }">
        <div class="lds-dual-ring"></div>
      </div>
      <div class="column is-10 pt-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    if (this.$store.state.token) {
      axios.defaults.headers.common['Authorization'] = "Token " + this.$store.state.token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}

// .background-blue {
//   background-color: rgb(203, 238, 240);
//   height: max-content;
// }
</style>