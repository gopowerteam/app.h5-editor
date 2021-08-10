import type { QuoteType, WidgetType } from '@/editor/enums'
import { Type } from 'class-transformer'
import { QuoteData } from './quote-data'
import { WidgetProperty } from './widget-proerpty'

export class Widget {
    // 使用组件的id
    public get id() {
        return this.property.id
    }

    public widgetType: WidgetType

    public quoteType?: QuoteType

    @Type(() => QuoteData)
    public quoteData?: QuoteData

    @Type(() => WidgetProperty)
    public property: WidgetProperty
}
