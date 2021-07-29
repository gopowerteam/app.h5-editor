import type { QuoteType, WidgetType } from '../enums'

export class Selectable {
    public selected: boolean
}

export class Widget {
    public width: number
    public height: number
    public x: number
    public y: number
    public widgetType: WidgetType
    public quoteType?: QuoteType
}
