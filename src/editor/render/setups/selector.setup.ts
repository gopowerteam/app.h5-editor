import Konva from 'konva'

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
export function getSelector(layer: Konva.Layer, node: Konva.Node) {
    const stage = layer.getStage()
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
    layer: Konva.Layer,
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

    layer.add(transformer)
    layer.draw()
    return transformer
}

/**
 * 清理选择器
 */
export function clearSelector(layer: Konva.Layer) {
    const stage = layer.getStage()
    const transformer = stage.find<Konva.Transformer>('Transformer')
    transformer.forEach((tr) => tr.destroy())
    layer.draw()
}

/**
 * 安装选择器
 * @param layer
 * @param node
 */
export function setupNodeSelector(layer, node) {
    node.on('mouseenter', (e) => {
        if (!getSelector(layer, node)) {
            createSelector(layer, node, false)
        }
    })

    node.on('mouseout', (e) => {
        const transformer = getSelector(layer, node)
        if (transformer && !transformer.resizeEnabled()) {
            transformer.destroy()
        }
    })

    node.on('mousedown', (e) => {
        // 获取选择器
        let transformer = getSelector(layer, node)

        if (!transformer || !transformer.resizeEnabled()) {
            clearSelector(layer)
            transformer = createSelector(layer, node, true)
        }

        // 开启resize&rotate
        transformer.resizeEnabled(true)
        transformer.rotateEnabled(true)
    })
}

/**
 * 创建选择器
 */
export function setupStageSelector(
    backgroundLayer: Konva.Layer,
    contentLayer: Konva.Layer
) {
    const stage = contentLayer.getStage()
    // 安装选择器
    stage.on('mousedown', (e) => {
        // 点击舞台删除所有选择器
        if (e.target === stage) {
            clearSelector(backgroundLayer)
            return
        }

        // 获取当前可操作点击对象
        const node = contentLayer.findOne((x) =>
            backgroundNodes.includes(e.target.name())
        )

        // 非可选择对象则去除selector
        if (node) {
            clearSelector(backgroundLayer)
            return
        }
    })
}
