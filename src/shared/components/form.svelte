<template>
    <div class="form">
        <slot />
    </div>
</template>

<script lang="ts">
import { setContext } from 'svelte'

export let labelWidth = 50

setContext('config', {
    labelWidth
})
</script>
