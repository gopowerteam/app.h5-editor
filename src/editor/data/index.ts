import { classToClass } from 'class-transformer'
import { WidgetType } from '../enums'
import type { Widget } from '../model/widget'
import { createTextWidget } from './text-widget.data'

/**
 * 渲染规则
 */
const createRules = {
    [WidgetType.text]: createTextWidget
}

export function createWidget(type: WidgetType): Widget {
    // 生成创建器
    const creator = createRules[type]

    return creator()
}

export function cloneWidget(widget: Widget) {
    const data = classToClass(widget)
    data.property.id = Math.random().toString(32).slice(2)
    return data
}