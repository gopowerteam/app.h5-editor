<template>
    <Form labelWidth="{80}" layout="float">
        <FormItem label="文本内容">
            <TextArea
                bind:value="{property.text}"
                on:change="{onPropertyChange}" />
        </FormItem>
        <FormItem label="文本大小">
            <NumberInput
                bind:value="{property.fontSize}"
                on:change="{onPropertyChange}" />
        </FormItem>
        <FormItem label="文本颜色">
            <div class="flex">
                <TextInput
                    readonly
                    bind:value="{property.fill}"
                    on:change="{onPropertyChange}" />
                <div class="indicator-container" on:click="{onPickColor}">
                    <div
                        class="indicator"
                        style="background-color:{property.fill};">
                    </div>
                </div>
            </div>
        </FormItem>
        <FormItem label="文本对齐">
            <ContentSwitcher
                size="sm"
                selectedIndex="{textAlignMethods.findIndex(
                    (x) => x.value === property.align
                )}"
                on:change="{onChangeTextAlign}"
                bind:value="{property.align}">
                <Switch text="左对齐" value="left" />
                <Switch text="居中" value="center" />
                <Switch text="右对齐" value="right" />
            </ContentSwitcher>
        </FormItem>
    </Form>
</template>

<style lang="less">
.indicator-container {
    padding: 10px;
    .indicator {
        width: 15px;
        height: 15px;
        border-radius: 5px;
        border: solid 1px rgba(0, 0, 0, 0.3);
    }
}
</style>

<script lang="ts">
import {
    NumberInput,
    TextArea,
    TextInput,
    ContentSwitcher,
    Switch
} from 'carbon-components-svelte'
import Form from '@/shared/components/form.svelte'
import FormItem from '@/shared/components/form-item.svelte'
import { useStore } from '@/store'
import * as R from 'ramda'
import type { TextWidget } from '@/editor/model/text-widget'
import ColorPicker from '@/shared/components/color-picker.svelte'
import type { TextProperty } from '@/editor/model/text-property'
import { useModal } from '@gopowerteam/svelte-modal'
import { textAlignMethods } from '@/editor/enums'

const modal = useModal()
const { selected, widgets, dispatch, stage } = useStore((state) => state.editor)

// 当前选中组件
let currentWidget: TextWidget
// 文本组件数据
let property: TextProperty = {
    fontSize: 12,
    fontFamily: '',
    fontStyle: '',
    text: '',
    align: '',
    fill: ''
}

/**
 * 获取当前选中组件
 * @param widgets
 */
function getSelectedWidget(widgets) {
    const widget = widgets.find(
        (x) => $selected.length === 1 && x.id === $selected[0]
    )

    if (widget && $stage.findOne(`#${widget.id}`).getClassName() !== 'Text') {
        return
    }

    return widget
}

/**
 * 更新表单数据
 */
function updateWidgetProperty() {
    const target = R.pick(Object.keys(property), currentWidget.textProperty)
    if (JSON.stringify(property) !== JSON.stringify(target)) {
        property = target
    }
}

/**
 * 订阅组件更新
 */
widgets.subscribe((value) => {
    // 获取选中组件
    const widget = getSelectedWidget(value)
    // 存储选中组件
    currentWidget = widget

    if (!widget) return

    // 更新
    updateWidgetProperty()
})

/**
 * 表单属性更新
 */
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

/**
 * 渲染组件属性
 */
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

/**
 * 文本对齐方式更新
 * @param param0
 */
function onChangeTextAlign({ detail }) {
    property.align = textAlignMethods[detail].value
    onPropertyChange()
}

/**
 * 颜色选择
 */
function onPickColor() {
    modal.open({
        component: ColorPicker,
        header: false,
        title: '选择颜色',
        maskClosable: true,
        props: {
            startColor: property.fill
        },
        event: {
            colorChange: ({
                detail: { r, g, b, a }
            }: {
                detail: { r: number; g: number; b: number; a: number }
            }) => {
                const toHexValue = (n: number) =>
                    n.toString(16).padStart(2, '0')
                const rValue = toHexValue(r)
                const gValue = toHexValue(g)
                const bValue = toHexValue(b)
                const alpha = toHexValue(Math.round(a * 255))

                property.fill = `#${rValue}${gValue}${bValue}${alpha}`

                onPropertyChange()
            }
        }
    })
}
</script>
