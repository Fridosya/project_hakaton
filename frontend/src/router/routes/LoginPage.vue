<template>
    <form action="#" class="form" method="post" @submit.prevent="login">
        <h1 class="form__header">Авторизация</h1>
        <div class="form__group" v-if="vuelidateExternalResults.common.length">
            <div v-for="error in vuelidateExternalResults.common" :key="error" class="form__input-error">{{error}}</div>
        </div>
        <div class="form__group">
            <input class="form__input" :class="{'form__input--error': v$.email.$error}" type="text"
                v-model="v$.email.$model" name="email" placeholder="Ваш e-mail">
            <div v-if="v$.email.$error" class="form__input-error">
                {{ v$.email.$errors[0].$message }}
            </div>
        </div>
        <div class="form__group">
            <input class="form__input" :class="{'form__input--error': v$.password.$error }" type="password"
                v-model="v$.password.$model" name="password" placeholder="Ваш пароль">
            <div v-if="v$.password.$error" class="form__input-error">
                {{ v$.password.$errors[0].$message }}
            </div>
        </div>
        <CButton class="form__button">Войти</CButton>
        <CCheckbox :id="1" name="remember_me" class="form__checkbox">Запомнить меня</CCheckbox>
        <p class="form__register">
            <router-link :to="{name: 'register'}">Зарегистрироваться</router-link> как подрядчик
        </p>
    </form>
</template>

<script>
    import CButton from '@/components/CButton.vue'
    import CCheckbox from '@/components/CCheckbox.vue'

    // import axios from 'axios'

    import { useVuelidate } from '@vuelidate/core'
    import { required, helpers, email } from '@vuelidate/validators'


    export default {
        components: {
            CButton,
            CCheckbox
        },
        setup() {

            return {
                v$: useVuelidate()
            }
        },
        data() {
            return {
                email: '',
                password: '',
                vuelidateExternalResults: {
                    email: [],
                    password: [],
                    common: []
                }
            }
        },
        methods: {
            async login() {
                const isFormCorrect = await this.v$.$validate()

                if (!isFormCorrect) return

                this.$http.
                    post('https://localhost:8000/login/', {
                        'email': this.email,
                        'password': this.password
                    })
                    .then(res => {
                        if (res.data.success) {
                            // костыль: передаю и устанавливаю куки вручную, 
                            // потому что теперь межсайтово и без ssl не получится 
                            // this.$cookies.set('sessionid', res.data.session.id, res.data.session.expiry_age)
                            // console.log(res.data.user, typeof res.data.user)
                            this.$store.commit('mutateisAuthorized', true)
                            this.$store.commit('mutateUser', res.data.user)
                            localStorage.setItem('user', JSON.stringify(res.data.user))
                            if (res.data.account) {
                                this.$store.commit('mutateAccount', res.data.account)
                                localStorage.setItem('account', JSON.stringify(res.data.account))
                            }
                            this.$router.push({ name: 'home' })
                        }
                    })
                    .catch(exc => {
                        const data = exc.response.data

                        if (data.non_field_errors) {
                            Object.assign(
                                this.vuelidateExternalResults,
                                { common: Array.from(data.non_field_errors.values()) }
                            )

                            return
                        }

                        if (data) {
                            Object.assign(
                                this.vuelidateExternalResults,
                                data
                            )
                        }
                    })
            }
        },
        validations() {
            return {
                email: { 
                    required: helpers.withMessage('Введите e-mail', required),
                    email: helpers.withMessage('Введите корректный e-mail', email)
                },
                password: { required: helpers.withMessage('Введите пароль', required) }
            }
        }
    }
</script>

<style>
    .form {
        width: 365px;
        margin: 0 auto;
        margin-top: 150px;
    }

    .form__header {
        color: #5B5B5B;
        font-weight: 500;
        font-size: 32px;
        line-height: 39px;
        margin-bottom: 75px;
    }

    .form__group {
        width: 100%;
        margin-bottom: 40px;
    }

    .form__input--error {
        border: 1px solid #F5222D !important;
        border-radius: 6px;
    }

    .form__input-error {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        color: #F5222D;
        margin-top: 5px;
    }

    .form__button {
        margin: 0 auto;
        width: 225px;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .form__checkbox {
        margin: 0 auto;
        margin-bottom: 20px;
    }

    .form__register {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        font-family: 'Roboto';
    }

    .form__register a {
        font-family: 'Roboto';
    }
</style>