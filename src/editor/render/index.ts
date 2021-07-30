import type Konva from 'konva'
import { createWidget } from '../data'
import { WidgetType } from '../enums'
import type { Widget } from '../model/widget'
import { setupNodeSelector } from './setups/selector.setup'
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
export function renderWidget(
    layer: Konva.Layer,
    type: WidgetType,
    widget?: Widget
) {
    // 获取渲染函数
    const render = renderRules[type]

    // 获取组件数据
    const data = widget || createWidget(type)

    // 获取渲染器
    const node = render(data)

    // 开启拖拽
    node.draggable(true)

    // 安装选择器
    setupNodeSelector(layer, node)

    return node
}
