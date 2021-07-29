<template>
    <div bind:this="{container}" class="content-container absolute inset-0">
    </div>
</template>

<style lang="less">
.content-container {
    background-color: #e5e5e5;
}
</style>

<script lang="ts">
import { EventType } from '@/editor/enums'

import type { IEvent } from '@/editor/interface'
import { Content } from 'carbon-components-svelte'

import Konva from 'konva'
import { getContext, onMount } from 'svelte'

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

const backgroundItems = ['background']

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

function createTextWidget() {
    const text = new Konva.Text({
        x: 0,
        y: 0,
        text: 'as大赛阿塞阀赛后',
        fontSize: 50,
        fill: 'green'
    })

    text.draggable(true)

    text.on('mouseenter', (e) => {
        const transformer = getSelector(text)

        if (!transformer) {
            createSelector(e.target)
        }
    })

    text.on('mouseout', (e) => {
        const transformer = getSelector(text)

        if (transformer && !transformer.resizeEnabled()) {
            transformer.destroy()
        }
    })

    contentLayer.add(text)
}

/**
 * 获取选择器
 * @param node
 */
function getSelector(node: Konva.Node) {
    const transformers = stage.find<Konva.Transformer>('Transformer')
    return transformers.find((tr) => tr.nodes().includes(node))
}

/**
 * 创建选择器
 * @param node
 * @param enabled
 */
function createSelector(node: Konva.Node, enabled: boolean = false) {
    const transformer = new Konva.Transformer({
        keepRatio: true,
        resizeEnabled: enabled,
        rotateEnabled: enabled,
        enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    })

    transformer.nodes([node])
    backgroundLayer.add(transformer)
    backgroundLayer.draw()
    return transformer
}

/**
 * 清理选择器
 */
function clearSelector() {
    const transformer = stage.find<Konva.Transformer>('Transformer')
    transformer.forEach((tr) => tr.destroy())
    backgroundLayer.draw()
}
/**
 * 创建选择器
 */
function setupSelector() {
    // 安装选择器
    stage.on('mousedown', (e) => {
        // 点击舞台删除所有选择器
        if (e.target === stage) {
            return clearSelector()
        }

        // 排除点击anchor
        if (e.target.name().includes('anchor')) {
            return
        }

        // 获取当前可操作点击对象
        const node = contentLayer.findOne((x) => {
            return x === e.target && !backgroundItems.includes(x.name())
        })

        // 非可选择对象则去除selector
        if (!node) {
            return clearSelector()
        }

        // 获取选择器
        const transformer = getSelector(node) || createSelector(node)

        // 开启resize&rotate
        transformer.resizeEnabled(true)
        transformer.rotateEnabled(true)
    })
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
    source.event.on(EventType.zoom, (scale) => {
        contentLayer.scaleX(scale)
        contentLayer.scaleY(scale)
        resizeLayer()
    })
}

onMount(() => {
    createCanvas()
    createBackground()
    setupSelector()

    createTextWidget()

    eventSetup()

    window.addEventListener('resize', resizeLayer)
})
</script>
