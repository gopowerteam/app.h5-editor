import { appConfig } from '@/config/app.config'
import type { ImageWidget } from '@/editor/model/image-widget'
import Konva from 'konva'

export function renderImageWidget(widget: ImageWidget) {
    const image = new Image()

    const node = new Konva.Image({
        ...widget.property,
        image: image
    })

    image.onload = () => {
        node.width(image.width)
        node.height(image.height)
        node.draw()
    }

    image.src = widget.imageProperty.url

    return node
}
