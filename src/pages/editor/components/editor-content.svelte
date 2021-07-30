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
import {
    addWidget,
    createStage,
    getLayers,
    renderWidget
} from '@/editor/render'
import { setupStageSelector } from '@/editor/render/setups/selector.setup'
import { setupCopy } from '@/editor/render/setups/copy.setup'
import { useStore } from '@/store'
import { createWidget } from '@/editor/data'
import * as R from 'ramda'
import { appConfig } from '@/config/app.config'

const source = {
    event: getContext<IEvent>('event'),
    stage: getContext<IEvent>('stage')
}

let container: HTMLDivElement
let stage: Konva.Stage

const { dispatch } = useStore((state) => state.editor)
/**
 * 重绘舞台尺寸
 */
function resizeLayer(stage) {
    const { content: contentLayer } = getLayers(stage)
    const { width, height } = appConfig.editor.content
    // 更新舞台尺寸
    stage.width(container.offsetWidth)
    stage.height(container.offsetHeight)

    // 更新图层位置
    contentLayer.x(
        container.offsetWidth / 2 - (width * contentLayer.scaleX()) / 2
    )
    contentLayer.y(
        container.offsetHeight / 2 - (height * contentLayer.scaleY()) / 2
    )

    contentLayer.draw()
}

/**
 * 创建舞台背景
 */
function createBackground(stage: Konva.Stage) {
    const { content: contentLayer } = getLayers(stage)
    const { width, height } = appConfig.editor.content
    // 创建背景图形
    const background = new Konva.Rect({
        width,
        height,
        fill: '#fff',
        name: 'background'
    })
    // 添加背景到图层
    contentLayer.add(background)
}

/**
 * 安装事件处理
 */
function setupEvent(stage: Konva.Stage) {
    const { content: contentLayer } = getLayers(stage)
    // 处理缩放事件
    source.event.on(EventType.zoom, (scale) => {
        contentLayer.scaleX(scale)
        contentLayer.scaleY(scale)
        resizeLayer(stage)
    })

    // 处理创建事件
    source.event.on(EventType.create, (type: WidgetType) => {
        // 创建组件数据
        const data = createWidget(type)
        // 创建组件
        const widget = renderWidget(data)
        // 更新数据源
        dispatch('add', data)
        // 更新视图层
        addWidget(stage, widget)
    })
}

function setupResize(stage: Konva.Stage) {
    window.addEventListener('resize', () => resizeLayer(stage))
}

onMount(() => {
    // 创建舞台
    stage = createStage(container)

    // 初始化舞台功能
    R.pipe(
        R.tap(createBackground),
        R.tap(setupStageSelector),
        R.tap(setupEvent),
        R.tap(setupCopy),
        R.tap(setupResize),
        R.tap(resizeLayer)
    )(stage)
})
</script>
