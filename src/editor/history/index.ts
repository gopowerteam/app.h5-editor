import type { EditorState } from '@/store/editor.store'
import { classToPlain, plainToClass } from 'class-transformer'
import { Widget } from '../model/widget'

export type EditorHistory = {
    widgets: Record<string, any>[]
    selected: string[]
    page: {
        title: string
        size: {
            width: number
            height: number
        }
        background: string
    }
}

function createHistory(state: EditorState) {
    // 记录组件状态
    const widgets = classToPlain<Widget>(state.widgets)

    const size = {
        width: state.stage.width(),
        height: state.stage.height()
    }

    // 记录选择项状态
    const selected = [...state.selected]

    // 记录舞台状态
    const page = {
        size: {
            width: state.stage.width(),
            height: state.stage.height()
        },
        background: state.page.background,
        title: state.page.title
    }

    return {
        widgets,
        selected,
        page
    }
}

function revertHistory(history: EditorHistory) {
    // 恢复组件记录
    const widgets = plainToClass(Widget, history.widgets)

    // 恢复舞台记录
    const page = { ...history.page }

    // 恢复选择项记录
    const selected = history.selected

    return {
        widgets,
        page,
        selected
    }
}
/**
 * 更新历史
 */
export function updateHistory(state: EditorState) {
    // 清空可前进历史
    state.history.forward = []

    // 更新可后退历史
    state.history.backward.push(createHistory(state))

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
export function backwardHistory(state: EditorState) {
    // 获取可回退历史
    const history = state.history.backward.pop()

    if (!history) return

    return {
        ...revertHistory(history),
        history: {
            backward: [...state.history.backward],
            forward: [...state.history.forward, createHistory(state)]
        }
    }
}

/**
 * 前进历史
 */
export function forwardHistory(state: EditorState) {
    // 获取可回退历史
    const history = state.history.forward.pop()

    if (!history) return

    return {
        ...revertHistory(history),
        history: {
            backward: [...state.history.backward, createHistory(state)],
            forward: [...state.history.forward]
        }
    }
}
