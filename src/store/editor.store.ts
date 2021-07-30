import { createWidget } from '@/editor/data'
import { WidgetType } from '@/editor/enums'
import { Widget } from '@/editor/model/widget'
import { addWidget, removeWidget, renderWidget } from '@/editor/render'
import { getLayers, resizeStage } from '@/editor/render/stage'
import type Konva from 'konva'
import type { StoreonModule } from 'storeon'
import { Store, updateState } from '.'
export interface EditorState {
    stage: Konva.Stage,
    zoom: number,
    source: Widget[]
}

const state: EditorState = {
    stage: undefined,
    zoom: 1,
    source: []
}

export interface EditorEvents {
    updateStage: Konva.Stage
    updateSource: Widget[]
    updateZoom: number,
    createWidget: Widget | WidgetType
    deleteWidget: string
}



const module: StoreonModule<EditorState, EditorEvents> = (store) => {
    store.on('@init', () => state)
    // 设置Stage
    store.on('updateStage', (state, stage) => ({
        ...state,
        stage
    }))
    // 更新数据源
    store.on('updateSource', (state, source) => ({
        ...state,
        source
    }))
    // 更新数据源
    store.on('updateZoom', updateState(onUpdateZoom))
    // 添加组件
    store.on('createWidget', updateState(onCreateWidget))
    // 删除组件
    store.on('deleteWidget', updateState(onDeleteWidget))
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
    const { content: contentLayer } = getLayers()
    contentLayer.scaleX(zoom)
    contentLayer.scaleY(zoom)
    resizeStage(state.stage)

    return {
        zoom
    }

}

function onCreateWidget(state: EditorState, value: Widget | WidgetType) {
    const { stage, source } = state
    // 创建组件数据
    const data = value instanceof Widget ? value : createWidget(WidgetType.text)
    // 创建组件
    const widget = renderWidget(data)
    // 更新视图层
    addWidget(stage, widget)

    return {
        source: [...source, data]
    }
}

function onDeleteWidget(state: EditorState, id: string) {
    const { stage } = state
    // 更新视图层
    removeWidget(stage, id)
    // 更新数据源
    return {
        source: state.source.filter((x) => x.property.id !== id)
    }
}