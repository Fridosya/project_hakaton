<template>
    <div class="page-flex">
        <AsideMenu></AsideMenu>
        <div class="page">
            Заявки
        </div>
    </div>
</template>

<script>
    import AsideMenu from '@/components/AsideMenu.vue'

    export default {
        components: {
            AsideMenu
        }
    }
</script>

<style>
    .page-flex {
        display: flex;
    }
</style>