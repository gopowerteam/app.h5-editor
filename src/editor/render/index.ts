import type Konva from 'konva'
import { WidgetType } from '../enums'
import type { Widget } from '../model/widget'
import {
    clearSelector,
    createSelector,
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

export function addWidget(stage: Konva.Stage, node: Konva.Shape) {
    const { content: contentLayer, background: backgroundLayer } =
        getLayers()
    // 安装选择器
    setupNodeSelector(stage, node)
    // 清除选择器
    clearSelector(stage)
    // 创建选择器
    createSelector(backgroundLayer, node, true)
    // 添加组件到图层
    contentLayer.add(node)
}

export function removeWidget(stage, id) {
    const { content: contentLayer } = getLayers()

    const [target] = contentLayer.getChildren(widget => widget.id() === id)

    if (target) {
        // 销毁组件
        target.destroy()
        // 清除选择器
        clearSelector(stage)
    }

}

export function getSelectedWidget(stage: Konva.Stage) {
    const transformers = stage.find<Konva.Transformer>('Transformer')
    const transformer = transformers.find(x => x.resizeEnabled)

    if (!transformer) return

    const node = transformer.getNode()

    if (node.visible()) {
        return node
    }
}