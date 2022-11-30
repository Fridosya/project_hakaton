<template>
   <div class="container">
      <div class="columns is-multiline">
         <div class="column is-12">
            <h1 class="title">Создание заявки</h1>
         </div>

         <button class="button is-info">
            <router-link to="/bids" class="has-text-white">Все заявки</router-link>
         </button>

         <div class="column is-12">
            <form @submit.prevent="submitForm">

               <div class="field">
                  <label>Название проекта</label>
                  <div class="control">
                     <input type="text" class="input" v-model="name">
                  </div>
               </div>

               <div class="field">
                  <label>Вид работ</label>
                  <div class="control">
                     <select class="select is-normal">
                        <option value="">Подготовительные</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                     </select>
                  </div>
               </div>

               <p class="subtitle">Сроки выполнения</p>
               <div class="field">
                  <label>С</label>
                  <div class="control">
                     <input type="date" class="input" />
                  </div>
               </div>

               <div class="field">
                  <label>По</label>
                  <div class="control">
                     <input type="date" class="input" />
                  </div>
               </div>

               <p class="subtitle">Сроки выполнения</p>
               <div class="field">
                  <label>От</label>
                  <div class="control">
                     <input type="number" class="input" />
                  </div>
               </div>

               <div class="field">
                  <label>До</label>
                  <div class="control">
                     <input type="number" class="input" />
                  </div>
               </div>

               <div class="field">
                  <label>Краткое описание</label>
                  <div class="control">
                     <input type="textarea" class="input" />
                  </div>
               </div>

            </form>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
export default {
   name: 'AddClient',
   data() {
      return {
         name: '',
         //  contact_person: '',
         //  email: '',
         //  phone: '',
         //  estimated_value: 0,
         //  website: ''
      }
   },
   methods: {
      async submitForm() {
         this.$store.commit('setIsLoading', true)
         const client = {
            name: this.name,
            //   contact_person: this.contact_person,
            //   email: this.email,
            //   phone: this.phone,
            //   website: this.website
         }
         await axios
            .post('', client)
            .then(() => {
               toast({
                  message: 'The client was added',
                  type: 'is-success',
                  dismissible: true,
                  pauseOnHover: true,
                  duration: 2000,
                  position: 'bottom-right',
               })
               this.$router.push('/')
            })
            .catch(error => {
               console.log(error)
            })
         this.$store.commit('setIsLoading', false)
      }
   }
}
</script>