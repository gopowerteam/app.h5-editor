import type { StoreonModule } from 'storeon'
import type { Store } from '.'
export interface AppState {
    ready: boolean
    layout: string
}

export interface AppEvents {
    ready: undefined
    updateLayout: string
}

const state: AppState = {
    ready: false,
    layout: 'default'
}

const appModule: StoreonModule<AppState, AppEvents> = (store) => {
    store.on('@init', () => state)
    store.on('ready', () => ({ ready: true }))
    store.on('updateLayout', (state, value) => ({ ...state, layout: value }))
}

export const AppStore: Store<AppState, AppEvents> = {
    keys: Object.keys(state) as Array<keyof AppState>,
    module: appModule,
}
