import type Konva from 'konva'

/**
 * 创建编辑区域
 * @param node
 */
function createTextarea(node: Konva.Text) {
    // 获取文本位置
    const areaPosition = {
        x: node.absolutePosition().x,
        y: node.absolutePosition().y
    }
    // 创建TextArea
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

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
    textarea.style.lineHeight = `${node.lineHeight()}px`
    textarea.style.fontFamily = node.fontFamily()
    textarea.style.transformOrigin = 'left top'
    textarea.style.textAlign = node.align()
    textarea.style.color = node.fill()

    textarea.style.transform = `rotateZ(${node.rotation()}deg)`

    // reset height
    textarea.style.height = 'auto'
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px'

    textarea.focus()

    function removeTextarea() {
        textarea.parentNode.removeChild(textarea)
        window.removeEventListener('click', handleOutsideClick)
        node.show()
    }

    function handleOutsideClick(e: MouseEvent) {
        if (e.target !== textarea) {
            node.text(textarea.value)
            removeTextarea()
        }
    }
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
