import { persistState } from '@storeon/localstorage'
import { provideStoreon, useStoreon } from '@storeon/svelte'
import { createStoreon, StoreonModule } from 'storeon'
import { setContext } from 'svelte'

import { appStore, AppEvents, AppState } from './app.store'
import { editorStore, EditorEvents, EditorState } from './editor.store'
import { userStore, UserState, UserEvents } from './user.store'

export type Store<S, E> = {
    keys: (keyof S)[]
    module: StoreonModule<S, E>
    persist?: string[] // 持久化支持
}

type Events = AppEvents & UserEvents & EditorEvents
type State = AppState & UserState & EditorState

export const stores = {
    user: userStore,
    app: appStore,
    editor: editorStore
}

const getModules = () => {
    return Object.values(stores).map((s) => s.module)
}

const getPersist = () => {
    return Object.values(stores)
        .filter((s) => s.persist)
        .map((s) => s.persist)
        .flat()
}

// 创建Store
export const store = createStoreon<State, Events>([
    ...getModules(),
    persistState(getPersist())
])

/**
 * 使用Store
 * @param store
 * @returns
 */
export function useStore<S, E>(select: (s: typeof stores) => Store<S, E>) {
    return useStoreon<S, E>(...select(stores).keys)
}

/**
 * 注入Store
 */
export function provideStore() {
    provideStoreon(store)
}


export function updateState(update: any) {
    return (state, value) => {
        return ({
            ...state,
            ...update(state, value)
        })
    }
}