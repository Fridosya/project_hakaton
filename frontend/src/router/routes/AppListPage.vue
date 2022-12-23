<template>
    <div class="page-flex">
        <AsideMenu></AsideMenu>
        <div class="page">
            <div class="apps-wrapper">

                <div class="apps-column">

                    <h1 class="title">Заявки</h1>
                    <div class="search-block">
                        <h2 class="search-title">Поиск</h2>
                        <div class="search">
                            <button class="search-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4.5" cy="5.47446" r="3.75" stroke="#9DA7B0" stroke-width="1.5" />
                                    <path d="M7.5 8.47446L11 11.9745" stroke="#9DA7B0" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </button>
                            <input type="text" class="search-input" placeholder="Поиск по заявкам" v-model="search">
                        </div>
                        <p class="apps-count">Всего заявок: {{ apps.length }}</p>
                    </div>

                    <div class="apps-list">
                        <template v-if="apps.length">
                            <AppListItem v-for="app in apps" :key="app.id" :title="app.title"
                                @deleteApp="deleteApp(app.id)" :description="app.description"
                                :work_type="app.work_type_display" :deadline_from="app.deadline_from"
                                :deadline_to="app.deadline_to" :status="app.status" :status_display="app.status_display" :id="app.id">
                            </AppListItem>
                        </template>

                        <div v-else class="no-apps">
                            Заявок нет
                        </div>
                    </div>

                </div>

                <div class="filters-column">

                    <CButton class="btn-new-app" @click="$router.push({ name: 'applicationCreate' })">
                        <div class="app-plus">
                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.8008 5.64844V8.19141H0.105469V5.64844H11.8008ZM7.32422 0.867188V13.2891H4.59375V0.867188H7.32422Z"
                                    fill="#9DA7B0" />
                            </svg>
                        </div>
                        <span>Подать новую заявку</span>
                    </CButton>

                    <div class="filter _status">
                        <div class="filter-header">
                            <h4 class="filter-title">
                                Статус
                            </h4>
                        </div>
                        <div class="filter-body">
                            <div v-for="filter in statusFilters" :key="filter.type" class="filter-choice"
                                :class="{_active: filter.active}" @click="changeStatusActiveFilter(filter.type)">
                                <div class="filter-choice-marker" :style="{backgroundColor: filter.color}"></div>
                                <span>{{ filter.type }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="filter _date">
                        <div class="filter-header" @click="dateFilterShow = !dateFilterShow">
                            <h4 class="filter-title">
                                Даты
                            </h4>
                            <div class="filter-plus" v-show="!dateFilterShow">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0.818237V10.8182" stroke="#9DA7B0" stroke-width="1.5"
                                        stroke-linecap="round" />
                                    <path d="M11 5.81824L1 5.81824" stroke="#9DA7B0" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                        <div class="filter-body" v-show="dateFilterShow">
                            <div class="filter-date-wrapper">
                                <span>С</span>
                                <CDatepicker v-model="dateFrom" calendar-class-name="filter-dp" locale="ru"
                                    :enable-time-picker="false" :clearable="false" auto-apply :format="'dd.MM'">
                                </CDatepicker>
                            </div>
                            <div class="filter-date-wrapper">
                                <span>До</span>
                                <CDatepicker v-model="dateTo" calendar-class-name="filter-dp" locale="ru"
                                    :enable-time-picker="false" :clearable="false" auto-apply :format="'dd.MM'">
                                </CDatepicker>
                            </div>
                        </div>
                    </div>

                    <div class="filter _type">
                        <div class="filter-header" @click="typeFilterShow = !typeFilterShow">
                            <h4 class="filter-title">
                                Виды работ
                            </h4>
                            <div class="filter-plus" v-show="!typeFilterShow">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 0.818237V10.8182" stroke="#9DA7B0" stroke-width="1.5"
                                        stroke-linecap="round" />
                                    <path d="M11 5.81824L1 5.81824" stroke="#9DA7B0" stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                        <div class="filter-body" v-show="typeFilterShow">
                            <CCheckbox class="filter-type" v-for="filter in typeFilters" :key="filter.type"
                                :id="filter.type" v-model="filter.active">{{filter.typeDisplay}}</CCheckbox>
                        </div>
                    </div>

                    <CButton @click="resetFilters" v-show="resetFiltersShow" class="filter-reset" danger>Очистить
                        фильтры</CButton>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import AsideMenu from '@/components/AsideMenu.vue'
    import AppListItem from '@/components/AppListItem.vue'
    import CButton from '@/components/CButton.vue'
    import CCheckbox from '@/components/CCheckbox.vue'
    import { ref } from 'vue'


    export default {
        components: {
            AsideMenu,
            AppListItem,
            CButton,
            CCheckbox
        },
        data: () => ({
            search: '',
            statusFilters: [
                {
                    type: 'Все заявки',
                    color: '#111112',
                    active: true,
                    filter: () => true
                },
                {
                    type: 'Проект заявки',
                    color: '#72808E',
                    active: false,
                    filter: (app) => app.status_display == 'Проект заявки'
                },
                {
                    type: 'Осуществляется набор',
                    color: '#4EB135',
                    active: false,
                    filter: (app) => app.status_display == 'Осуществляется набор'
                },
                {
                    type: 'Исполнитель назначен',
                    color: '#467BE3',
                    active: false,
                    filter: (app) => app.status_display == 'Исполнитель назначен'
                },
                {
                    type: 'Завершенные',
                    color: '#9DA7B0',
                    active: false,
                    filter: (app) => app.status_display == 'Завершенные'
                }
            ],
            dateFilterShow: false,
            typeFilterShow: false,
            typeFilters: [
                {
                    type: 'PREP',
                    typeDisplay: 'Подготовительные',
                    active: false
                },
                {
                    type: 'GEOD',
                    typeDisplay: 'Геодезические',
                    active: false
                },
                {
                    type: 'ZEM',
                    typeDisplay: 'Земляные',
                    active: false
                },
                {
                    type: 'UST',
                    typeDisplay: 'Устройство скважин',
                    active: false
                },
                {
                    type: 'SWAI',
                    typeDisplay: 'Свайные работы. Крепление грунтов',
                    active: false
                },
                {
                    type: 'ZBI',
                    typeDisplay: 'Устройство бетонных и железнобетонных монолитных конструкций',
                    active: false
                },
                {
                    type: 'MON',
                    typeDisplay: 'Монтаж сборных бетонных и железнобетонных конструкций',
                    active: false
                },
                {
                    type: 'BOM',
                    typeDisplay: 'Буровзрывные работы при строительстве',
                    active: false
                }
            ],
        }),
        computed: {
            apps() {
                let apps = this.$store.getters.apps
                
                apps.sort((app1, app2) => {
                    return app1.created_at > app2.created_at ? 1 : -1
                })

                const activeStatusFilter = this.statusFilters.find(filter => filter.active)
                apps = apps.filter(activeStatusFilter.filter)

                if (this.dateFrom) {
                    apps = apps.filter(app => Date.parse(app.deadline_from.split('.').reverse().join('/')) >= this.dateFrom)
                }

                if (this.dateTo) {
                    apps = apps.filter(app => Date.parse(app.deadline_to.split('.').reverse().join('/')) <= this.dateTo)
                }

                const activeTypes = this.typeFilters.filter(filter => filter.active).map(filter => filter.type)

                if (activeTypes.length) {
                    apps = apps.filter(app => activeTypes.includes(app.work_type))
                }

                // search

                if (this.search.length) {
                    apps = apps.filter(app => {
                        return app.title.toLowerCase().includes(this.search.toLowerCase()) || app.description.toLowerCase().includes(this.search.toLowerCase())
                    })
                }

                return apps
            },
            resetFiltersShow() {
                let toShow = false

                if (this.statusFilters.find(filter => filter.active).type !== 'Все заявки') {
                    toShow = true
                }

                if (typeof this.dateFrom !== 'undefined' || typeof this.dateTo !== 'undefined') {
                    toShow = true
                }

                if (this.typeFilters.filter(filter => filter.active).length) {
                    toShow = true
                }

                return toShow
            }
        },
        methods: {
            changeStatusActiveFilter(type) {
                this.statusFilters.forEach(filter => {
                    if (filter.type == type) {
                        filter.active = true
                    } else { filter.active = false }
                })
            },
            resetFilters() {
                this.statusFilters = this.statusFilters.map(filter => {
                    if (filter.type == 'Все заявки') {
                        filter.active = true
                    } else { filter.active = false }

                    return filter
                })

                this.typeFilters = this.typeFilters.map(filter => {
                    filter.active = false; return filter
                })

                this.dateTo = ref()
                this.dateFrom = ref()

                this.dateFilterShow = false
                this.typeFilterShow = false
            },
            deleteApp(id) {
                this.$http
                    .delete(`https://localhost:8000/project_app/${id}`, { headers: { "X-Csrftoken": this.$cookies.get('csrftoken') } })
                    .then(res => {
                        if (res.status == 204) {
                            this.$store.commit('deleteApp', id)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        setup() {
            const dateFrom = ref();
            const dateTo = ref();

            return {
                dateFrom,
                dateTo
            }
        },
        created() {
            this.$store.dispatch('fetchApps', this.$http)
        }
    }
</script>

<style>
    .page-flex {
        display: flex;
    }

    .page {
        flex-grow: 1;
    }

    .apps-wrapper {
        width: 100%;
        padding-top: 55px;
        padding-left: 40px;
        padding-right: 35px;
        padding-bottom: 40px;
        display: grid;
        grid-template-columns: auto 310px;
        column-gap: 20px;
    }

    .title {
        margin-bottom: 35px;
        font-weight: 500;
        font-size: 32px;
        line-height: 39px;
        color: #5B5B5B;
    }

    .search-block {
        background: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 15px 35px;
        margin-bottom: 30px;
    }

    .search-title {
        color: #111112;
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 10px;
    }

    .search {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .search-button {
        position: absolute;
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
    }

    .search .search-input {
        padding-left: 35px;
    }

    .apps-count {
        color: #000;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }

    .no-apps {
        background: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 30px 0;
        display: flex;
        justify-content: center;

        font-family: 'Roboto';
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #72808E;
    }

    .apps-list .app:not(:last-child) {
        margin-bottom: 35px;
    }

    .btn-new-app {
        margin: 0 auto;
        margin-bottom: 30px;
        padding-left: 15px;
        padding-right: 25px;
    }

    .app-plus {
        margin-right: 7.5px;
        display: flex;
        align-items: center;
    }

    .filters-column {
        padding-top: 30px;
    }

    .filters-column .btn-new-app {
        display: flex;
        align-items: center;
    }

    .filter {
        background: #FFFFFF;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
        border-radius: 15px;
    }

    .filter._status {
        margin-bottom: 30px;
    }

    .filter-header {
        padding: 0px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
    }

    .filter._status .filter-header {
        padding: 20px 30px 13px;
    }

    .filter-title {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        color: #72808E;
    }

    .filter-body {
        padding-left: 5px;
        padding-bottom: 20px;
    }

    .filter-choice {
        cursor: pointer;
        height: 50px;
        padding: 0 25px;
        display: flex;
        align-items: center;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 16px;
        color: #111112;
    }

    .filter-choice._active {
        background: #E7F2FF;
    }

    .filter-choice-marker {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .filter._date {
        border-radius: 6px 6px 0 0;
        border-bottom: 1px solid #EAECEE;
    }

    .filter._date .filter-header {
        cursor: pointer;
    }

    .filter._date .filter-body {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 15px;
        padding: 10px 30px;
    }

    .filter-date-wrapper {
        display: flex;
        align-items: center;
    }

    .filter-date-wrapper span {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #111112;
        padding-right: 8px;
    }

    .filter-date-wrapper input {
        padding-right: 40px;
        padding-left: 10px;
    }

    .dp__input_icon {
        left: unset !important;
        right: 3px;
    }

    .filter._type {
        border-radius: 0 0 6px 6px;
    }

    .filter._type .filter-header {
        cursor: pointer;
    }

    .filter._type .filter-body {
        padding: 10px 30px 25px;
    }

    .filter-type:not(:last-child) {
        margin-bottom: 10px;
    }

    .filter-reset {
        width: 100%;
        margin-top: 30px;
    }
</style>