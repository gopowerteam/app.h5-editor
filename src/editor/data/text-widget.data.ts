import type { QuoteType } from '../enums'
import { TextProperty } from '../model/text-property'
import { TextWidget } from '../model/text-widget'
import { WidgetProperty } from '../model/widget-proerpty'

function createWidgetProperty() {
    const property = new WidgetProperty()

    property.id = Math.random().toString(32).slice(2)
    property.height = 60
    property.width = 200
    property.opacity = 1
    property.rotation = 0
    property.scaleX = 1
    property.scaleY = 1
    property.x = 0
    property.y = 0

    return property
}

function createTextProperty(text) {
    const property = new TextProperty()

    property.fill = '#000'
    property.fontFamily = 'Arial'
    property.align = 'left'
    property.fontSize = 32
    property.fontStyle = ''
    property.text = text

    return property
}

export function createTextWidget(text = '请输入文本') {
    const widget = new TextWidget()

    // widget.quoteType = quoteType

    widget.property = createWidgetProperty()

    widget.textProperty = createTextProperty(text)

    return widget
}
