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
                    on:click="{() =>
                        onCreateWidget(widget.event, widget.before)}"
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
    user-select: none;

    .menu-item {
        &.active {
            background-color: rgba(@primary-color, 0.8);
            color: #fff;
        }
    }
}

.widget-panel {
    user-select: none;
    // background-color: rgba(100, 100, 100, 0.1);
    .widget {
        height: 80px;
        margin: 10px;
        padding: 20px;
        text-align: center;
    }
}
</style>

<script lang="ts">
import { WidgetType } from '@/editor/enums'
import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust24'
import MediaLibrary from 'carbon-icons-svelte/lib/MediaLibrary24'
import TextScale from 'carbon-icons-svelte/lib/TextScale20'
import Picture from 'carbon-icons-svelte/lib/Image20'
import { useStore } from '@/store'
import * as R from 'ramda'
import { useModal } from '@gopowerteam/svelte-modal'
import UploadCard from '@/shared/components/upload-card.svelte'
import { createWidget } from '@/editor/data'
import { appConfig } from '@/config/app.config'
const modal = useModal()

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
        icon: Picture,
        before: onbeforeCreateImage
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

async function onbeforeCreateImage() {
    return modal
        .open({
            component: UploadCard,
            width: 500,
            props: {
                labelText: '拖放文件或者通过点击进行上传'
            },
            title: '上传'
        })
        .then(({ url }) => {
            // 创建图片组件数据
            const widget = createWidget(WidgetType.image, url)

            const image = new Image()

            return new Promise((resolve) => {
                image.onload = () => {
                    widget.property.width = image.width
                    widget.property.height = image.height
                    resolve(widget)
                }

                image.src = url
            })
        })
}

async function onCreateWidget(event, before) {
    const action = before || R.identity
    const value = await action(event)

    if (value) {
        dispatch('createWidget', value)
    }
}
</script>
