<template>
   <div class="page-flex">
      <AsideMenu></AsideMenu>
      <div class="page">
         <div class="container-fluid">
            <div class="row flex-nowrap">
               <div v-if="!editing">
                  <div class="ps-5">
                     <div class="py-5">
                        <h1>Профиль сотрудника</h1>
                     </div>
                     <div class="row form-employee">
                        <div class="col ps-5 mt-4">
                           <h2>Имя</h2>
                           <div class="row pt-3">
                              <div class="col">
                                 <div>
                                    <p class="mb-0 text-secondary">Отдел</p>
                                    <p>Аналитика</p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">Телефон</p>
                                    <p>{{ user.phone_number }}</p>
                                 </div>
                              </div>
                              <div class="col">
                                 <div>
                                    <p class="mb-0 text-secondary">Должность</p>
                                    <p>{{ user.position }}</p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">E-mail</p>
                                    <p>{{ user.email }}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col mt-3 text-center">
                           <p>Фото</p>
                           <img src="" alt="photo">
                        </div>
                     </div>
                     <div class="ps-5 mt-4 row form-employee">
                        <div class="py-3">
                           <button @click="editUser()" type="button" id="button-copmleted"
                              class="button-width btn">Редактировать</button>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-if="editing">
                  <div class="ps-5">
                     <div class="py-5">
                        <h1>Профиль сотрудника - Редактирование</h1>
                     </div>
                     <div class="row form-employee">
                        <div class="col ps-5 mt-4">
                           <div class="row pt-3">
                              <div class="col">
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Фамилия<b class="text-danger ps-1">*</b></p>
                                    <input v-model="user.first_name" class="form-control" type="text"
                                       placeholder="Введите фамилию">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Имя<b class="text-danger ps-1">*</b></p>
                                    <input v-model="user.last_name" class="form-control" type="text"
                                       placeholder="Введите имя">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Отчество<b class="text-danger ps-1">*</b></p>
                                    <input v-model="user.patronymic" class="form-control" type="text"
                                       placeholder="Введите отчество">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Отдел</p>
                                    <select class="form-select" aria-label="Пример выбора по умолчанию">
                                       <option selected>Выберите отдел</option>
                                       <option value="1">Один</option>
                                       <option value="2">Два</option>
                                       <option value="3">Три</option>
                                    </select>
                                 </div>
                              </div>
                              <div class="col">
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">Телефон<b class="text-danger ps-1">*</b></p>
                                    <input v-model="user.phone_number" class="form-control" type="text"
                                       placeholder="+7 (***) ***-**-**">
                                 </div>
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">E-mail<b class="text-danger ps-1">*</b></p>
                                    <input v-model="user.email" class="form-control" type="text"
                                       placeholder="Введите ваш Email">
                                 </div>
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">Должность<b class="text-danger ps-1">*</b></p>
                                    <select v-model="user.position" class="form-select"
                                       aria-label="Пример выбора по умолчанию">
                                       <option selected>Выберите должность</option>
                                       <option value="1">Один</option>
                                       <option value="2">Два</option>
                                       <option value="3">Три</option>
                                    </select>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col mt-3 text-center">
                           <div>
                              <p>Фото</p>
                              <img class="photo" src="" alt="photo">
                           </div>
                           <button type="button" id="button-copmleted" class="w-50 my-3 btn ">Загрузить</button>
                        </div>
                     </div>
                     <div class="ps-5 mt-4 row form-employee">
                        <div class="py-3">
                           <button @click="updateUser()" type="button" id="button-copmleted"
                              class="button-width btn">Сохранить изменения</button>
                           <button @click="cancel()" type="button" id="button-resume"
                              class="ms-3 button-width-sm btn">Отмена</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu.vue'
import axios from 'axios';

export default {
   components: {
      AsideMenu
   },
   data() {
      return {
         user: {
            email: '',
            first_name: '',
            last_name: '',
            patronymic: '',
            phone_number: 0,
            position: 0
         },
         editing: false
      }
   },
   created() {
      this.getUser();
   },
   methods: {
      getUser() {
         this.editing = false;
         this.user = this.$store.getters.currentUser;
      },
      updateUser() {
         console.log(this.user);
         axios.
            patch(
               'https://localhost:8000/customers/' + this.user.id, this.user, { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } })
            .then(() =>
               this.getUser())
            .catch(exception => {
               console.log(exception)
            })
            .then(() => {
               this.editing = false;
            })
      },
      editUser() {
         this.editing = true;
      },
      cancel() {
         this.editing = false;
      }
   }
}
</script>

<style>
.form-employee {
   background-color: white;
   height: auto;
   width: 1300px;
}

.button-width {
   width: 250px;
}

#button-copmleted {
   color: white;
   background-color: #0b6ab8;
}

#button-copmleted {
   color: white;
   background-color: #0b6ab8;
}

#button-resume {
   color: #76a6ff;
   background-color: rgb(205, 223, 255);
}
</style>