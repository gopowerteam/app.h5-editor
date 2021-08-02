<template>
    <div
        id="convas-container"
        bind:this="{container}"
        class="content-container absolute inset-0">
    </div>
</template>

<style lang="less">
.content-container {
    background-color: #e5e5e5;
}
</style>

<script lang="ts">
import type Konva from 'konva'
import { onMount } from 'svelte'
import { setupStageSelector } from '@/editor/render/setups/selector.setup'
import { setupCopy } from '@/editor/render/setups/copy.setup'
import { useStore } from '@/store'
import * as R from 'ramda'
import { appConfig } from '@/config/app.config'
import { createStage, getLayers, resizeStage } from '@/editor/render/stage'
import { setupDeleteListener } from '@/editor/render/setups/delete.setup'
import { createBackground } from '@/editor/render'

let container: HTMLDivElement

function setupResize(stage: Konva.Stage) {
    window.addEventListener('resize', () => resizeStage(stage))
}

onMount(() => {
    // 创建舞台
    const stage = createStage(container)

    // 初始化舞台功能
    R.pipe(
        R.tap(createBackground),
        R.tap(setupStageSelector),
        R.tap(setupCopy),
        R.tap(setupResize),
        R.tap(resizeStage),
        R.tap(setupDeleteListener)
    )(stage)
})
</script>
