import { appConfig } from '@/config/app.config'
import { store } from '@/store'
import Konva from 'konva'

/**
 * 重绘舞台尺寸
 */
export function resizeStage(stage: Konva.Stage) {
    const container = stage.container()
    const { content: contentLayer } = getLayers()
    const { width, height } = appConfig.editor.content

    // 更新舞台尺寸
    stage.width(container.offsetWidth)
    stage.height(container.offsetHeight)

    // 更新图层位置
    contentLayer.x(
        container.offsetWidth / 2 - (width * contentLayer.scaleX()) / 2
    )
    contentLayer.y(
        container.offsetHeight / 2 - (height * contentLayer.scaleY()) / 2
    )

    contentLayer.draw()
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
    const { content, background } = createLayers(stage)

    // 添加图层
    stage.add(content)
    stage.add(background)
    // 重绘布局
    content.draw()
    background.draw()

    // 存储Stage
    store.dispatch('updateStage', stage)

    return stage
}

/**
 * 创建基础图层
 * @param stage
 * @param width
 * @param height
 */
function createLayers(stage: Konva.Stage) {
    // 获取图层尺寸
    const { width, height, scale } = appConfig.editor.content
    // 创建内容布局
    const contentLayer = new Konva.Layer({
        name: 'content',
        x: stage.width() / 2 - width / 2,
        y: stage.height() / 2 - height / 2,
        scaleX: 1 / scale,
        scaleY: 1 / scale,
        clip: {
            x: 0,
            y: 0,
            width: width,
            height: height
        }
    })

    store.dispatch('updateSize', {
        width,
        height
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
export function getLayers() {
    const { stage } = store.get()

    if (!stage) {
        throw '请初始化Stage'
    }

    const layers = stage.getLayers()

    return {
        content: layers.find((layer) => layer.name() === 'content'),
        background: layers.find((layer) => layer.name() === 'background')
    }
}
