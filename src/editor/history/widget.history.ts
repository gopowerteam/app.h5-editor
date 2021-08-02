import type { EditorState } from '@/store/editor.store'
import { classToPlain, plainToClass } from 'class-transformer'
import type { EditorHistory } from '.'
import { HistoryType } from '../enums'
import { Widget } from '../model/widget'

/**
 * 更新历史
 */
export function updateWidgetHistory(state: EditorState) {
    // 获取历史状态
    const widgets = classToPlain<Widget>(state.widgets)
    // 清空可前进历史
    state.history.forward = []
    // 更新可后退历史
    state.history.backward.push({
        type: HistoryType.widget,
        data: widgets
    })

    return {
        history: {
            forward: state.history.forward,
            backward: state.history.backward
        }
    }
}

/**
 * 回退历史
 **/
export function revertWidgetHistory(history: EditorHistory) {
    const widgets = plainToClass(Widget, history.data)

    return {
        widgets
    }
}

export function createWidgetHistory(state) {
    return {
        type: HistoryType.widget,
        data: classToPlain(state.widgets)
    }
}
