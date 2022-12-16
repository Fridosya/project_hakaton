<template>
    <header>
        <router-link to="/" class="logo">
            <img src="../assets/img/logo.svg" alt="">
        </router-link>
    </header>
</template>

<script>
    export default {
        name: 'CHeader'
    }
</script>

<style scoped>
header {
    height: 75px;
    width: 100%;
    background: #1f78b4;
}

.logo img {
    margin-top: 2px;
}
</style>