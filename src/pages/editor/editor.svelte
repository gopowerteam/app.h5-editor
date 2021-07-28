<template>
    <PageContainer title="编辑中心" layout="default">
        <svelte:fragment slot="action">
            <Button size="small">保存</Button>
        </svelte:fragment>
        <div class="editor-container absolute inset-0">
            <div class="editor-sidebar relative">
                <EditorSidebar />
            </div>
            <div class="editor-tool relative">
                <EditorTool />
            </div>
            <div class="editor-property relative">
                <EditorProperty />
            </div>
            <div class="editor-content relative">
                <EditorContent />
            </div>
        </div>
    </PageContainer>
</template>

<style lang="less">
.editor-container {
    display: grid;
    grid-template-areas:
        'sidebar tool property'
        'sidebar content property';

    grid-template-rows: 50px auto;
    grid-template-columns: 250px auto 300px;
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
</script>
