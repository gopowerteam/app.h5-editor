<template>
    <Form>
        {#if property}
            <FormItem label="X"
                ><NumberInput
                    bind:value="{property.x}"
                    on:change="{onPropertyChange}" /></FormItem>
            <FormItem label="Y"
                ><NumberInput
                    bind:value="{property.y}"
                    on:change="{onPropertyChange}" /></FormItem>
            <FormItem label="宽度"
                ><NumberInput
                    min="{0}"
                    bind:value="{property.width}"
                    on:change="{onPropertyChange}" /></FormItem>
            <FormItem label="高度"
                ><NumberInput
                    min="{0}"
                    bind:value="{property.height}"
                    on:change="{onPropertyChange}" /></FormItem>
            <FormItem label="角度"
                ><NumberInput
                    bind:value="{property.rotation}"
                    on:change="{onPropertyChange}" /></FormItem>
        {/if}
    </Form>
</template>

<script lang="ts">
import { NumberInput, TextInput } from 'carbon-components-svelte'
import FormItem from '@/shared/components/form-item.svelte'
import Form from '@/shared/components/form.svelte'
import { useStore } from '@/store'
import * as R from 'ramda'
import type { Widget } from '@/editor/model/widget'

const { selected, widgets, dispatch, stage } = useStore((state) => state.editor)

function getSelectedWidget(widgets) {
    return widgets.find((x) => $selected.length === 1 && x.id === $selected[0])
}

let property = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    rotation: 0
}

let currentWidget: Widget

/**
 * 更新表单数据
 */
function updateWidgetProperty() {
    const target = R.pick(Object.keys(property), currentWidget.property)
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
    // 获取更改值
    const target = R.pick(Object.keys(property), currentWidget.property)
    // 确认是否手动更改
    if (JSON.stringify(property) === JSON.stringify(target)) {
        return
    }
    // 渲染更改值
    renderWidgetProperty()
    // 通知更改数据

    dispatch('updateWidget', {
        id: currentWidget.id,
        property: {
            ...currentWidget.property,
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
