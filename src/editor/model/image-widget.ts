import { Type } from 'class-transformer'
import { WidgetType } from '../enums'
import { ImageProperty } from './image-property'
import { Widget } from './widget'

export class ImageWidget extends Widget {
    public widgetType = WidgetType.image

    @Type(() => ImageProperty)
    public imageProperty: ImageProperty
}
