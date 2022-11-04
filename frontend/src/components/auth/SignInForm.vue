<template>
   <form @submit.prevent="login">
      <div class="form-group">
         <label for="username">Логин:</label>
         <input v-model="form.username" type="text" id="username" placeholder="Логин..." />
      </div>
      <div class="form-group">
         <label for="password">Пароль:</label>
         <input v-model="form.password" type="password" id="password" placeholder="Пароль..." />
      </div>
      <button class="primary" type="submit">Войти</button>
      <p class="mt-3">Ещё не зарегистрированы? <router-link to="/auth/signup">Регистрация</router-link>
      </p>
   </form>
</template>

<script>
import authRequest from '@/mixins/authRequest'

export default {
   name: "SignInForm",
   data() {
      return {
         form: {
            username: "",
            password: ""
         }
      };
   },

   mixins: [ authRequest ],

   methods: {
      async login() {
         // логика авторизации
         try {
            const response = await this.authRequest('auth/token', this.form)
            // авторизуем юзера
            this.setLogined(response.data.token)

         } catch (error) {
            console.error('AN API ERROR:', error)
         }
      },
      setLogined(token) {
         // сохраняем токен
         console.log(token);
         localStorage.setItem('token', token);
      }
   }
}
</script>