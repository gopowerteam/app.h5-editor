import type { QuoteType, WidgetType } from '@/editor/enums'
import { Type } from 'class-transformer'
import { WidgetProperty } from './widget-proerpty'

export class Widget {
    public widgetType: WidgetType

    public quoteType?: QuoteType

    @Type(() => WidgetProperty)
    public property: WidgetProperty
}
