<template>
    <div class="widget-property">
        <Accordion size="sm">
            {#if widgetType}
                <AccordionItem title="基础属性" open>
                    <NodeWidgetProerpty />
                </AccordionItem>
            {/if}
            {#if widgetType === 'Text'}
                <AccordionItem title="文本属性" open>
                    <TextWidgetProerpty />
                </AccordionItem>
            {/if}
            {#if widgetType === 'Image'}
                <AccordionItem title="图片属性" open>
                    <ImageWidgetProerpty />
                </AccordionItem>
            {/if}
        </Accordion>
    </div>
</template>

<style lang="less">
:global(.widget-property) {
    :global(.bx--tab-content) {
        padding: 0;
    }

    :global(.bx--accordion__content) {
        padding: 0;
    }
}
</style>

<script lang="ts">
import { Accordion, AccordionItem } from 'carbon-components-svelte'
import { useStore } from '@/store'
import NodeWidgetProerpty from './node-widget-property.svelte'
import TextWidgetProerpty from './text-widget-property.svelte'
import ImageWidgetProerpty from './image-widget-property.svelte'

const { selected, stage } = useStore((state) => state.editor)
let widgetType = ''

selected.subscribe((selected) => {
    if (selected.length === 1) {
        const [target] = selected
        const type = $stage.findOne(`#${selected[0]}`).getClassName()
        widgetType = type
    } else {
        widgetType = ''
    }
})
</script>
