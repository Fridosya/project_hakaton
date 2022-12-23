<template>
   <div class="page-flex">
      <AsideMenu></AsideMenu>
      <div class="page">
         <div class="container-fluid">
            <div class="row flex-nowrap">
               <div v-if="!editing">
                  <div class="ps-5">
                     <div class="py-5">
                        <h1>Профиль организации</h1>
                     </div>
                     <div class="row form-employee">
                        <div class="col ps-5 mt-4">
                           <h2>Название</h2>
                           <div class="row pt-3">
                              <div class="col ">
                                 <div>
                                    <p class="mb-0 text-secondary">Фамилия</p>
                                    <p></p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">Телефон</p>
                                    <p></p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">Должность</p>
                                    <p></p>
                                 </div>
                              </div>
                              <div class="col">
                                 <div>
                                    <p class="mb-0 text-secondary">Имя</p>
                                    <p></p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">ИНН</p>
                                    <p></p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">E-mail</p>
                                    <p></p>
                                 </div>
                              </div>
                              <div class="col">
                                 <div>
                                    <p class="mb-0 text-secondary">Отчество</p>
                                    <p></p>
                                 </div>
                                 <div>
                                    <p class="mb-0 text-secondary">Краткое название</p>
                                    <p></p>
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
                              class=" button-width btn ">Редактировать</button>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-else>
                  <div class="ps-5">
                     <div class="py-5">
                        <h1>Профиль организации - редактирование</h1>
                     </div>
                     <div class="row form-employee">
                        <div class="col ps-5 mt-4">
                           <div class="row pt-3">
                              <div class="col">
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">Фамилия<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control " type="text" placeholder="Введите фамилию">
                                 </div>
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">Телефон<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control " type="text" placeholder="+7 (***) ***-**-**">
                                 </div>
                                 <div class=" mb-5 pe-5">
                                    <p class="mb-0 text-start">Должность<b class="text-danger ps-1">*</b></p>
                                    <select class="form-select" aria-label="Пример выбора по умолчанию">
                                       <option selected>Выберите должность</option>
                                       <option value="1">Один</option>
                                       <option value="2">Два</option>
                                       <option value="3">Три</option>
                                    </select>
                                 </div>
                              </div>
                              <div class="col">
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Имя<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control " type="text" placeholder="Введите имя">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">ИНН<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control " type="text" placeholder="ИНН">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">E-mail<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control" type="text" placeholder="Введите ваш Email">
                                 </div>
                              </div>
                              <div class="col">
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Отчество</p>
                                    <input class="form-control" type="text" placeholder="Введите отчество">
                                 </div>
                                 <div class="mb-5 pe-5">
                                    <p class="mb-0 text-start">Краткое название<b class="text-danger ps-1">*</b></p>
                                    <input class="form-control" type="text" placeholder="">
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-3 mt-3 text-center">
                           <div>
                              <p>Фото</p>
                              <img class="photo" src="" alt="photo">
                           </div>
                           <button type="button" class="w-50 my-3 btn btn-primary">Загрузить</button>
                        </div>
                     </div>
                     <div class="ps-5 mt-4 row form-employee ">
                        <div class="py-3">
                           <button @click="updateUser()" type="button" class=" button-width btn btn-primary">Сохранить
                              изменения</button>
                           <button @click="cancel()" type="button"
                              class="ms-3 button-width-sm btn btn-secondary">Отмена</button>
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
import AsideMenu from '@/components/AsideMenu.vue';
import axios from 'axios';

export default {
   components: {
      AsideMenu
   },
   data() {
      return {
         // user: {
         //    email: '',
         //    first_name: '',
         //    last_name: '',
         //    patronymic: '',
         //    TIN: 0,
         //    short_title: '',
         //    position: '',
         //    phone_number: ''
         // },
         editing: false
      }
   },
   methods: {
      getUser() {
         this.editing = false;
         this.user = this.$store.getters.currentUser;
      },
      editUser() {
         this.editing = true;
      },
      cancel() {
         this.editing = false;
      },
      updateUser() {
         axios
            .patch('https://localhost:8000/contractors/' + this.user.id, this.user)
      }
   },
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
</style>