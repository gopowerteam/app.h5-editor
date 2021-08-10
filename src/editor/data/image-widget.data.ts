import type { QuoteType } from '../enums'
import { ImageProperty } from '../model/image-property'
import { ImageWidget } from '../model/image-widget'
import { TextProperty } from '../model/text-property'
import { TextWidget } from '../model/text-widget'
import { WidgetProperty } from '../model/widget-proerpty'

function createWidgetProperty() {
    const property = new WidgetProperty()

    property.id = Math.random().toString(32).slice(2)
    property.height = 100
    property.width = 100
    property.opacity = 1
    property.rotation = 0
    property.scaleX = 1
    property.scaleY = 1
    property.x = 0
    property.y = 0

    return property
}

function createImageProperty(url) {
    const property = new ImageProperty()

    property.url = url

    return property
}

export function createImageWidget({ url }: { url: string }) {
    const widget = new ImageWidget()

    widget.property = createWidgetProperty()

    widget.imageProperty = createImageProperty(url)

    return widget
}
