import { appConfig } from '@/config/app.config'
import Konva from 'konva'
import { WidgetType } from '../enums'
import type { Widget } from '../model/widget'
import { setupListener } from './setups/listener.setup'
import {
    clearSelector,
    createSelector,
    getActiveSelector,
    setupNodeSelector
} from './setups/selector.setup'
import { getLayers } from './stage'
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

export function renderWidgets(data: Widget[]) {
    return data.map((node) => renderWidget(node))
}

export function addWidget(
    stage: Konva.Stage,
    node: Konva.Shape,
    selectd = true
) {
    const { content: contentLayer, background: backgroundLayer } = getLayers()
    // 安装选择器
    setupNodeSelector(stage, node)
    // 清除选择器
    clearSelector(stage)
    // 创建选择器
    if (selectd) {
        createSelector(backgroundLayer, [node], true)
    }
    // 安装监听器
    setupListener(node)
    // 添加组件到图层
    contentLayer.add(node)
}

export function removeWidget(stage, id) {
    const { content: contentLayer } = getLayers()

    const [target] = contentLayer.getChildren((widget) => widget.id() === id)

    if (target) {
        // 销毁组件
        target.destroy()
        // 清除选择器
        clearSelector(stage)
    }
}

export function getSelectedWidget(stage: Konva.Stage) {
    // 获取激活的选择器
    const transformer = getActiveSelector(stage)

    if (!transformer) return

    const nodes = transformer.getNodes()

    return nodes.filter((node) => node.visible())
}

/**
 * 创建舞台背景
 */
export function createBackground() {
    const { content: contentLayer } = getLayers()
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
