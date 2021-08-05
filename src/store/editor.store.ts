import { createWidget } from '@/editor/data'
import type { WidgetType } from '@/editor/enums'
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

export interface EditorState {
    stage: Konva.Stage
    zoom: number
    size: {
        width: number
        height: number
    }
    selected: string[]
    copied: Konva.Node[]
    widgets: Widget[]
    history: {
        backward: EditorHistory[]
        forward: EditorHistory[]
    }
}

const state: EditorState = {
    stage: undefined,
    size: undefined,
    selected: [],
    copied: [],
    zoom: 1,
    widgets: [],
    history: {
        backward: [],
        forward: []
    }
}

export interface EditorEvents {
    updateStage: Konva.Stage
    updateSize: { width: number; height: number }
    updateWidgets: Widget[]
    updateSelected: string[]
    updateCopied: Konva.Node[]
    updateWidget: Partial<TextWidget | ImageWidget>
    updateZoom: number
    createWidget: Widget | WidgetType
    deleteWidget: string
    backward: void
    forward: void
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
    // 更新数据源
    store.on('updateWidgets', (state, widget) => ({
        ...state,
        widget
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
function onCreateWidget(state: EditorState, value: Widget | WidgetType) {
    const { stage, widgets } = state
    // 创建组件数据a
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
function onDeleteWidget(state: EditorState, id: string) {
    const { stage } = state
    // 更新视图层
    removeWidget(stage, id)
    // 更新数据源
    return {
        widgets: state.widgets.filter((x) => x.property.id !== id)
    }
}

function onRerenderStage(state: EditorState) {
    const { stage, widgets, selected } = state

    const { content: contentLayer, background: backgroundLayer } = getLayers()

    // 销毁所有子元素
    contentLayer.destroyChildren()
    // 清除所有选择器
    clearSelector(stage)
    // 创建背景
    createBackground()

    // 重新生成组件
    renderWidgets(widgets).forEach(
        (
            widget // 更新视图层
        ) => addWidget(stage, widget, false)
    )

    // 重新设置选择项
    if (selected.length) {
        createSelector(
            backgroundLayer,
            selected.map((id) => stage.findOne(`#${id}`)),
            selected.length === 1
        )
    }
}
