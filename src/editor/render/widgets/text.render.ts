import Konva from 'konva'
import type { TextWidget } from '../../model/text-widget'
import { setupEditable } from '../setups/editable.setup'
import * as R from 'ramda'
import { store } from '@/store'

const MINWIDTH = 100
const MINHEIGHT = 50

function setupTransform(node) {
    node.on('transform', (e) => {
        node.setAttrs({
            width: Math.max(node.width() * node.scaleX(), MINWIDTH),
            height: Math.max(node.height() * node.scaleY(), MINHEIGHT),
            scaleX: 1,
            scaleY: 1
        })
    })
}

export function renderTextWidget(widget: TextWidget) {
    const { preview } = store.get()

    const node = new Konva.Text({
        ...R.omit(['zIndex'], widget.property),
        ...widget.textProperty
    })

    // 设置编辑功能
    if (!preview && !widget.quoteType) {
        setupEditable(node)
    }

    // 设置缩放处理
    setupTransform(node)
    return node
}
