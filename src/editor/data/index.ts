import { WidgetType } from '../enums'
import { createTextWidget } from './text-widget.data'

/**
 * 渲染规则
 */
const createRules = {
    [WidgetType.text]: createTextWidget
}

export function createWidget(type: WidgetType) {
    // 生成创建器
    const creator = createRules[type]

    return creator()
}
