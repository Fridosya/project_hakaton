<template>
    <div class="app">
        <div class="app-header">
            <h3 class="app-title">{{ title }}</h3>
            <div class="app-status" :class="{_project: status_display == 'Проект заявки', _collection: status_display == 'Осуществляется набор', _appointed: status_display == 'Исполнитель назначен'}">{{ status_display }}</div>
        </div>

        <div class="app-body">
            <div class="app-prop">
                <h4 class="app-prop-title">Вид работ</h4>
                <p class="app-prop-value">{{ work_type }}</p>
            </div>
            <div class="app-prop">
                <h4 class="app-prop-title">Сроки выполнения</h4>
                <p class="app-prop-value _date">{{ deadline_from }} - {{ deadline_to }}</p>
            </div>
            <div class="app-prop _2column">
                <h4 class="app-prop-title">Краткое описание</h4>
                <p class="app-prop-value">{{ description }}</p>
            </div>
        </div>

        <div class="app-footer">
            <CButton @click="this.$router.push({ name: 'application', params: { id: id } })" class="app-button">Просмотр заявки</CButton>

            <template v-if="status == 'SELECTION_PROCESS'">
                <CButton blue>Редактировать</CButton>
            </template>
            <template v-if="status == 'DRAFT'">
                <CButton @click="publish">Опубликовать</CButton>
                <CButton blue>Продолжить заполнение</CButton>
                <CButton danger @click="$emit('deleteApp')">Удалить</CButton>
            </template>
        </div>
    </div>
</template>

<script>
    import CButton from '@/components/CButton.vue'

    export default {
        components: {
            CButton
        },
        props: ['id', 'title', 'description', 'work_type', 'deadline_from', 'deadline_to', 'status', 'status_display'],
        methods: {
            publish() {
                this.$http
                    .patch(
                        `https://localhost:8000/project_app/${this.id}/`,
                        {
                            status: 'SELECTION_PROCESS'
                        },
                        { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } }
                    )
                    .then(res => {
                        if (res.status == 200) {
                            this.$store.dispatch('fetchApps', this.$http)
                        }
                    })
                    
            }
        }
    }
</script>

<style>
    .app {
        background: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
    }

    .app-header {
        padding: 30px 10px 30px 40px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .app-title {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 22px;
        line-height: 16px;
        color: #111112;
    }

    .app-status {
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        color: #9DA7B0;
        height: 25px;
        padding: 0 10px;
        background: #EAECEE;
        border-radius: 6px;
        display: flex;
        align-items: center;
    }

    .app-status._project {
        color: #72808E;
    }

    .app-status._collection {
        color: #4eb135;
        background: rgba(99, 199, 74, 0.15);
    }

    .app-status._appointed {
        color: #467BE3;
        background: #E7F2FF;
    }

    .app-body {
        padding: 20px 40px;
        padding-right: 100px;
        display: grid;
        grid-template-columns: 355px auto;
        row-gap: 15px;
        border-bottom: 1px solid #E5E5E5;
    }

    .app-prop._2column {
        grid-column: 1 / 3;
    }

    .app-prop-title {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: #72808E;
        margin-bottom: 10px;
    }

    .app-prop-value {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #000;
    }

    .app-prop-value._date {
        color: #467BE3;
    }

    .app-footer {
        padding: 20px 40px;
        display: flex;
    }

    .app-footer button {
        min-width: 165px;
        padding: 0 15px;
        white-space: nowrap;
    }

    .app-footer button:not(:last-child) {
        margin-right: 15px;
    }

    .app-button {
        width: 205px;
    }
</style>