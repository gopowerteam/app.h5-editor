import type Konva from 'konva'
import { store } from '@/store'
import { Widget } from '@/editor/model/widget'
import { TextWidgetEvent } from '@/editor/enums'
import { updateHistory } from '@/editor/history'
import type { TextProperty } from '@/editor/model/text-property'
import type { TextWidget } from '@/editor/model/text-widget'

const rules = {
    Text: textWidgetListener,
    Image: imageWidgetListener
}

function updateWidget(node, property) {
    const { widgets } = store.get()

    const widget = widgets.find((x) => x.id === node.id())

    if (!widget) return

    // 更新组件属性
    store.dispatch('updateWidget', {
        id: widget.id,
        property: {
            ...widget.property,
            ...property
        }
    })
}

function updateTextWidget(node, property: Partial<TextProperty>) {
    const { widgets } = store.get()

    const widget = widgets.find((x) => x.id === node.id()) as TextWidget

    if (!widget) return

    // 更新组件属性
    store.dispatch('updateWidget', {
        id: widget.id,
        textProperty: {
            ...widget.textProperty,
            ...property
        }
    })
}

function textWidgetListener(node: Konva.Text) {
    // 监听文本改变
    node.on(TextWidgetEvent.input, () => {
        updateTextWidget(node, {
            text: node.text()
        })
    })
}

function imageWidgetListener() {}

export function setupListener(node: Konva.Node) {
    // 监听尺寸变化
    node.on('transformend', () => {
        updateWidget(node, {
            width: node.width(),
            height: node.height(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY()
        })
    })

    // 监听位置变化
    node.on('dragend', () => {
        updateWidget(node, {
            x: node.x(),
            y: node.y()
        })
    })

    // 获取专用监听器
    const listener = rules[node.getClassName()]

    if (listener) {
        listener(node)
    }
}
