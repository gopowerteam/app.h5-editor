<template>
    <div
        id="convas-container"
        bind:this="{container}"
        class="content-container absolute inset-0">
    </div>
</template>

<style lang="less">
.content-container {
    background-color: #e5e5e5;
}
</style>

<script lang="ts">
import Konva from 'konva'

import { EventType, WidgetType } from '@/editor/enums'
import type { IEvent } from '@/editor/interface'
import { getContext, onMount } from 'svelte'
import { renderWidget } from '@/editor/render'
import { setupStageSelector } from '@/editor/render/setups/selector.setup'

const source = {
    event: getContext<IEvent>('event'),
    stage: getContext<IEvent>('stage')
}

let container: HTMLDivElement
let stage: Konva.Stage
let contentLayer: Konva.Layer
let backgroundLayer: Konva.Layer

const layerWidth = 360
const layerHeight = 640

/**
 * 重绘舞台尺寸
 */
function resizeLayer() {
    stage.width(container.offsetWidth)
    stage.height(container.offsetHeight)
    const width = layerWidth * contentLayer.scaleX()
    const height = layerHeight * contentLayer.scaleY()
    contentLayer.x(container.offsetWidth / 2 - width / 2)
    contentLayer.y(container.offsetHeight / 2 - height / 2)

    contentLayer.draw()
}

/**
 * 创建舞台背景
 */
function createBackground() {
    const background = new Konva.Rect({
        width: layerWidth,
        height: layerHeight,
        fill: '#fff',
        name: 'background'
    })

    contentLayer.add(background)
}

/**
 * 创建Canvas容器
 */
function createCanvas() {
    const sceneWidth = container.clientWidth
    const sceneHeight = container.clientHeight

    stage = new Konva.Stage({
        container: container,
        width: sceneWidth,
        height: sceneHeight
    })

    // 创建舞台布局
    contentLayer = new Konva.Layer({
        name: 'content',
        x: stage.width() / 2 - layerWidth / 2,
        y: stage.height() / 2 - layerHeight / 2,
        clip: {
            x: 0,
            y: 0,
            width: layerWidth,
            height: layerHeight
        }
    })

    backgroundLayer = new Konva.Layer({ name: 'background' })

    // 添加图层
    stage.add(contentLayer)
    stage.add(backgroundLayer)

    backgroundLayer.draw()
    contentLayer.draw()
}

function eventSetup() {
    // 处理缩放事件
    source.event.on(EventType.zoom, (scale) => {
        contentLayer.scaleX(scale)
        contentLayer.scaleY(scale)
        resizeLayer()
    })

    // 处理创建事件
    source.event.on(EventType.create, (type: WidgetType) => {
        const widget = renderWidget(backgroundLayer, type)
        contentLayer.add(widget)
    })
}

onMount(() => {
    // 创建舞台
    createCanvas()
    // 创建背景
    createBackground()
    // 安装选择器
    setupStageSelector(backgroundLayer, contentLayer)
    // 安装事件处理
    eventSetup()
    // 处理缩放重绘
    window.addEventListener('resize', resizeLayer)
})
</script>
