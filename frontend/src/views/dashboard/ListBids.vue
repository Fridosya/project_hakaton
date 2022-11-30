<template>
   <div class="container">
      <div class="columns is-multiline">
         <div class="column is-10">
            <h1 class="title">Заявки</h1>
            <hr>

            <form @submit.prevent="getBids">
               <div class="field has-addons">
                  <div class="control">
                     <input type="text" class="input" v-model="query">
                  </div>
                  <div class="control">
                     <button class="button is-info">Поиск</button>
                  </div>
               </div>
            </form>
         </div>
         <div class="column is-2">
            <button class="button is-info">
               <router-link to="/bids/create" class="has-text-white">Подать новую заявку</router-link>
            </button>
         </div>

         <div class="column is-10">
            <!-- <template v-if="bids.length"> -->
            <!-- <template> -->
            <!-- <table class="table is-fullwidth">
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Contact person</th>
                        <th></th>
                     </tr>
                  </thead>

                  <tbody>
                     <tr v-for="client in clients" v-bind:key="client.id">
                        <td>{{ client.name }}</td>
                        <td>{{ client.contact_person }}</td>
                        <td>
                           <router-link :to="{ name: 'Client', params: { id: client.id } }">Details</router-link>
                        </td>
                     </tr>
                  </tbody>
               </table> -->

            <div class="card mb-4">
               <div class="card-content">
                  <p class="title">
                     Название проекта 1
                  </p>
                  <hr />

                  <div class="columns">
                     <div class="column is-6">
                        <div class="card-subtitle">
                           <p class="has-text-grey">Вид работ</p>
                           <p>Подготовительные</p>
                        </div>
                     </div>
                     <div class="column is-6">
                        <div class="card-subtitle">
                           <p class="has-text-grey">Сроки выполнения</p>
                           <p>21.01.2022 - 21.02.2022</p>
                        </div>
                     </div>
                  </div>

                  <p class="has-text-grey">Краткое описание</p>
                  <div class="card-subtitle">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla laudantium explicabo voluptatum
                     sequi facere iste ipsum nisi, debitis a delectus odit eos aspernatur impedit repellat error.
                     Dolor ut excepturi pariatur?
                  </div>
               </div>
            </div>

            <div class="card mb-4">
               <div class="card-content">
                  <p class="title">
                     Название проекта 1
                  </p>
                  <hr />

                  <div class="columns">
                     <div class="column is-6">
                        <div class="card-subtitle">
                           <p class="has-text-grey">Вид работ</p>
                           <p>Подготовительные</p>
                        </div>
                     </div>
                     <div class="column is-6">
                        <div class="card-subtitle">
                           <p class="has-text-grey">Сроки выполнения</p>
                           <p>21.01.2022 - 21.02.2022</p>
                        </div>
                     </div>
                  </div>

                  <p class="has-text-grey">Краткое описание</p>
                  <div class="card-subtitle">
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla laudantium explicabo voluptatum
                     sequi facere iste ipsum nisi, debitis a delectus odit eos aspernatur impedit repellat error.
                     Dolor ut excepturi pariatur?
                  </div>
               </div>
               <footer class="card-footer">
                  <router-link to="/bids/1" class="card-footer-item">Просмотр заявки</router-link>
                  <router-link to="/bids/1/edit" class="card-footer-item">Редактирование</router-link>
               </footer>
            </div>

            <div class="buttons">
               <button class="button is-light" @click="goToPreviousPage()" v-if="showPreviousButton">Previous</button>
               <button class="button is-light" @click="goToNextPage()" v-if="showNextButton">Next</button>
            </div>
            <!-- </template> -->

            <!-- <template v-else>
               <p>Заявок нет</p>
            </template> -->
         </div>
         <div class="column is-2">
            <div class="container has-background-white">
               <p class="title">Статус</p>
               <p><label><input type="radio" v-model="selectedResult" value="All" />Все заявки</label></p>
               <p><label><input type="radio" v-model="selectedResult" value="Draft" />Проект заявки</label></p>
               <p><label><input type="radio" v-model="selectedResult" value="CarriedOut" />Осуществляется набор</label>
               </p>
               <p><label><input type="radio" v-model="selectedResult" value="Assigned" />Исполнитель назначен</label>
               </p>
               <p><label><input type="radio" v-model="selectedResult" value="Finished" />Завершенные</label></p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
   name: 'ListBids',
   data() {
      return {
         bids: [],
         showNextButton: false,
         showPreviousButton: false,
         currentPage: 1,
         query: '',
         selectedResult: -1
      }
   },
   mounted() {
      this.getBids()
   },
   methods: {
      goToNextPage() {
         this.currentPage += 1
         this.getBids()
      },
      goToPreviousPage() {
         this.currentPage -= 1
         this.getBids()
      },
      async getBids() {
         this.$store.commit('setIsLoading', true)
         this.showNextButton = false
         this.showPreviousButton = false
         await axios
            .get('/?page=${this.currentPage}&search=${this.query}')
            .then(response => {
               this.bids = response.data.results
               if (response.data.next) {
                  this.showNextButton = true
               }
               if (response.data.previous) {
                  this.showPreviousButton = true
               }
            })
            .catch(error => {
               console.log(error)
            })
         this.$store.commit('setIsLoading', false)
      }
   }
}
</script>