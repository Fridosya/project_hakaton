<template>
    <nav class="navbar is-info">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <img/>
            </router-link>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <template v-if="!$store.state.isAuthenticated">
                            <router-link to="/sign-up" class="button is-info"><strong>Зарегистрироваться</strong>
                            </router-link>
                            <router-link to="/log-in" class="button is-light">Войти</router-link>
                        </template>

                        <template v-else>
                            <router-link to="/dashboard/my-account" class="button is-info">My account</router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarView'
}
</script>