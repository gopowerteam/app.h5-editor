import { store } from "@/store";
import type Konva from "konva";
import { getSelectedWidget } from "..";

export function setupDeleteListener(stage: Konva.Stage) {
    window.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace') {
            return
        }

        const widget = getSelectedWidget(stage)

        if (widget) {
            store.dispatch('deleteWidget', widget.id())
        }

    })
}