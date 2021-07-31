import { store } from "@/store";
import type Konva from "konva";
import { getSelectedWidget } from "..";

export function setupDeleteListener(stage: Konva.Stage) {
    window.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace') {
            return
        }

        // 获取选择的组件
        const widgets = getSelectedWidget(stage)

        widgets.forEach(widget => {
            store.dispatch('deleteWidget', widget.id())
        })
    })
}