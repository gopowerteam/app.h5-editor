import type { EditorState } from '@/store/editor.store'
import { HistoryType } from '../enums'
import {
    createWidgetHistory,
    revertWidgetHistory,
    updateWidgetHistory
} from './widget.history'

export type EditorHistory = {
    type: HistoryType
    data?:
        | Record<string, any>[]
        | {
              width: number
              height: number
          }
}

/**
 * 更新历史
 */
export function updateHistory(type: HistoryType, state: EditorState) {
    // 历史更新操作
    const action = {
        [HistoryType.widget]: updateWidgetHistory
    }

    return action[type](state)
}

/**
 * 回退历史
 **/
export function backwardHistory(state: EditorState) {
    // 获取可回退历史
    const history = state.history.backward.pop()

    if (!history) return

    // 恢复历史数据
    const revertHistory = {
        [HistoryType.widget]: revertWidgetHistory
    }

    // 创建历史数据
    const createHistory = {
        [HistoryType.widget]: createWidgetHistory
    }

    return {
        ...revertHistory[history.type](history),
        history: {
            backward: [...state.history.backward],
            forward: [
                ...state.history.forward,
                createHistory[history.type](state)
            ]
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

    // 恢复历史数据
    const revertHistory = {
        [HistoryType.widget]: revertWidgetHistory
    }

    // 创建历史数据
    const createHistory = {
        [HistoryType.widget]: createWidgetHistory
    }

    return {
        ...revertHistory[history.type](history),
        history: {
            backward: [
                ...state.history.backward,
                createHistory[history.type](state)
            ],
            forward: [...state.history.forward]
        }
    }
}
