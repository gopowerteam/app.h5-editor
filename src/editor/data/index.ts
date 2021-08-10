import { classToClass } from 'class-transformer'
import { QuoteType, WidgetType } from '../enums'
import type { QuoteData } from '../model/quote-data'
import type { Widget } from '../model/widget'
import { createImageWidget } from './image-widget.data'
import { createTextWidget } from './text-widget.data'

/**
 * 渲染规则
 */
const createRules = {
    [WidgetType.text]: createTextWidget,
    [WidgetType.image]: createImageWidget
}

export type WidgetParams = {
    widgetType: WidgetType
    widgetData?: any
    quoteType?: QuoteType
    quoteData?: QuoteData
}

export function createWidget({
    widgetType,
    quoteType,
    widgetData,
    quoteData
}: WidgetParams): Widget {
    // 生成创建器
    const creator = createRules[widgetType]

    if (!creator) {
        throw Error('不存在该组件类型')
    }

    const widget = creator(widgetData)

    if (quoteType) {
        widget.quoteType = quoteType
        widget.quoteData = quoteData
    }

    return widget
}

export function cloneWidget(widget: Widget) {
    const data = classToClass(widget)
    data.property.id = Math.random().toString(32).slice(2)
    return data
}
