import { TextWidgetEvent } from '@/editor/enums'
import type Konva from 'konva'

/**
 * 创建编辑区域
 * @param node
 */
function createTextarea(node: Konva.Text) {
    const layer = node.getLayer()
    const stage = layer.getLayer()

    // 获取文本位置
    const areaPosition = {
        x: stage.offsetX() + node.absolutePosition().x,
        y: stage.offsetY() + node.absolutePosition().y
    }
    // 创建TextArea
    const textarea = document.createElement('textarea')
    const container = document.getElementById('convas-container')
    container.appendChild(textarea)

    textarea.value = node.text()
    textarea.style.position = 'absolute'
    textarea.style.top = areaPosition.y + 'px'
    textarea.style.left = areaPosition.x + 'px'
    textarea.style.width = `${node.width() - node.padding() * 2}px`
    textarea.style.height = `${node.height() - node.padding() * 2 + 5}px`
    textarea.style.fontSize = `${node.fontSize()}px`
    textarea.style.border = 'none'
    textarea.style.padding = '0px'
    textarea.style.margin = '0px'
    textarea.style.overflow = 'hidden'
    textarea.style.background = 'none'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    textarea.style.wordBreak = 'break-all'
    // textarea.style.lineHeight = `${node.lineHeight()}px`
    textarea.style.fontFamily = node.fontFamily()
    textarea.style.transformOrigin = 'left top'
    textarea.style.textAlign = node.align()
    textarea.style.color = node.fill()

    textarea.style.transform = `rotateZ(${node.rotation()}deg)`

    // reset height
    // textarea.style.height = 'auto'
    // after browsers resized it we can set actual value
    // textarea.style.height = textarea.scrollHeight + 3 + 'px'

    textarea.focus()

    /**
     * 移除Textarea
     */
    function removeTextarea() {
        textarea.parentNode.removeChild(textarea)
        node.show()
    }

    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            textarea.blur()
        }
    })

    textarea.addEventListener('blur', function (e) {
        node.text(textarea.value)
        node.fire(TextWidgetEvent.input)
        removeTextarea()
    })
}

/**
 * 安装编辑器
 */
export function setupEditable(node: Konva.Text) {
    // 添加编辑功能
    node.on('dblclick dbltap', () => {
        // 隐藏原节点
        node.hide()

        // 获取文本位置
        createTextarea(node)
    })
}
