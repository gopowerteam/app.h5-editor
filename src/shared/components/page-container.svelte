<svelte:head>
    <title>{title}</title>
</svelte:head>

<template>
    <div class="absolute inset-0 flex flex-col">
        {#if header}
            <div class="header pl-5 py-5 flex items-center justify-between">
                <div class="title text-xl">{title}</div>
                <div class="action pr-10">
                    <slot name="action" />
                </div>
            </div>
        {/if}
        <div class="content p-5 flex-auto">
            <slot />
        </div>
    </div>
</template>

<style lang="less">
.header {
    height: 72px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.content {
    overflow: auto;
    position: relative;
}
</style>

<script lang="ts">
import { useStore } from '@/store'

export let header: boolean = true
export let layout: 'default' | 'workspace'
export let title: string = '' // 默认标题

const { dispatch } = useStore((store) => store.app)

if (layout) {
    dispatch('updateLayout', layout)
}
</script>
