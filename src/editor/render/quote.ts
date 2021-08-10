import { Cloudbase } from '@/shared/services/cloudbase.service'
import { generate } from 'rxjs'
import { QuoteType } from '../enums'
import type { ImageProperty } from '../model/image-property'
import type { ImageWidget } from '../model/image-widget'
import type { TextWidget } from '../model/text-widget'
import type { Widget } from '../model/widget'

const generateRules = {
    [QuoteType.username]: generateUsername,
    [QuoteType.email]: generateEmail
}

function generateUsername(widget: TextWidget) {
    widget.textProperty.text = '紫菜苔'
}

function generateEmail(widget: TextWidget) {
    const user = Cloudbase.getUser()
    widget.textProperty.text = user.email
}

export function generateQuote(widget: Widget) {
    // 获取渲染函数
    const generate = generateRules[widget.quoteType]

    if (!generate) {
        throw Error('引用类型不存在')
    }

    if (!generate) {
        return
    }

    generate(widget as any)
}
