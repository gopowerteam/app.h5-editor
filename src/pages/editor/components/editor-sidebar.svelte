<template>
    <div class="absolute inset-0 flex flex-column">
        <div class="menu">
            {#each widgetMenus as menu}
                <div
                    on:click="{() => (currentMenu = menu.name)}"
                    class:active="{currentMenu == menu.name}"
                    class="menu-item flex flex-col justify-center items-center py-3 hover:text-blue-500 cursor-pointer">
                    <svelte:component this="{menu.icon}" />
                    <div class="pt-2 text-xs">{menu.label}</div>
                </div>
            {/each}
        </div>
        <div class="flex-auto"></div>
    </div>
</template>

<style lang="less">
.menu {
    width: 50px;
    flex-basis: 50px;
    border-right: solid 1px rgba(0, 0, 0, 0.1);

    .menu-item {
        &.active {
            background-color: rgba(@primary-color, 0.8);
            color: #fff;
        }
    }
}
</style>

<script lang="ts">
import SettingsAdjust24 from 'carbon-icons-svelte/lib/SettingsAdjust24'
import MediaLibrary24 from 'carbon-icons-svelte/lib/MediaLibrary24'

let currentMenu = 'base'

// 基础类组件
const baseWidgets = [
    {
        label: '文字',
        event: '',
        icon: ''
    },
    {
        label: '图片',
        event: '',
        icon: ''
    }
]

// 引用类组件
const quoteWidgets = []

const widgetMenus = [
    {
        label: '基础',
        name: 'base',
        icon: SettingsAdjust24,
        widgets: baseWidgets
    },
    {
        label: '引用',
        name: 'quote',
        icon: MediaLibrary24,
        wigets: baseWidgets
    }
]
</script>
