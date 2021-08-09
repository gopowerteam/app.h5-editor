<template>
    <PageContainer title="编辑中心" layout="default">
        <svelte:fragment slot="action">
            <Button kind="secondary" size="small" on:click="{onBack}"
                >返回</Button>
            <Button size="small" on:click="{onSave}">保存</Button>
        </svelte:fragment>
        <div class="editor-container absolute inset-0">
            <div class="editor-sidebar relative">
                <EditorSidebar />
            </div>

            <div class="editor-content relative">
                <EditorContent />
            </div>
            <div class="editor-tool relative">
                <EditorTool />
            </div>
            <div class="editor-property relative">
                <EditorProperty />
            </div>
        </div>
    </PageContainer>
</template>

<style lang="less">
.editor-container {
    display: grid;
    grid-template-areas: 'sidebar content tool property';
    grid-template-columns: 220px auto 40px 300px;
}

.editor-sidebar {
    grid-area: sidebar;
}
.editor-tool {
    grid-area: tool;
}
.editor-property {
    grid-area: property;
}
.editor-content {
    grid-area: content;
}
</style>

<script lang="ts">
import PageContainer from '@/shared/components/page-container.svelte'
import { Button } from 'carbon-components-svelte'
import EditorSidebar from './components/editor-sidebar.svelte'
import EditorContent from './components/editor-content.svelte'
import EditorTool from './components/editor-tool.svelte'
import EditorProperty from './components/editor-property.svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'
import { useStore } from '@/store'
import { onMount } from 'svelte'
import { openToast } from '@/shared/components/notification-center.svelte'
import { plainToClass } from 'class-transformer'
import { Widget } from '@/editor/model/widget'
export let router

const { page, widgets, dispatch } = useStore((state) => state.editor)

function onSave() {
    const app = Cloudbase.get()
    const db = app.database()
    const { id } = router.currentRoute.query

    const createPage = () =>
        db.collection('pages').add({
            page: $page,
            widgets: $widgets
        })

    const updatePage = () =>
        db.collection('pages').doc(id).update({
            page: $page,
            widgets: $widgets
        })

    const savePage = id ? updatePage : createPage

    savePage()
        .then(() => {
            openToast({
                type: 'success',
                message: '保存成功'
            })

            router.push('/page-center')
        })
        .catch(() => {
            openToast({
                type: 'error',
                message: '保存失败'
            })
        })
}

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

function onBack() {
    router.back()
}

onMount(() => {
    const { id } = router.currentRoute.query

    if (id) {
        onLoad(id)
    }
})
</script>
