import type { EventType } from './enums'

export interface IStage {
    zoom: number
}

export interface IEvent {
    on: (event: EventType, callback: (...args: any[]) => void) => void
    emit: (event: EventType, data?: any) => void
}
