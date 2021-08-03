<template>
    <div class="property-container" on:keydown="{(e) => e.stopPropagation()}">
        <Tabs>
            <Tab label="属性" />
            <Tab label="页面" />
            <Tab label="行为" />

            <div slot="content">
                <TabContent>
                    {#if $selected.length === 1}
                        <EditorWidgetProperty />
                    {/if}
                </TabContent>
                <TabContent><EditorPageProperty /></TabContent>
                <TabContent><EditorPageProperty /></TabContent>
            </div>
        </Tabs>
    </div>
</template>

<style lang="less">
:global(.property-container > .bx--tabs li) {
    width: 33%;
    border-top: 0;
    padding: 0;
    margin: 0;

    :global(a) {
        outline: none;
    }
}

:global(.property-container .bx--tab-content) {
    padding: 0;
}
</style>

<script lang="ts">
import { Tabs, Tab, TabContent } from 'carbon-components-svelte'
import EditorWidgetProperty from './editor-property/editor-widget-property.svelte'
import EditorPageProperty from './editor-property/editor-page-property.svelte'
import { useStore } from '@/store'

const { selected } = useStore((state) => state.editor)
</script>
