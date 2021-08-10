<template>
    <PageContainer title="页面预览" layout="workspace">
        <svelte:fragment slot="action">
            <Button size="small" on:click="{onExportImage}">导出图片</Button>
            <Button kind="secondary" size="small" on:click="{onBack}"
                >返回</Button>
        </svelte:fragment>
        <div
            id="canvas-container"
            bind:this="{container}"
            class="content-container absolute inset-0">
        </div>
    </PageContainer>
</template>

<style lang="less">
.content-container {
    background-color: #e5e5e5;
}
</style>

<script lang="ts">
import PageContainer from '@/shared/components/page-container.svelte'
import { Button } from 'carbon-components-svelte'

import { onMount } from 'svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'
import { useStore } from '@/store'
import { plainToClass } from 'class-transformer'
import { Widget } from '@/editor/model/widget'
import { createStage, getLayers, resizeStage } from '@/editor/render/stage'
import * as R from 'ramda'
import { createBackground } from '@/editor/render'
import { appConfig } from '@/config/app.config'
import type Konva from 'konva'

export let router
let container: HTMLDivElement

const { stage, page, dispatch, zoom } = useStore((state) => state.editor)

function onLoad(id) {
    const app = Cloudbase.get()
    const db = app.database()

    db.collection('pages')
        .doc(id)
        .get()
        .then(({ data }) => {
            const [target] = data

            if (target) {
                dispatch('updatePage', target.page)
                dispatch(
                    'updateWidgets',
                    plainToClass(Widget, target.widgets as any[])
                )

                setTimeout(() => {
                    dispatch('renderStage')
                }, 500)
            }
        })
}

function setupResize(stage: Konva.Stage) {
    window.addEventListener('resize', () => resizeStage(stage))
}

function setupStage() {
    dispatch('updatePreview', true)
    dispatch('updateZoom', 1)
    dispatch('updateSelected', [])
}

function onCreateStage() {
    // 创建舞台
    const stage = createStage(container)

    // 初始化舞台功能
    R.pipe(
        R.tap(createBackground),
        R.tap(setupResize),
        R.tap(resizeStage),
        R.tap(setupStage)
    )(stage)
}

function onExportImage() {
    const download = (uri, name) => {
        const link = document.createElement('a')
        link.download = name
        link.href = uri
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const { content: contentLayer } = getLayers()
    const width =
        (contentLayer.clip().width / appConfig.editor.content.scale) * $zoom
    const height =
        (contentLayer.clip().height / appConfig.editor.content.scale) * $zoom

    const dataURL = $stage.toDataURL({
        width,
        height,
        x: contentLayer.x(),
        y: contentLayer.y(),
        pixelRatio: appConfig.editor.content.scale,
        quality: 1
    })

    download(dataURL, `${Date.now()}.png`)
}

function onBack() {
    router.push('/page-center')
}

onMount(() => {
    const { id } = router.currentRoute.query

    onCreateStage()

    if (id) {
        onLoad(id)
    }
})
</script>
