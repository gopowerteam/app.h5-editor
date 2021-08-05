import { classToClass } from 'class-transformer'
import { WidgetType } from '../enums'
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

export function createWidget(type: WidgetType, data?: any): Widget {
    // 生成创建器
    const creator = createRules[type]

    if (!creator) {
        throw Error('不存在该组件类型')
    }

    return creator(data)
}

export function cloneWidget(widget: Widget) {
    const data = classToClass(widget)
    data.property.id = Math.random().toString(32).slice(2)
    return data
}
