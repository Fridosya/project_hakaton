<template>
   <form @submit.prevent="register">
      <p v-if="err">{{ err }}</p>

      <div class="form-group required">
         <label class="control-label" for="surname">Фамилия</label>
         <input v-model="form.surname" type="text" id="surname" placeholder="Фамилия..." />
      </div>

      <div class="form-group required">
         <label class="control-label" for="username">Имя</label>
         <input v-model="form.username" type="text" id="username" placeholder="Имя..." />
      </div>

      <div class="form-group required">
         <label class="control-label" for="patronymic">Отчество</label>
         <input v-model="form.patronymic" type="text" id="patronymic" placeholder="Отчество..." />
      </div>

      <div class="form-group required">
         <label class="control-label" for="inn">ИНН</label>
         <input v-model="form.inn" type="text" id="inn" placeholder="ИНН..." />
      </div>

      <div class="form-group required">
         <label class="control-label" for="company_name">Краткое название</label>
         <input v-model="form.company_name" type="text" id="company_name" placeholder="Краткое название..." />
      </div>

      <div class="form-group reuired">
         <label class="control-label" for="email">Электронная почта</label>
         <input v-model="form.email" type="email" id="email" placeholder="Электронная почта...">
      </div>

      <div class="form-group required">
         <label class="control-label" for="phone">Телефон</label>
         <input v-model="form.phone" type="text" id="phone" v-imask="phoneNumberMask" placeholder="+7(921)123-45-67"
            @keypress="isNumber" @accept="onAccept" @complete="onComplete" />
      </div>

      <button class="primary" type="submit" :disabled="formValid">Регистрация</button>

   </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { IMaskDirective } from 'vue-imask'
import authRequest from '@/mixins/authRequest'
export default {
   name: "SignUpForm",
   data() {
      return {
         form: {
            surname: "",
            username: "",
            patronymic: "",
            inn: "",
         }
      }
   },
   userPhone: "",
   phoneNumberMask: {
      mask: '+{7}(000)000-00-00',
      lazy: true
   },
   err: '',
   validations: {
      form: {
         surname: {
            required,
            minLength: minLength(2)
         }
      }
   },
   mixins: [authRequest],
   computed: {
      // formValid() {
      //    return this.$v.$invalid
      // },
      isPasswordTheSame() {
         const form = this.$v.form
         return form.password.required
            && form.repeatPassword.required
            && !form.repeatPassword.sameAs
      }
   },
   methods: {
      async register() {
         try {
            await this.authRequest('auth/users', this.form)
            this.$router.push('/auth/signup')
         } catch (e) {
            console.error('AN API ERROR', e)
            this.err = e
         }
      },
      onAccept(e) {
         const maskRef = e.detail
         this.form.phone = maskRef.value
      },
      onComplete(e) {
         const maskRef = e.detail
         this.phone = maskRef.unmaskedValue
      },
      isNumber(e) {
         const regex = /[0-9]/
         if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
         }
      }
   },
   directives: {
      imask: IMaskDirective
   }
}
</script>