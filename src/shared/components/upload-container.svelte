<template>
    <div class="upload">
        <div class="upload-wrapper">
            <input
                class="upload-input"
                type="file"
                on:change="{fileChange}"
                accept="{type}"
                multiple="{mode === 'multiple'}" />
        </div>

        <div class="upload-content">
            <slot />
        </div>
    </div>
</template>

<style lang="less" scoped>
.upload {
    position: relative;
}

.upload-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    .upload-input {
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}
</style>

<script lang="ts">
import { createEventDispatcher } from 'svelte'

export let mode: string = 'single'
export let type: string = 'image/*'

const dispatch = createEventDispatcher()

function fileChange({ target }) {
    let files = target.files

    if (mode === 'single') {
        const [file] = files
        files = file
    }

    dispatch('upload', files)
}
</script>
