<template>
   <div class="container">
      <div class="columns is-multiline">
         <div class="column is-12">
            <h1 class="title">Просмотр заявки</h1>
         </div>

         <button class="button is-info">
            <router-link to="/bids" class="has-text-white">Все заявки</router-link>
         </button>

         <div class="column is-12">
            <div class="box">
               <h2 class="subtitle">Название проекта</h2>
               <p><strong>Вид работ </strong></p>
               <p><strong>Сроки выполнения </strong></p>
               <p><strong>Бюджет </strong></p>
               <p><strong>Краткое описание </strong></p>
               <p><strong>Задачи </strong></p>
            </div>
         </div>

         <hr>

         <div class="buttons">
            <router-link to="/" class="button is-light">Edit
            </router-link>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'BidView',
   data() {
      return {
      }
   },
   mounted() {
      this.getClient()
   },
   methods: {
      async getClient() {
         this.$store.commit('setIsLoading', true)
         const bidId = this.$route.params.id
         await axios
            .get(`/api/bid/${bidId}/`)
            .then(response => {
               this.client = response.data
            })
            .catch(error => {
               console.log(error)
            })
         this.$store.commit('setIsLoading', false)
      }
   }
}
</script>