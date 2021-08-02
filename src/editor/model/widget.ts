import type { QuoteType, WidgetType } from '@/editor/enums'
import { Type } from 'class-transformer'
import { WidgetProperty } from './widget-proerpty'

export class Widget {
    // 使用组件的id
    public get id() {
        return this.property.id
    }

    public widgetType: WidgetType

    public quoteType?: QuoteType

    @Type(() => WidgetProperty)
    public property: WidgetProperty
}
