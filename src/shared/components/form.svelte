<template>
    <div class="form">
        <slot />
    </div>
</template>

<script lang="ts">
import { setContext } from 'svelte'

export let labelWidth = 50
export let layout: 'float' | 'inline' = 'inline'

setContext('config', {
    labelWidth,
    layout
})
</script>
