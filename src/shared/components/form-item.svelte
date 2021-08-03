<template>
    <div class="form-item flex">
        <div class="form-item_label">
            {label}
        </div>
        <div class="form-item_split">:</div>
        <div class="form-item_content">
            <slot />
        </div>
    </div>
</template>

<style lang="less">
.form-item_label {
    background-color: #f4f4f4;
    border-bottom: solid 1px #8d8d8d;
    height: 40px;
    line-height: 40px;
    width: 50px;
    text-align: center;
}

.form-item_split {
    background-color: #f4f4f4;
    border-bottom: solid 1px #8d8d8d;
    height: 40px;
    line-height: 40px;
}
</style>

<script lang="ts">
export let label: string
</script>
