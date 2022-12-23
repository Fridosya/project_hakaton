<template>
    <aside>
        <nav class="aside-nav">
            <div class="aside-item" v-for="link in menuLinks" :key="link.text">
                <a href="#" @click.prevent="$router.push({ name: link.to })" class="aside-link">
                    <img :src="getImgUrl(link.imageSrc)" class="aside-icon">
                    <span class="aside-link-span">{{ link.text }}</span>
                </a>

                <!-- дочерние ссылки -->
                <a v-for="link in link.childLinks" :key="link.text" href="#"
                    @click.prevent="$router.push({ name: link.to })" class="aside-link aside-link-sub">
                    <span class="aside-link-span">{{ link.text }}</span>
                </a>
            </div>
        </nav>
    </aside>
    <!-- <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white rounded-top">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item" v-for="link in menuLinks" :key="link.text">
                    <a href="#" @click.prevent="$router.push({ name: link.to })" class="nav-link px-0 align-middle">
                        <img :src="getImgUrl(link.imageSrc)" class="aside-icon">
                        <span class="ms-1 d-none d-sm-inline text-body">{{ link.text }}</span>
                    </a>
                    <ul class="collapse show nav flex-column ms-1 ps-5">
                        <li v-for="link in link.childLinks" :key="link.text">
                            <a href="#" @click.prevent="$router.push({ name: link.to })" class="nav-link px-0">
                                <span class="d-none d-sm-inline text-body">{{ link.text }}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div> -->
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
                to: 'sotrAccount',
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
            },
                this.menuLinks[3] = {
                    text: 'Профиль организации',
                    to: 'applications',
                    imageSrc: 'img/profile-link.svg',
                    childLinks: []
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
    text-decoration: none;
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