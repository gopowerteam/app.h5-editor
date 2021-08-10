import { appConfig } from '@/config/app.config'
import type { ImageWidget } from '@/editor/model/image-widget'
import { getBase64FromUrl } from '@/shared/services/util.service'
import Konva from 'konva'
import * as R from 'ramda'

function setupTransform(node: Konva.Image) {
    node.on('transform', (e) => {
        node.setAttrs({
            width: Math.max(node.width() * node.scaleX()),
            height: Math.max(node.height() * node.scaleY()),
            scaleX: 1,
            scaleY: 1
        })
    })
}

export function renderImageWidget(widget: ImageWidget) {
    const image = new Image()

    const node = new Konva.Image({
        ...R.omit(['zIndex'], widget.property),
        image: image
    })

    getBase64FromUrl(widget.imageProperty.url).then((data: string) => {
        image.src = data
    })

    setupTransform(node)

    return node
}
