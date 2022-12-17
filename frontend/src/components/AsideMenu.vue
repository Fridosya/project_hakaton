<template>
    <aside>
        <nav class="aside-nav">
            <div class="aside-item" v-for="link in menuLinks" :key="link.text">
                <a href="#" @click.prevent="$router.push({ name:link.to })" class="aside-link">
                    <img :src="getImgUrl(link.imageSrc)" class="aside-icon">
                    <span class="aside-link-span">{{link.text}}</span>
                </a>

                <!-- дочерние ссылки -->
                <a v-for="link in link.childLinks" :key="link.text" href="#"
                    @click.prevent="$router.push({ name:link.to })" class="aside-link aside-link-sub">
                    <span class="aside-link-span">{{link.text}}</span>
                </a>
            </div>
        </nav>
    </aside>
</template>

<script>
    export default {
        data: () => ({
            menuLinks: [
                {
                    text: 'Главная страница',
                    to: 'home',
                    imageSrc: 'img/home-link.svg',
                    childLinks: []
                },
                {
                    text: 'Найм подрядчиков',
                    to: 'applications',
                    imageSrc: 'img/contractors-link.svg',
                    childLinks: [
                        {
                            text: 'Заявки',
                            to: 'applications'
                        },
                        {
                            text: 'Рейтинг организаций',
                            to: 'applications'
                        },
                        {
                            text: 'Договоры',
                            to: 'applications'
                        },
                        {
                            text: 'Паспорта проектов',
                            to: 'applications'
                        },
                    ]
                },
                {
                    text: 'Аналитика',
                    to: 'home',
                    imageSrc: 'img/analytics-link.svg',
                    childLinks: []
                },
                {
                    text: 'Профиль сотрудника',
                    to: 'home',
                    imageSrc: 'img/profile-link.svg',
                    childLinks: []
                },
                {
                    text: 'Уведомления',
                    to: 'home',
                    imageSrc: 'img/notifications-link.svg',
                    childLinks: []
                },
                {
                    text: 'Сообщения',
                    to: 'home',
                    imageSrc: 'img/messages-link.svg',
                    childLinks: []
                }
            ]
        }),
        methods: {
            getImgUrl(pic) {
                return require('../assets/' + pic)
            }
        },
        created() {
            const user = this.$store.getters.currentUser

            if (user.is_contractor) {
                this.menuLinks[1] = {
                    text: 'Поиск проекта',
                    to: 'applications',
                    imageSrc: 'img/contractors-link.svg',
                    childLinks: [
                        {
                            text: 'Предложения',
                            to: 'applications'
                        },
                        {
                            text: 'Рейтинг организаций',
                            to: 'applications'
                        },
                        {
                            text: 'Договоры',
                            to: 'applications'
                        },
                        {
                            text: 'Паспорта проектов',
                            to: 'applications'
                        },
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    aside {
        width: 350px;
        min-width: 350px;
        background: #FFFFFF;
        border-right: 1px solid #D2D1D1;
        min-height: calc(100vh - 75px);

        padding-top: 50px;
        padding-left: 20px;
    }

    .aside-link {
        display: flex;
        align-items: center;
        transition: .3s;
        width: fit-content;
    }

    .aside-link:hover {
        opacity: .8;
    }

    .aside-item:not(:last-child) {
        margin-bottom: 35px;
    }

    .aside-link-span {
        padding-left: 12px;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #5B5B5B;
    }

    .aside-link-sub {
        margin-left: 75px;
        margin-top: 25px;
    }
</style>