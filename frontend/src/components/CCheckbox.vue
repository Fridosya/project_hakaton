<template>
    <div class="checkbox">
        <!-- <label :for="'checkbox-' + id" class="checkbox__label">
            <input type="checkbox" :id="'checkbox-' + id" class="checkbox__input" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)">
            <span class="checkbox__text"><slot></slot></span>
        </label> -->
        <input type="checkbox" :id="'checkbox-' + id" class="checkbox__input" :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)">
        <label :for="'checkbox-' + id" class="checkbox__label">
            <span>
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        props: ['id', 'modelValue'],
        emits: ['update:modelValue']
    }
</script>

<style>
    .checkbox {
        width: fit-content;
        position: relative;
    }

    .checkbox__input {
        display: none;
    }

    .checkbox__label {
        color: #000;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        margin-left: 8px;
        cursor: pointer;
    }

    .checkbox__label>span {
        margin-left: 8px;
        padding-top: 2px;
    }

    .checkbox__label::before {
        content: '';
        display: block;
        width: 16px;
        min-width: 16px;
        height: 16px;
        border: 1px solid #D5D9DD;
        border-radius: 3px;
        background: #fff;
    }

    .checkbox__label::after {
        content: '';
        display: none;
        width: 11px;
        height: 6px;
        border-bottom: 1.5px solid #000;
        border-left: 1.5px solid #000;
        transform: rotate(-50deg);
        position: absolute;
        left: 11px;
        margin-bottom: 4px;
    }

    .checkbox__input:checked+.checkbox__label::after {
        display: block;
    }
</style>