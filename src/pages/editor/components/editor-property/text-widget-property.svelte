<template>
    <Form labelWidth="{80}">
        <FormItem label="内容">
            <TextArea
                bind:value="{property.text}"
                on:change="{onPropertyChange}" />
        </FormItem>
    </Form>
</template>

<script lang="ts">
import { TextArea } from 'carbon-components-svelte'
import Form from '@/shared/components/form.svelte'
import FormItem from '@/shared/components/form-item.svelte'
import { useStore } from '@/store'
import * as R from 'ramda'
import type { TextWidget } from '@/editor/model/text-widget'

const { selected, widgets, dispatch, stage } = useStore((state) => state.editor)

function getSelectedWidget(widgets) {
    return widgets.find((x) => $selected.length === 1 && x.id === $selected[0])
}

let property = {
    text: ''
}

let currentWidget: TextWidget

/**
 * 更新表单数据
 */
function updateWidgetProperty() {
    const target = R.pick(Object.keys(property), currentWidget.textProperty)
    if (JSON.stringify(property) !== JSON.stringify(target)) {
        property = target
    }
}

widgets.subscribe((value) => {
    // 获取选中组件
    const widget = getSelectedWidget(value)
    // 存储选中组件
    currentWidget = widget

    if (!widget) return

    // 更新
    updateWidgetProperty()
})

function onPropertyChange() {
    const target = R.pick(Object.keys(property), currentWidget.property)
    if (JSON.stringify(property) === JSON.stringify(target)) {
        return
    }

    renderWidgetProperty()

    dispatch('updateWidget', {
        id: currentWidget.id,
        textProperty: {
            ...currentWidget.textProperty,
            ...property
        }
    })
}

function renderWidgetProperty() {
    const [id] = $selected

    if (!id) return

    const target = $stage.findOne(`#${id}`)

    Object.entries(property).forEach(([key, value]) => {
        if (target.getAttr(key) !== value) {
            target.setAttr(key, value)
        }
    })
}
</script>
