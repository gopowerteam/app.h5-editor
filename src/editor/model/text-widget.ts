import { Type } from 'class-transformer'
import { WidgetType } from '../enums'
import { TextProperty } from './text-property'
import { Widget } from './widget'

export class TextWidget extends Widget {
    public widgetType = WidgetType.text

    @Type(() => TextProperty)
    textProperty: TextProperty
}
