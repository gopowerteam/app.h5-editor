<template>
    <div class="form-item flex">
        <div
            class="form-item_label flex items-center justify-center"
            style="width:{labelWidth}px;">
            {label}
        </div>
        <div class="form-item_split flex items-center justify-center">:</div>
        <div class="form-item_content">
            <slot />
        </div>
    </div>
</template>

<style lang="less">
.form-item_label {
    background-color: #f4f4f4;
    border-bottom: solid 1px #8d8d8d;
    text-align: center;
}

.form-item_split {
    background-color: #f4f4f4;
    border-bottom: solid 1px #8d8d8d;
}
</style>

<script lang="ts">
import { getContext } from 'svelte'

export let label: string

const { labelWidth } = getContext('config')
</script>
