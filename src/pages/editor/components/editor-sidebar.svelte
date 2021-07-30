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
        <div class="widget-panel flex flex-auto flex-wrap">
            {#each currentWidgets as widget}
                <div
                    on:click="{() => dispatch('createWidget', widget.event)}"
                    class="widget bg-gray-100 hover:bg-gray-50 hover:text-blue-500 cursor-pointer">
                    <svelte:component this="{widget.icon}" />
                    <div class="pt-2 text-xs">{widget.label}</div>
                </div>
            {/each}
        </div>
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

.widget-panel {
    // background-color: rgba(100, 100, 100, 0.1);
    .widget {
        height: 80px;
        margin: 10px;
        padding: 20px;
        text-align: center;

        &:hover {
        }
    }
}
</style>

<script lang="ts">
import { WidgetType } from '@/editor/enums'
import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust24'
import MediaLibrary from 'carbon-icons-svelte/lib/MediaLibrary24'
import TextScale from 'carbon-icons-svelte/lib/TextScale20'
import Image from 'carbon-icons-svelte/lib/Image20'
import { useStore } from '@/store'

const { dispatch } = useStore((state) => state.editor)
let currentMenu = 'base'

$: currentWidgets = widgetMenus.find((x) => x.name === currentMenu).widgets

// 基础类组件
const baseWidgets = [
    {
        label: '文字',
        event: WidgetType.text,
        icon: TextScale
    },
    {
        label: '图片',
        event: WidgetType.image,
        icon: Image
    }
]

// 引用类组件
const quoteWidgets = []

const widgetMenus = [
    {
        label: '基础',
        name: 'base',
        icon: SettingsAdjust,
        widgets: baseWidgets
    },
    {
        label: '引用',
        name: 'quote',
        icon: MediaLibrary,
        widgets: quoteWidgets
    }
]
</script>
