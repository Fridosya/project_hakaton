<template>
    <form action="#" class="form form-register" method="post" @submit.prevent="login">
        <h1 class="form__header">Регистрация в личном кабинете подрядчика</h1>
        <div class="form__group form__group--col-2" v-if="vuelidateExternalResults.common.length">
            <div v-for="error in vuelidateExternalResults.common" :key="error" class="form__input-error">{{error}}</div>
        </div>

        <div class="form__group">
            <div class="form__label">Фамилия<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.surname.$error}" type="text"
                v-model="v$.surname.$model" name="surname">
            <div v-if="v$.surname.$error" class="form__input-error">
                {{ v$.surname.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Имя<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.name.$error}" type="text"
                v-model="v$.name.$model" name="name">
            <div v-if="v$.name.$error" class="form__input-error">
                {{ v$.name.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Отчество</div>
            <input class="form__input" :class="{'form__input--error': v$.patronymic.$error}" type="text"
                v-model="v$.patronymic.$model" name="patronymic">
            <div v-if="v$.patronymic.$error" class="form__input-error">
                {{ v$.patronymic.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">ИНН<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.INN.$error}" type="text"
                v-model="v$.INN.$model" name="INN">
            <div v-if="v$.INN.$error" class="form__input-error">
                {{ v$.INN.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Краткое название<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.shortTitle.$error}" type="text"
                v-model="v$.shortTitle.$model" name="shortTitle">
            <div v-if="v$.shortTitle.$error" class="form__input-error">
                {{ v$.shortTitle.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Должность<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.position.$error}" type="text"
                v-model="v$.position.$model" name="position">
            <div v-if="v$.position.$error" class="form__input-error">
                {{ v$.position.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">E-mail<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.email.$error}" type="text"
                v-model="v$.email.$model" name="email">
            <div v-if="v$.email.$error" class="form__input-error">
                {{ v$.email.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Телефон<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.tel.$error}" type="tel" v-model="v$.tel.$model"
                name="tel" placeholder="+7 (___) ___ - __ - __" v-mask="'+7 (###) ### - ## - ##'">
            <div v-if="v$.tel.$error" class="form__input-error">
                {{ v$.tel.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Пароль<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.password.$error }" type="password"
                v-model="v$.password.$model" name="password">
            <div v-if="v$.password.$error" class="form__input-error">
                {{ v$.password.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group">
            <div class="form__label">Подтверждение пароля<span>*</span></div>
            <input class="form__input" :class="{'form__input--error': v$.password2.$error }" type="password"
                v-model="v$.password2.$model" name="password">
            <div v-if="v$.password2.$error" class="form__input-error">
                {{ v$.password2.$errors[0].$message }}
            </div>
        </div>

        <div class="form__group form__group--col-2">
            <CCheckbox :id="1" v-model="v$.personalData.$model" name="personal_data" class="form__checkbox"
                :class="{'form__checkbox--error': v$.personalData.$error }">Я даю
                согласие на обработку персональных данных <span>*</span></CCheckbox>
            <CCheckbox :id="2" v-model="v$.termsOfUse.$model" name="terms_of_use" class="form__checkbox"
                :class="{'form__checkbox--error': v$.termsOfUse.$error }">Принимаю
                условия <a href="#" target="_blank">Пользовательского соглашения</a> <span>*</span></CCheckbox>
            <div v-if="v$.personalData.$error || v$.termsOfUse.$error" class="form__input-error">
                Необходимо ваше согласие!
            </div>
        </div>

        <div class="form__group form__group--col-2">
            <CButton class="form__button">Зарегистрироваться</CButton>

            <p class="form__register">
                Уже есть аккаунт? <router-link :to="{ name: 'login' }">Вход</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import CButton from '@/components/CButton.vue'
    import CCheckbox from '@/components/CCheckbox.vue'

    import axios from 'axios'

    import { useVuelidate } from '@vuelidate/core'
    import { required, helpers, numeric, email, sameAs, minLength, maxLength } from '@vuelidate/validators'
    import { mask } from 'vue-the-mask'


    export default {
        components: {
            CButton,
            CCheckbox
        },
        directives: {
            mask
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
                password2: '',
                surname: '',
                name: '',
                patronymic: '',
                INN: '',
                shortTitle: '',
                position: '',
                tel: '',
                personalData: false,
                termsOfUse: false,
                vuelidateExternalResults: {
                    surname: [],
                    name: [],
                    patronymic: [],
                    INN: [],
                    shortTitle: [],
                    position: [],
                    tel: [],
                    email: [],
                    password: [],
                    password2: [],
                    personal_data: [],
                    termsOfUse: [],
                    common: []
                }
            }
        },
        methods: {
            async login() {
                const isFormCorrect = await this.v$.$validate()

                if (!isFormCorrect) return

                const formData = {
                    'email': this.email,
                    'password': this.password,
                    'first_name': this.name,
                    'last_name': this.surname,
                    'TIN': this.INN,
                    'short_title': this.short_title,
                    'position': this.position,
                    'phone_number': this.tel.replaceAll(/[\s)(+-]/g, '')
                }

                if (this.patronymic) {
                    formData['patronymic'] = this.patronymic
                }

                axios.
                    post('http://127.0.0.1:8000/contractors/', formData)
                    .then(() => {
                        axios.
                            post('http://127.0.0.1:8000/login/', {
                                'email': this.email,
                                'password': this.password
                            }, { withCredentials: true })
                            .then(res => {
                                if (res.data.success) {
                                    // костыль: передаю и устанавливаю куки вручную, 
                                    // потому что теперь межсайтово и без ssl не получится 
                                    // this.$cookies.set('sessionid', res.data.session.id, res.data.session.expiry_age)

                                    this.$store.dispatch('login')
                                    this.$router.push({ name: 'home' })
                                }
                            })
                    })
                    .catch(exc => {
                        const data = exc.response.data

                        if (data.detail) {
                            Object.assign(
                                this.vuelidateExternalResults,
                                { common: [data.detail] }
                            )

                            return
                        }

                        if (data.email) {
                            Object.assign(
                                this.vuelidateExternalResults,
                                { email: [data.email] }
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
                password: {
                    required: helpers.withMessage('Введите пароль', required),
                    minLength: helpers.withMessage('Пароль должен содержать не менее 8 символов', minLength(8))
                },
                password2: {
                    required: helpers.withMessage('Введите подтверждение пароля', required),
                    sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(this.password))
                },
                surname: { required: helpers.withMessage('Введите фамилию', required) },
                name: { required: helpers.withMessage('Введите имя', required) },
                patronymic: {},
                INN: {
                    required: helpers.withMessage('Введите ИНН', required),
                    numeric: helpers.withMessage('Поле должно содержать только цифры', numeric),
                    minLength: helpers.withMessage('ИНН должен содержать 10 символов', minLength(10)),
                    maxLength: helpers.withMessage('ИНН должен содержать 10 символов', maxLength(10)),
                },
                shortTitle: { required: helpers.withMessage('Введите краткое название', required) },
                position: { required: helpers.withMessage('Введите должность', required) },
                tel: { required: helpers.withMessage('Введите номер телефона', required) },
                personalData: { sameAs: sameAs(true) },
                termsOfUse: { sameAs: sameAs(true) },
            }
        }
    }
</script>

<style>
    .form-register {
        width: 855px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 115px;
        row-gap: 45px;
        padding-bottom: 50px;
    }

    .form-register .form__header {
        grid-column: 1 / 3;
        margin-bottom: 0;
    }

    .form-register .form__group {
        margin-bottom: 0;
    }

    .form__group--col-2 {
        grid-column: 1 / 3;
    }

    .form__label {
        color: #72808E;
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        margin-bottom: 5px;
    }

    .form__label span {
        color: #F5222D;
        padding-left: 4px;
    }

    .checkbox__label span>span {
        padding-left: 2px;
        color: #F5222D;
    }

    .form-register .form__checkbox {
        margin: 0 0 10px;
    }

    .form-register .form__button {
        margin-top: 0;
    }

    .form__checkbox--error .checkbox__label::before {
        border: 1px solid #F5222D;
    }
</style>