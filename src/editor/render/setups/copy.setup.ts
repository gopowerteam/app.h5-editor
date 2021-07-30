import { cloneWidget } from '@/editor/data'
import { store } from '@/store'
import type Konva from 'konva'

// 当前选择对象
let currentNodeId: string = null

/**
 * 设置目标组件
 */
function setTargetWidget(stage) {
    // 查询选中组件
    const transformers: Konva.Transformer[] = stage.find('Transformer')
    const transformer = transformers.find((tr) => tr.resizeEnabled())

    if (!transformer) {
        return
    }

    // 获取目标节点
    const node = transformer.getNode()

    // 设置选择组件ID
    currentNodeId = node.id()
}

/**
 * 粘贴目标组件
 */
function parseTargetWidget(stage: Konva.Stage) {
    const { source } = store.get()

    if (!currentNodeId) return

    const target = source.find((x) => x.property.id === currentNodeId)
    if (target) {
        // 生成组件数据
        const data = cloneWidget(target)
        // 创建组件
        store.dispatch('createWidget', data)
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
