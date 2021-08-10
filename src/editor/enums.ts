export enum WidgetType {
    image = 'IMAGE',
    text = 'TEXT'
}

export enum QuoteType {
    username = 'USERNAME'
}

export enum TextWidgetEvent {
    input = 'input'
}

export enum HistoryType {
    stage = 'stage',
    widget = 'widget'
}

export const textAlignMethods = [
    {
        label: '左对齐',
        value: 'left'
    },
    {
        label: '居中',
        value: 'center'
    },
    {
        label: '右对齐',
        value: 'right'
    }
]

export const fontStyleMethods = [
    {
        label: '正常',
        value: 'normal'
    },
    {
        label: '粗体',
        value: 'bold'
    },
    {
        label: '斜体',
        value: 'italic'
    },
    {
        label: '斜粗',
        value: 'italic bold'
    }
]
