<template>
    <div class="page-flex">
        <AsideMenu></AsideMenu>
        <div class="page">
            <div class="app-create-wrapper">
                <h1 class="title">Создание заявки</h1>

                <a href="#" @click.prevent="$router.push({ name: 'applications' })" class="back">
                    <div class="back-arrow">
                        <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.939337 10.9393C0.35355 11.5251 0.35355 12.4749 0.939337 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939337 10.9393ZM32.0294 10.5L2 10.5V13.5L32.0294 13.5V10.5Z"
                                fill="#3497C1" />
                        </svg>
                    </div>
                    <span>Все заявки</span>
                </a>

                <form action="#" class="app-form">
                    <div class="form-group _3c">
                        <h3>Название проекта <span>*</span></h3>
                        <input type="text" :class="{'form__input--error': v$.title.$error}" v-model="v$.title.$model">
                        <div v-if="v$.title.$error" class="form__input-error">
                            {{ v$.title.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="form-group">
                        <h3>Вид работ <span>*</span></h3>
                        <CSelector :items="workTypeItems" @itemSelected="setActiveWorkType"></CSelector>
                    </div>

                    <div class="form-group">
                        <h3>Сроки выполнения <span>*</span></h3>
                        <div class="form-inputs-wrapper">
                            <div class="form-short-wrapper">
                                <span>С</span>
                                <CDatepicker v-model="dateFrom" calendar-class-name="filter-dp" locale="ru"
                                    :enable-time-picker="false" :clearable="false" auto-apply :format="'dd.MM'"
                                    :class="{'form__input--error': !dateFrom && vuelidateExternalResults.dates.length}">
                                </CDatepicker>
                            </div>
                            <div class="form-short-wrapper">
                                <span>До</span>
                                <CDatepicker v-model="dateTo" calendar-class-name="filter-dp" locale="ru"
                                    :enable-time-picker="false" :clearable="false" auto-apply :format="'dd.MM'"
                                    :class="{'form__input--error': !dateTo && vuelidateExternalResults.dates.length}">
                                </CDatepicker>
                            </div>
                        </div>
                        <div v-if="vuelidateExternalResults.dates.length && (!dateFrom || !dateTo)"
                            class="form__input-error">
                            {{ vuelidateExternalResults.dates[0] }}
                        </div>
                    </div>

                    <div class="form-group">
                        <h3>Бюджет <span>*</span></h3>
                        <div class="form-inputs-wrapper">
                            <div class="form-short-wrapper">
                                <span>От</span>
                                <input type="text" @keypress="isNumber" v-model="v$.budget_from.$model"
                                    :class="{'form__input--error': v$.budget_from.$error }">
                            </div>
                            <div class="form-short-wrapper">
                                <span>До</span>
                                <input type="text" @keypress="isNumber" v-model="v$.budget_to.$model"
                                    :class="{'form__input--error': v$.budget_to.$error }">
                            </div>
                        </div>
                        <div v-if="v$.budget_from.$error || v$.budget_to.$error" class="form__input-error">
                            {{ (v$.budget_from.$errors.concat(v$.budget_to.$errors))[0].$message }}
                        </div>
                    </div>

                    <div class="form-group _3c">
                        <h3>Краткое описание <span>*</span></h3>
                        <textarea v-model="v$.description.$model"
                            :class="{'form__input--error': v$.description.$error }"></textarea>
                        <div v-if="v$.description.$error" class="form__input-error">
                            {{ v$.description.$errors[0].$message }}
                        </div>
                    </div>

                    <div class="form-group _3c">
                        <h3>Задачи <span>*</span></h3>
                        <textarea @input="handleTasksInput" v-model="v$.tasks.$model"
                            :class="{'form__input--error': v$.tasks.$error}"></textarea>
                        <div v-if=" v$.tasks.$error" class="form__input-error">
                            {{ v$.tasks.$errors[0].$message }}
                        </div>
                    </div>
                </form>

                <div class="app-create-buttons">
                    <CButton @click="publish">Опубликовать заявку</CButton>
                    <CButton blue @click="save">Сохранить</CButton>
                    <button class="save-pdf">Сохранить в PDF</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required, helpers, numeric, minValue, maxValue } from '@vuelidate/validators'

    import AsideMenu from '@/components/AsideMenu.vue'
    import CSelector from '@/components/CSelector.vue'
    import CButton from '@/components/CButton.vue'


    export default {
        components: {
            AsideMenu,
            CSelector,
            CButton
        },
        data: () => ({
            title: null,
            budget_from: null,
            budget_to: null,
            description: null,
            tasks: null,

            workTypeItems: [
                {
                    type: 'PREP',
                    type_display: 'Подготовительные',
                    active: true
                },
                {
                    type: 'GEOD',
                    type_display: 'Геодезические',
                    active: false
                },
                {
                    type: 'ZEM',
                    type_display: 'Земляные',
                    active: false
                },
                {
                    type: 'UST',
                    type_display: 'Устройство скважин',
                    active: false
                },
                {
                    type: 'SWAI',
                    type_display: 'Свайные работы. Крепление грунтов',
                    active: false
                },
                {
                    type: 'ZBI',
                    type_display: 'Устройство бетонных и железнобетонных монолитных конструкций',
                    active: false
                },
                {
                    type: 'MON',
                    type_display: 'Монтаж сборных бетонных и железнобетонных конструкций',
                    active: false
                },
                {
                    type: 'BOM',
                    type_display: 'Буровзрывные работы при строительстве',
                    active: false
                },
            ],
            previousTextareaLength: 0,
            vuelidateExternalResults: {
                dates: [],
                budget: []
            }
        }),
        computed: {
            formattedTasks() {
                return this.tasks.split('\u2022').map(task => task.replaceAll('\n', '').trim()).filter(task => task.length)
            }
        },
        methods: {
            setActiveWorkType(item) {
                this.workTypeItems = this.workTypeItems.map(currentItem => {
                    currentItem.active = currentItem.type == item.type ? true : false
                    return currentItem
                })
            },
            handleTasksInput(event) {
                const bullet = "\u2022";
                const newLength = event.target.value.length;
                const characterCode = event.target.value.substr(-1).charCodeAt(0);

                if (newLength > this.previousTextareaLength) {
                    if (characterCode === 10) {
                        event.target.value = `${event.target.value}${bullet} `;
                    } else if (newLength === 1) {
                        event.target.value = `${bullet} ${event.target.value}`;
                    }
                }

                this.previousTextareaLength = newLength;
            },
            isNumber: evt => {
                evt = (evt) ? evt : window.event
                var charCode = (evt.which) ? evt.which : evt.keyCode
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault()
                } else {
                    return true;
                }
            },
            validate() {
                // своя валидация
                if (!this.dateFrom || !this.dateTo) {
                    Object.assign(
                        this.vuelidateExternalResults,
                        { dates: ['Выберите дату'] }
                    )
                }
            },
            async save() {
                this.validate()
                const isFormValid = await this.v$.$validate()

                if (!isFormValid) return

                const dateFrom = this.dateFrom.toLocaleDateString().split('.').reverse().join('-')
                const dateTo = this.dateTo.toLocaleDateString().split('.').reverse().join('-')
                const workType = this.workTypeItems.find(item => item.active == true).type

                this.$http
                    .post('https://localhost:8000/project_apps/',
                        {
                            title: this.title,
                            work_type: workType,
                            deadline_from: dateFrom,
                            deadline_to: dateTo,
                            budget_from: this.budget_from,
                            budget_to: this.budget_to,
                            description: this.description,
                            tasks: JSON.stringify(this.formattedTasks),
                            status: 'DRAFT'
                        },
                        { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } }
                    )
                    .then(res => {
                        if (res.status == 201) {
                            this.$router.push({ name: 'application', params: { id: res.data.id } })
                        }
                    })
            },
            async publish() {
                this.validate()
                const isFormValid = await this.v$.$validate()

                if (!isFormValid) return

                const dateFrom = this.dateFrom.toLocaleDateString().split('.').reverse().join('-')
                const dateTo = this.dateTo.toLocaleDateString().split('.').reverse().join('-')
                const workType = this.workTypeItems.find(item => item.active == true).type

                this.$http
                    .post('https://localhost:8000/project_apps/',
                        {
                            title: this.title,
                            work_type: workType,
                            deadline_from: dateFrom,
                            deadline_to: dateTo,
                            budget_from: this.budget_from,
                            budget_to: this.budget_to,
                            description: this.description,
                            tasks: JSON.stringify(this.formattedTasks),
                            status: 'SELECTION_PROCESS'
                        },
                        { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } }
                    )
                    .then(res => {
                        if (res.status == 201) {
                            this.$router.push({ name: 'application', params: { id: res.data.id } })
                        }
                    })
            }
        },
        setup() {
            const dateFrom = ref();
            const dateTo = ref();

            return {
                dateFrom,
                dateTo,
                v$: useVuelidate()
            }
        },
        validations() {
            return {
                title: {
                    required: helpers.withMessage('Это поле обязательно обязательно', required)
                },
                budget_from: {
                    required: helpers.withMessage('Укажите минимальный бюджет', required),
                    numeric: helpers.withMessage('Разрешены только числа', numeric)
                },
                budget_to: {
                    required: helpers.withMessage('Укажите максимальный бюджет', required),
                    numeric: helpers.withMessage('Разрешены только числа', numeric),
                    minValue: helpers.withMessage('Максимумальный бюджет должен превышать минимальный', minValue(Number(this.budget_from) + 1)),
                    maxValue: helpers.withMessage('Думаю, 2 000 000 000 пока достаточно. Лень поле в бд на BigInt менять', maxValue(2000000000)),
                },
                description: {
                    required: helpers.withMessage('Это поле обязательно', required)
                },
                tasks: {
                    required: helpers.withMessage('Это поле обязательно', required)
                }
            }
        },
        // mounted() {
        //     console.log(this.v$)
        // }
    }
</script>

<style>
    .app-create-wrapper {
        width: 100%;
        max-width: 900px;
        margin-top: 45px;
        margin-left: 35px;
    }

    .app-create-wrapper .back {
        margin-bottom: 45px;
    }

    .app-form {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 30px;
        row-gap: 35px;
        margin-bottom: 35px;
    }

    .app-form textarea {
        min-height: 130px;
    }

    .app-form .form-group:not(._3c) {
        max-width: 265px;
    }

    .form-group._3c {
        grid-column: 1 / 4;
    }

    .form-group h3 {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #111112;
        margin-bottom: 7px;
    }

    .form-group h3 span {
        color: #F5222D;
        font-size: 13px;
    }

    .form-inputs-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
    }

    .form-short-wrapper {
        display: flex;
        align-items: center;
    }

    .form-short-wrapper span {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #111112;
        padding-right: 5px;
    }

    .app-create-buttons {
        width: 100%;
        background: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 20px 15px 25px;

        display: flex;
        align-items: center;
    }

    .app-create-buttons button {
        min-width: 160px;
        padding: 0 20px;
    }

    .app-create-buttons button:not(:last-child) {
        margin-right: 15px;
    }

    .save-pdf {
        border: none;
        background: none;
        color: #3497C1;
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        cursor: pointer;
        transition: .3s;
    }

    .save-pdf:hover {
        opacity: .5;
    }
</style>