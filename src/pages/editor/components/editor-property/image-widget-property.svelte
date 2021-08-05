<template>
    <Form labelWidth="{80}" layout="float">
        <FormItem label="图片">
            <UploadContainer on:upload="{onChangeImage}">
                <img class="w-full" alt="" src="{property.url}" />
            </UploadContainer>
        </FormItem>
    </Form>
</template>

<script lang="ts">
import Form from '@/shared/components/form.svelte'
import FormItem from '@/shared/components/form-item.svelte'
import { useStore } from '@/store'
import * as R from 'ramda'
import type { ImageWidget } from '@/editor/model/image-widget'
import type { ImageProperty } from '@/editor/model/image-property'
import { useModal } from '@gopowerteam/svelte-modal'
import type Konva from 'konva'
import UploadContainer from '@/shared/components/upload-container.svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'

const modal = useModal()

const { selected, widgets, dispatch, stage } = useStore((state) => state.editor)

// 当前选中组件
let currentWidget: ImageWidget
// 文本组件数据
let property: ImageProperty = {
    url: ''
}

/**
 * 获取当前选中组件
 * @param widgets
 */
function getSelectedWidget(widgets) {
    return widgets.find((x) => $selected.length === 1 && x.id === $selected[0])
}

/**
 * 更新表单数据
 */
function updateWidgetProperty() {
    const target = R.pick(Object.keys(property), currentWidget.imageProperty)
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
        imageProperty: {
            ...currentWidget.imageProperty,
            ...property
        }
    })
}

function updateWidgetImage(widget: Konva.Image, url) {
    const image = new Image()

    image.onload = () => {
        widget.image(image)

        widget.width(image.width)
        widget.height(image.height)
        
        dispatch('updateWidget', {
            id: currentWidget.id,
            property: {
                ...currentWidget.property,
                width: image.width,
                height: image.height
            }
        })
    }

    image.src = url
}

/**
 * 渲染组件属性
 */
function renderWidgetProperty() {
    const renderRules = {
        url: updateWidgetImage
    }

    const [id] = $selected

    if (!id) return

    const target = $stage.findOne(`#${id}`) as Konva.Image

    Object.entries(property).forEach(([key, value]) => {
        const render = renderRules[key]

        if (render) {
            render(target, value)
            return
        }

        if (target.getAttr(key) !== value) {
            target.setAttr(key, value)
        }
    })
}

/**
 * 文本对齐方式更新
 * @param param0
 */
function onChangeImage({ detail: file }) {
    const app = Cloudbase.get()

    app.uploadFile({
        // 云存储的路径
        cloudPath: `images/${file.name}`,
        // 需要上传的文件，File 类型
        filePath: file
    }).then(({ download_url: url }: any) => {
        property.url = url
        onPropertyChange()
    })
}
</script>
