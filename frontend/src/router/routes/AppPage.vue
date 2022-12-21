<template>
    <div class="page-flex">
        <AsideMenu></AsideMenu>
        <div class="page">
            <div class="app-wrapper">
                <template v-if="!notFound && app">
                    <h1 class="title">Просмотр заявки</h1>
                    <a href="#" @click.prevent="$router.push({ name: 'applications' })" class="back">
                        <div class="back-arrow">
                            <svg width="33" height="24" viewBox="0 0 33 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.939337 10.9393C0.35355 11.5251 0.35355 12.4749 0.939337 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939337 10.9393ZM32.0294 10.5L2 10.5V13.5L32.0294 13.5V10.5Z"
                                    fill="#3497C1" />
                            </svg>
                        </div>
                        <span>Все заявки</span>
                    </a>
                    <div class="app-display">
                        <h2 class="app-display-title">{{ app.title }}</h2>
                        <div class="app-display-grid">
                            <div class="app-display-group">
                                <h3>Вид работ</h3>
                                <p>{{ app.work_type_display }}</p>
                            </div>
                            <div class="app-display-group">
                                <h3>Сроки выполнения</h3>
                                <p>{{ app.deadline_from }} - {{ app.deadline_to }}</p>
                            </div>
                            <div class="app-display-group">
                                <h3>Бюджет</h3>
                                <p>{{ app.budget_from.toLocaleString() }} - {{ app.budget_to.toLocaleString() }} Р.</p>
                            </div>
                            <div class="app-display-group _3c">
                                <h3>Краткое описание</h3>
                                <p>{{ app.description }}</p>
                            </div>
                            <div class="app-display-group _3c" v-if="app.tasks.length">
                                <h3>Задачи</h3>
                                <ul class="app-display-tasks">
                                    <li v-for="task in app.tasks" :key="task">{{ task }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="app-buttons" v-if="!['FINISHED', 'PERFORMER_APPOINTED'].includes(app.status)">
                        <template v-if="app.status == 'SELECTION_PROCESS'">
                            <CButton @click="$router.push({ name: 'applicationEdit', params: {id: app.id} })">Редактировать</CButton>
                        </template>
                        <template v-if="app.status == 'DRAFT'">
                            <CButton @click="publish">Опубликовать</CButton>
                            <CButton blue @click="$router.push({ name: 'applicationEdit', params: {id: app.id} })">Продолжить заполнение</CButton>
                            <CButton danger @click="deleteApp">Удалить</CButton>
                        </template>
                    </div>
                </template>
                <h1 class="title" v-else>Заявка не найдена</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import AsideMenu from '@/components/AsideMenu.vue'
    import CButton from '@/components/CButton.vue'


    export default {
        components: {
            AsideMenu,
            CButton
        },
        data: () => ({
            app: null,
            notFound: false
        }),
        methods: {
            fetchApp(id) {
                this.$http
                    .get(`https://localhost:8000/project_app/${id}/`)
                    .then(res => {
                        this.notFound = false
                        this.app = res.data
                        this.app.tasks = JSON.parse(this.app.tasks)
                    })
                    .catch(err => {
                        if (err.status == 404) {
                            this.notFound = true
                        }
                    })
            },
            deleteApp() {
                this.$http
                    .delete(`https://localhost:8000/project_app/${this.app.id}`, { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } })
                    .then(res => {
                        if (res.status == 204) {
                            this.$store.commit('deleteApp', this.app.id)
                            this.$router.push({ name: 'applications' })
                        }
                    })
            },
            publish() {
                this.$http
                    .patch(
                        `https://localhost:8000/project_app/${this.app.id}/`,
                        {
                            status: 'SELECTION_PROCESS'
                        },
                        { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } }
                    )
                    .then(res => {
                        if (res.status == 200) {
                            this.app = res.data
                        }
                    })
                    
            }
        },
        created() {
            this.fetchApp(this.$route.params.id)
        },
        beforeRouteUpdate(to) {
            this.fetchApp(to.params.id)
        },
    }
</script>

<style>
    .app-wrapper {
        width: 100%;
        max-width: 900px;
        margin-top: 45px;
        margin-left: 35px;
    }

    .app-wrapper .title {
        margin-bottom: 30px;
    }

    .back {
        display: flex;
        align-items: center;
        color: #3497C1;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        width: fit-content;
    }

    .back-arrow {
        margin-right: 15px;
        transition: .3s;
        padding-bottom: 2px;
    }

    .back-arrow svg {
        vertical-align: middle;
    }

    .back:hover .back-arrow {
        transform: translateX(-10px);
    }

    .app-wrapper .back {
        margin-bottom: 30px;
    }

    .app-display {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 30px 30px 30px 45px;
    }

    .app-display-title {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 26px;
        line-height: 32px;
        color: #111112;
        margin-bottom: 21px;
    }

    .app-display-grid {
        width: 100%;
        display: grid;
        grid-template-columns: 210px 210px 1fr;
        row-gap: 20px;
        column-gap: 15px;
    }

    .app-display-group._3c {
        grid-column: 1 / 4;
    }

    .app-display-group h3 {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #72808E;
        margin-bottom: 10px;
    }

    .app-display-group p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 20px;
        color: #000;
    }

    .app-display-tasks {
        padding-left: 0;
        list-style-type: none;
    }

    .app-display-tasks li {
        display: flex;
        align-items: center;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 20px;
        color: #000;
        padding-left: 10px;
    }

    .app-display-tasks li:not(:last-child) {
        margin-bottom: 5px;
    }

    .app-display-tasks li::before {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        min-width: 4px;
        border-radius: 50%;
        background: #000;
        margin-right: 10px;
        margin-bottom: 3px;
    }

    .app-buttons {
        margin-top: 30px;
        background: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 20px 15px;
        display: flex;
    }

    .app-buttons button {
        padding: 0 30px;
        min-width: 175px;
    }

    .app-buttons button:not(:last-child) {
        margin-right: 15px;
    }
</style>