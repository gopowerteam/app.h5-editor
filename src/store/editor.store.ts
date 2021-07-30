import type { Widget } from '@/editor/model/widget'
import { classToClass } from 'class-transformer'
import type { StoreonModule } from 'storeon'
import type { Store } from '.'

export interface EditorState {
    source: Widget[]
}

export interface EditorEvents {
    updateSource: Widget[]
    add: Widget
    remove: string
}

const state: EditorState = {
    source: []
}

const module: StoreonModule<EditorState, EditorEvents> = (store) => {
    store.on('@init', () => state)
    store.on('updateSource', (state, source) => ({
        ...state,
        source
    }))
    // 添加组件
    store.on('add', (state, widget) => ({
        ...state,
        source: [...state.source, widget]
    }))
    // 删除组件
    store.on('remove', (state, id) => {
        return {
            ...state,
            source: state.source.filter((x) => x.property.id !== id)
        }
    })
}

export const EditorStore: Store<EditorState, EditorEvents> = {
    keys: Object.keys(state) as Array<keyof EditorState>,
    module
}
