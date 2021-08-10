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
                        onCreateWidget(widget.params, widget.before)}"
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
import { QuoteType, WidgetType } from '@/editor/enums'
import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust24'
import MediaLibrary from 'carbon-icons-svelte/lib/MediaLibrary24'
import TextScale from 'carbon-icons-svelte/lib/TextScale20'
import Picture from 'carbon-icons-svelte/lib/Image20'
import Email from 'carbon-icons-svelte/lib/Email20'
import UserAvatar from 'carbon-icons-svelte/lib/UserAvatar20'

import { useStore } from '@/store'
import * as R from 'ramda'
import { useModal } from '@gopowerteam/svelte-modal'
import UploadCard from '@/shared/components/upload-card.svelte'
import { createWidget } from '@/editor/data'
import type { WidgetParams } from '@/editor/data'
import type { Widget } from '@/editor/model/widget'

const modal = useModal()

const { dispatch } = useStore((state) => state.editor)
let currentMenu = 'base'

$: currentWidgets = widgetMenus.find((x) => x.name === currentMenu).widgets

type WidgetConfig = {
    label: string
    params: WidgetParams
    icon: any
    before?: () => WidgetParams | Widget | Promise<WidgetParams | Widget>
}

// 基础类组件
const baseWidgets: WidgetConfig[] = [
    {
        label: '文字',
        params: {
            widgetType: WidgetType.text
        },
        icon: TextScale
    },
    {
        label: '图片',
        params: {
            widgetType: WidgetType.image
        },
        icon: Picture,
        before: onbeforeCreateImage
    }
]

// 引用类组件
const quoteWidgets: WidgetConfig[] = [
    {
        label: '姓名',
        params: {
            widgetType: WidgetType.text,
            quoteType: QuoteType.username,
            widgetData: {
                text: '<用户名>'
            }
        },
        icon: UserAvatar
    },
    {
        label: '邮箱',
        params: {
            widgetType: WidgetType.text,
            quoteType: QuoteType.email,
            widgetData: {
                text: '<用户邮箱>'
            }
        },
        icon: Email
    }
]

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
        .then(({ url }: { url? } = {}) => {
            if (!url) return
            // 创建图片组件数据
            const widget = createWidget({
                widgetType: WidgetType.image,
                widgetData: {
                    url
                }
            })

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

async function onCreateWidget(params, before) {
    const action = before || R.identity
    const value = await action(params)

    if (value) {
        dispatch('createWidget', value)
    }
}
</script>
