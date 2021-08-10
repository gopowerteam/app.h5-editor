import { createWidget } from '@/editor/data'
import type { WidgetParams } from '@/editor/data'
import { Widget } from '@/editor/model/widget'
import {
    addWidget,
    createBackground,
    removeWidget,
    renderWidget,
    renderWidgets
} from '@/editor/render'
import { getLayers, resizeStage } from '@/editor/render/stage'
import type Konva from 'konva'
import type { StoreonModule } from 'storeon'
import { Store, updateState } from '.'
import {
    backwardHistory,
    EditorHistory,
    forwardHistory,
    updateHistory
} from '@/editor/history'
import {
    clearSelector,
    createSelector
} from '@/editor/render/setups/selector.setup'
import type { TextWidget } from '@/editor/model/text-widget'
import type { ImageWidget } from '@/editor/model/image-widget'
import { appConfig } from '@/config/app.config'
import * as R from 'ramda'
import { getBase64FromUrl } from '@/shared/services/util.service'

type pageConfig = {
    background: string
    size: {
        width: number
        height: number
    }
    title: string
}

export interface EditorState {
    stage: Konva.Stage
    zoom: number
    page: pageConfig
    selected: string[]
    copied: Konva.Node[]
    widgets: Widget[]
    history: {
        backward: EditorHistory[]
        forward: EditorHistory[]
    }
    preview: boolean
}

const state: EditorState = {
    stage: undefined,
    page: {
        size: {
            width: appConfig.editor.content.width,
            height: appConfig.editor.content.height
        },
        title: '未命名',
        background: ''
    },
    selected: [],
    copied: [],
    zoom: 1,
    widgets: [],
    history: {
        backward: [],
        forward: []
    },
    preview: false
}

export interface EditorEvents {
    updateStage: Konva.Stage
    updateSize: { width: number; height: number }
    updatePage: pageConfig
    updateWidgets: Widget[]
    updateSelected: string[]
    updateCopied: Konva.Node[]
    updateWidget: Partial<TextWidget | ImageWidget>
    updateBackground: string
    updateTitle: string
    updateZindex: void
    updateZoom: number
    createWidget: Widget | WidgetParams
    deleteWidget: string | string[]
    backward: void
    forward: void
    renderStage: void
    updatePreview: boolean
}

/**
 * 数据模块
 * @param store
 */
const module: StoreonModule<EditorState, EditorEvents> = (store) => {
    store.on('@init', () => state)
    // 设置Stage
    store.on('updateStage', (state, stage) => ({
        ...state,
        stage
    }))
    store.on('updateSize', (state, size) => ({
        ...state,
        size
    }))
    store.on('updatePreview', (state, preview) => ({
        ...state,
        preview
    }))

    // 更新数据源
    store.on('updatePage', (state, page) => ({
        ...state,
        page
    }))
    // 更新数据源
    store.on('updateWidgets', (state, widgets) => ({
        ...state,
        widgets
    }))
    // 更新选择项
    store.on('updateSelected', (state, widgets) => {
        return {
            ...state,
            selected: widgets
        }
    })
    // 更新复制项
    store.on('updateCopied', (state, widgets) => ({
        ...state,
        copied: widgets
    }))
    // 更新数据源
    store.on(
        'updateWidget',
        updateState(onUpdateWidget, {
            before: [updateHistory]
        })
    )
    // 更新数据源
    store.on('updateZoom', updateState(onUpdateZoom))
    // 更新Zindex

    // 撤销操作
    store.on(
        'backward',
        updateState(backwardHistory, { after: [onRerenderStage] })
    )
    // 恢复操作
    store.on(
        'forward',
        updateState(forwardHistory, { after: [onRerenderStage] })
    )
    // 添加组件
    store.on(
        'createWidget',
        updateState(onCreateWidget, {
            before: [updateHistory]
        })
    )
    // 删除组件
    store.on(
        'deleteWidget',
        updateState(onDeleteWidget, {
            before: [updateHistory]
        })
    )
    store.on(
        'updateBackground',
        updateState(onUpdateBackground, {
            before: [updateHistory]
        })
    )
    store.on(
        'updateZindex',
        updateState(onUpdateZindex, {
            before: [updateHistory]
        })
    )

    store.on('renderStage', (state) => {
        onRerenderStage(state)
        return state
    })
}

export const editorStore: Store<EditorState, EditorEvents> = {
    keys: Object.keys(state) as Array<keyof EditorState>,
    module
}

/**
 * 更新Zoom
 * @param state
 * @param zoom
 */
function onUpdateZoom(state: EditorState, zoom: number) {
    const { scale } = appConfig.editor.content
    const { content: contentLayer } = getLayers()
    contentLayer.scaleX((1 / scale) * zoom)
    contentLayer.scaleY((1 / scale) * zoom)
    resizeStage(state.stage)

    return {
        zoom
    }
}

/**
 * 更新组件
 * @param state
 * @param widget
 */
function onUpdateWidget(state: EditorState, widget: Partial<Widget>) {
    // 获取目标组件
    const target = state.widgets.find((x) => x.id === widget.id)

    // 更新数据源
    if (target) {
        Object.entries(widget).forEach(([key, value]) => {
            if (key !== 'id') {
                target[key] = {
                    ...target[key],
                    ...widget[key]
                }
            }
        })
    }

    return {
        widgets: state.widgets
    }
}

/**
 * 创建组件
 * @param state
 * @param value
 * @returns
 */
function onCreateWidget(state: EditorState, value: Widget | WidgetParams) {
    const { stage, widgets } = state
    // 创建组件数据
    const data = value instanceof Widget ? value : createWidget(value)
    // 创建组件
    const widget = renderWidget(data)
    // 更新视图层
    addWidget(stage, widget)

    return {
        widgets: [...widgets, data],
        selected: [widget.id()]
    }
}

/**
 * 删除组件
 * @param state
 * @param id
 * @returns
 */
function onDeleteWidget(state: EditorState, id: string | string[]) {
    const { stage } = state
    // 更新视图层
    // TODO: 删除后历史记录异常
    const target = id instanceof Array ? id : [id]

    target.forEach((value) => {
        removeWidget(stage, value)
    })

    // 更新数据源
    return {
        selected: [],
        widgets: state.widgets.filter((x) => !target.includes[x.id])
    }
}

function onUpdateBackground(state: EditorState, background: string) {
    const { stage, page } = state

    const target = stage.findOne('.background') as Konva.Shape

    const image = new Image()
    image.onload = () => {
        target.fill('')
        target.fillPatternImage(image)
    }
    image.src = background

    return {
        page: {
            size: state.page.size,
            title: state.page.title,
            background
        }
    }
}

function onUpdateZindex(state: EditorState) {
    const { widgets, stage } = state
    const data = widgets.map(
        (
            widget // 更新视图层
        ) => {
            const target = stage.findOne(`#${widget.id}`)
            widget.property.zIndex = target.zIndex()

            return widget
        }
    )

    return { widgets: data }
}

function onRerenderStage(state: EditorState) {
    const { stage, widgets, selected, page, preview } = state

    const { content: contentLayer, background: backgroundLayer } = getLayers()

    // 销毁所有子元素
    contentLayer.destroyChildren()
    // 清除所有选择器
    clearSelector(stage)
    // 创建背景
    createBackground()

    // 重新生成组件
    renderWidgets(
        R.sortWith<Widget>([R.ascend(R.path(['property', 'zIndex']))])(widgets)
    ).forEach(
        (
            widget // 更新视图层
        ) => addWidget(stage, widget, false)
    )

    // 重新设置选择项
    if (!preview && selected.length) {
        createSelector(
            backgroundLayer,
            selected.map((id) => stage.findOne(`#${id}`)),
            selected.length === 1
        )
    }

    if (page && page.background) {
        const target = stage.findOne('.background') as Konva.Shape

        const image = new Image()

        image.onload = () => {
            target.fill('')
            target.fillPatternImage(image)
        }

        getBase64FromUrl(page.background).then((data: string) => {
            image.src = data
        })
    }
}
