<template>
    <button :class="{_danger: danger}">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            danger: Boolean
        }
    }
</script>

<style scoped>
    button {
        display: block;
        height: 35px;
        background: #1F78B4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        border: none;
        text-align: center;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        cursor: pointer;
        transition: .3s;
    }

    button:hover {
        background: #1d70a7;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }

    ._danger {
        color: #F5222D;
        background: #FFEFF0;
    }

    ._danger:hover {
        background: #F5222D;
        color: #FFEFF0;
    }
</style>