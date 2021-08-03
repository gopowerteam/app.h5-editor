<template>
    <div class="widget-property">
        <Accordion size="sm">
            {#each panels as item, index}
                {#if item.filter()}
                    <AccordionItem title="{item.label}" open>
                        <svelte:component this="{item.component}" />
                    </AccordionItem>
                {/if}
            {/each}
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

const panels = [
    {
        label: '基础属性',
        component: NodeWidgetProerpty,
        filter: () => true
    },
    {
        label: '文本属性',
        component: TextWidgetProerpty,
        filter: () => getSelectType() === 'Text'
    },
    {
        label: '图片属性',
        component: ImageWidgetProerpty,
        filter: () => getSelectType() === 'Image'
    }
]

function getSelectType() {
    const [id] = $selected

    if (!id) return

    return $stage.findOne(`#${id}`).getClassName()
}
</script>
