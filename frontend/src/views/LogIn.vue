<template>
   <div class="container">
      <div class="columns">
         <div class="column is-4 is-offset-4">
            <h1 class="title">Авторизация</h1>

            <form @submit.prevent="submitForm">
               <div class="field">
                  <label>Электронная почта</label>
                  <div class="control">
                     <input type="email" name="email" class="input" v-model="email">
                  </div>
               </div>

               <div class="field">
                  <label>Пароль</label>
                  <div class="control">
                     <input type="password" name="password" class="input" v-model="password">
                  </div>
               </div>

               <!-- <div class="notification is-danger" v-if="errors.length">
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
               </div> -->

               <div class="field has-text-centered">
                  <div class="control">
                     <button class="button is-info">Войти</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'LogIn',
   data() {
      return {
         email: '',
         password: '',
         errors: []
      }
   },
   methods: {
      async submitForm() {
         this.$store.commit('setIsLoading', true)
         axios.defaults.headers.common['Authorization'] = ''
         localStorage.removeItem('token')
         const formData = {
            email: this.email,
            password: this.password
         }
         await axios
            .post('/login/', formData)
            .then(response => {
               const token = response.data.auth_token
               this.$store.commit('setToken', token)
               axios.defaults.headers.common['Authorization'] = 'Token ' + token
               localStorage.setItem('token', token)
            })
            .catch(error => {
               if (error.response) {
                  for (const property in error.response.data) {
                     this.errors.push(`${property}: ${error.response.data[property]}`)
                  }
               } else if (error.message) {
                  this.errors.push('Что-то пошло не так. Попробуйте позже!')
               }
            })
         await axios
            .get('')
            .then(response => {
               this.$store.commit('setUser', { 'id': response.data.id, 'email': response.data.email })
               localStorage.setItem('email', response.data.email)
               localStorage.setItem('userid', response.data.id)
            })
            .catch(error => {
               console.log(error)
            })
         this.$store.commit('setIsLoading', false)
      }
   }
}
</script>