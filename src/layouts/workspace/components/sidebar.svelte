<template>
    <section class="shadow-lg absolute inset-0 flex flex-col">
        <div class="menu flex-auto">
            {#each menuSource as item}
                <div
                    class:active="{item.name === currentRoute}"
                    class="menu-item m-3 py-2 cursor-pointer active:bg-gray-100 hover:bg-gray-200 flex flex-col justify-center items-center rounded"
                    on:click="{() => onNavigate(item.path)}">
                    <svelte:component
                        this="{item.icon}"
                        width="{28}"
                        height="{28}" />
                    <div class="title text-xs pt-1">{item.title}</div>
                </div>
            {/each}
        </div>
        <div class="toolbar">2</div>
        <div class="user">3</div>
    </section>
</template>

<style lang="less">
.menu {
    .menu-item {
        &.active {
            background-color: #f3f4f6;
        }
    }
}
.toolbar {
    flex-basis: 200px;
}
</style>

<script lang="ts">
import router from '@/router'
import { routes } from '@/router/routes'

let currentRoute: string

const menuSource = routes
    .filter((route) => route?.meta?.menu)
    .map((route) => ({
        name: route.name,
        path: route.path,
        title: route.meta.menu.title,
        icon: route.meta.menu.icon
    }))

function onNavigate(path) {
    router.push(path)
}

router.currentMatched.subscribe((matched) => {
    if (matched && matched.length) {
        const [route] = matched
        currentRoute = route.name
    }
})
</script>
