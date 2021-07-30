import Konva from 'konva'
import { WidgetType } from '../enums'
import type { Widget } from '../model/widget'
import {
    clearSelector,
    createSelector,
    setupNodeSelector
} from './setups/selector.setup'
import { renderTextWidget } from './widgets/text.render'

/**
 * 渲染规则
 */
const renderRules = {
    [WidgetType.text]: renderTextWidget
}

/**
 * 渲染组件
 * @param widget
 * @returns
 */
export function renderWidget(data: Widget) {
    // 获取渲染函数
    const render = renderRules[data.widgetType]
    // 获取渲染器
    const node = render(data)
    // 开启拖拽
    node.draggable(true)

    return node
}

export function addWidget(stage: Konva.Stage, node: Konva.Shape) {
    const { content: contentLayer, background: backgroundLayer } =
        getLayers(stage)
    // 安装选择器
    setupNodeSelector(stage, node)
    // 清除选择器
    clearSelector(stage)
    // 创建选择器
    createSelector(backgroundLayer, node, true)
    // 添加组件到图层
    contentLayer.add(node)
}

/**
 * 创建舞台
 * @param container
 * @param width
 * @param height
 */
export function createStage(container) {
    const width = container.clientWidth
    const height = container.clientHeight

    // 创建舞台实例
    const stage = new Konva.Stage({
        container: container,
        width: width,
        height: height
    })

    // 创建图层实例
    const { content, background } = createLayers(stage, width, height)

    // 添加图层
    stage.add(content)
    stage.add(background)
    // 重绘布局
    content.draw()
    background.draw()

    return stage
}

/**
 * 创建基础图层
 * @param stage
 * @param width
 * @param height
 */
function createLayers(stage: Konva.Stage, width: number, height: number) {
    // 创建内容布局
    const contentLayer = new Konva.Layer({
        name: 'content',
        x: stage.width() / 2 - width / 2,
        y: stage.height() / 2 - height / 2,
        clip: {
            x: 0,
            y: 0,
            width,
            height
        }
    })

    // 创建背景布局
    const backgroundLayer = new Konva.Layer({ name: 'background' })

    return {
        content: contentLayer,
        background: backgroundLayer
    }
}

/**
 * 获取基础图层
 */
export function getLayers(stage: Konva.Stage) {
    const layers = stage.getLayers()

    return {
        content: layers.find((layer) => layer.name() === 'content'),
        background: layers.find((layer) => layer.name() === 'background')
    }
}
