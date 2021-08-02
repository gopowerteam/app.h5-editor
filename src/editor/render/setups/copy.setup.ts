import { cloneWidget } from '@/editor/data'
import { store } from '@/store'
import type Konva from 'konva'
import { getActiveSelector } from './selector.setup'

/**
 * 设置目标组件
 */
function setTargetWidget(stage) {
    // 查询选中组件
    const transformer = getActiveSelector(stage)

    if (!transformer) {
        return
    }

    // 获取目标节点
    const nodes = transformer.getNodes().filter((node) => node.visible())

    // 设置选择组件ID
    store.dispatch('updateSelected', [...nodes])
}

/**
 * 粘贴目标组件
 */
function parseTargetWidget() {
    const { widgets, selected } = store.get()

    if (selected.length === 0) return

    const nodes = widgets.filter((x) =>
        selected.map((node) => node.id()).includes(x.id)
    )

    if (nodes.length) {
        // 生成组件数据
        const widgets = nodes.map((node) => cloneWidget(node))
        // 创建组件
        widgets.forEach((data) => store.dispatch('createWidget', data))
    }
}

/**
 * 安装复制功能
 * @param stage
 */
export function setupCopy(stage: Konva.Stage) {
    window.addEventListener('keydown', (e) => {
        if (!e.ctrlKey) {
            return
        }

        if (e.key === 'c') setTargetWidget(stage)

        if (e.key === 'v') parseTargetWidget(stage)
    })
}
