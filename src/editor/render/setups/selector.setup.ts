import Konva from 'konva'
import { getLayers } from '../stage'

const backgroundNodes = ['background']

const anchorRules = {
    Text: ['top-center', 'bottom-center', 'middle-right', 'middle-left'],
    Image: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    default: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
}


export function getActiveSelector(stage: Konva.Stage) {
    const transformers = stage.find<Konva.Transformer>('Transformer')
    const transformer = transformers.find(x => x.name() === 'selected')
    return transformer
}
/**
 * 获取选择器
 * @param node
 */
export function getNodeSelector(stage: Konva.Stage, node: Konva.Node) {
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
    target: Konva.Node | Konva.Node[],
    enabled: boolean = false
) {
    const transformer = new Konva.Transformer({
        keepRatio: true,
        resizeEnabled: enabled,
        rotateEnabled: enabled,
    })

    if (target instanceof Konva.Node) {
        transformer.enabledAnchors(getAnchors(target.getClassName()))
    }

    const nodes = target instanceof Konva.Node ? [target] : target

    transformer.nodes(nodes)

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
    const { background: backgroundLayer } = getLayers()

    node.on('mouseenter', (e) => {
        if (!getNodeSelector(stage, node)) {
            createSelector(backgroundLayer, node, false)
        }
    })

    node.on('mouseout', (e) => {
        const transformer = getNodeSelector(stage, node)

        if (transformer && transformer.name() !== 'selected') {
            transformer.destroy()
        }
    })

    node.on('mousedown', (e) => {
        // 获取激活选择器
        const activeTransformer = getActiveSelector(stage)
        // 获取选择器
        const currentTransformer = getNodeSelector(stage, node)

        if (currentTransformer && currentTransformer === activeTransformer) {
            return
        }

        // 获取待激活节点
        const getNodes = () => {
            if (e.evt.ctrlKey && activeTransformer) {
                return [...activeTransformer.nodes(), node]
            } else {
                return node
            }
        }

        // 获取待选择节点
        const nodes = getNodes()
        // 清除选择器
        clearSelector(stage)
        // 创建选择器
        const transformer = createSelector(backgroundLayer, nodes, nodes instanceof Konva.Node)
        // 设置选择器名称
        transformer.name('selected')
        // 开启resize&rotate
        // transformer.resizeEnabled(true)
        // transformer.rotateEnabled(true)
    })
}

/**
 * 创建选择器
 */
export function setupStageSelector(stage: Konva.Stage) {
    const { content: contentLayer } = getLayers()

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
