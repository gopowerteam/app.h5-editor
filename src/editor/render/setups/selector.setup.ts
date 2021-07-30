import Konva from 'konva'
import { getLayers } from '..'

const backgroundNodes = ['background']

const anchorRules = {
    Text: ['top-center', 'bottom-center', 'middle-right', 'middle-left'],
    Image: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    default: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
}

/**
 * 获取选择器
 * @param node
 */
export function getSelector(stage: Konva.Stage, node: Konva.Node) {
    const transformers = stage.find<Konva.Transformer>('Transformer')
    return transformers.find((tr) => tr.nodes().includes(node))
}

function getAnchors(type) {
    return anchorRules[type] || anchorRules.default
}
/**
 * 创建选择器
 * @param node
 * @param enabled
 */
export function createSelector(
    backgroundLayer: Konva.Layer,
    node: Konva.Node,
    enabled: boolean = false
) {
    const transformer = new Konva.Transformer({
        keepRatio: true,
        resizeEnabled: enabled,
        rotateEnabled: enabled,
        enabledAnchors: getAnchors(node.getClassName())
    })

    transformer.nodes([node])

    backgroundLayer.add(transformer)
    backgroundLayer.draw()

    return transformer
}

/**
 * 清理选择器
 */
export function clearSelector(stage: Konva.Stage) {
    const transformer = stage.find<Konva.Transformer>('Transformer')
    transformer.forEach((tr) => tr.destroy())
    stage.draw()
}

/**
 * 安装选择器
 * @param layer
 * @param node
 */
export function setupNodeSelector(stage: Konva.Stage, node: Konva.Node) {
    const { background: backgroundLayer } = getLayers(stage)

    node.on('mouseenter', (e) => {
        if (!getSelector(stage, node)) {
            createSelector(backgroundLayer, node, false)
        }
    })

    node.on('mouseout', (e) => {
        const transformer = getSelector(stage, node)
        if (transformer && !transformer.resizeEnabled()) {
            transformer.destroy()
        }
    })

    node.on('mousedown', (e) => {
        // 获取选择器
        let transformer = getSelector(stage, node)

        if (!transformer || !transformer.resizeEnabled()) {
            clearSelector(stage)
            transformer = createSelector(backgroundLayer, node, true)
        }

        // 开启resize&rotate
        transformer.resizeEnabled(true)
        transformer.rotateEnabled(true)
    })
}

/**
 * 创建选择器
 */
export function setupStageSelector(stage: Konva.Stage) {
    const { content: contentLayer } = getLayers(stage)

    // 安装选择器
    stage.on('mousedown', (e) => {
        // 点击舞台删除所有选择器
        if (e.target === stage) {
            clearSelector(stage)
            return
        }

        // 获取当前可操作点击对象
        const node = contentLayer.findOne((x) =>
            backgroundNodes.includes(e.target.name())
        )

        // 非可选择对象则去除selector
        if (node) {
            clearSelector(stage)
            return
        }
    })
}
