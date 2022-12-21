<template>
    <div class="selector" :class="{_show: showBody}">
        <div class="selector-header" @click="showBody = !showBody">
            <span>{{ activeItem.type_display }}</span>
            <div class="selector-arrow">
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.15787 4.79702L7.24894 0.822788C7.35112 0.691417 7.2575 0.5 7.09107 0.5L0.908928 0.5C0.742498 0.5 0.648879 0.691416 0.751057 0.822788L3.84213 4.79702C3.9222 4.89997 4.0778 4.89997 4.15787 4.79702Z"
                        fill="#9DA7B0" />
                </svg>
            </div>
        </div>
        <div class="selector-body" v-show="showBody">
            <div class="selector-list">
                <div class="selector-item" v-for="item in bodyItems" :key="item.type" @click="itemSelected(item)">
                    {{ item.type_display }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const clickOutside = {
        bind: function (el, binding, vnode) {
            el.clickOutsideEvent = function (event) {
                if (!(el == event.target || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function (el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    }

    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        directives: {
            clickOutside
        },
        data: () => ({
            showBody: false
        }),
        computed: {
            activeItem() {
                return this.items.find(item => item.active)
            },
            bodyItems() {
                return this.items.filter(item => !item.active)
            }
        },
        methods: {
            itemSelected(item) {
                this.showBody = false
                this.$emit('itemSelected', item)
            }
        },
        created() {
            window.addEventListener('click', e => {
                if (!this.$el.contains(e.target)) {
                    this.showBody = false
                }
            })
        }
    }
</script>

<style scoped>
    .selector {
        width: 100%;
        position: relative;
    }

    .selector-header {
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #D5D9DD;
        border-radius: 6px;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 40px;
        white-space: nowrap;

        display: flex;
        align-items: center;
    }

    .selector-header span {
        overflow: hidden;
    }

    .selector-arrow {
        position: absolute;
        right: 18px;
        transition: .3s;
    }

    .selector._show .selector-arrow {
        transform: rotate(180deg);
        transform-origin: center;
    }

    .selector-arrow svg {
        vertical-align: middle;
    }

    .selector-body {
        position: absolute;
        background: #FFFFFF;
        border: 1px solid #D5D9DD;
        border-radius: 6px;
        top: 45px;
        left: 0;
        min-width: 100%;
        overflow: hidden;
    }

    .selector-item {
        cursor: pointer;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-family: 'Roboto';
        /* font-weight: 300; */
        font-size: 16px;
        line-height: 16px;
        white-space: nowrap;
        transition: .2s;
    }

    .selector-item:hover {
        background: #5fb1e8;
        color: #fff;
    }
</style>