<template>
    <div
        class="form-item flex layout-{layout}"
        class:flex-row="{layout === 'inline'}"
        class:flex-col="{layout === 'float'}">
        {#if layout === 'inline'}
            <div
                class="form-item_label flex items-center justify-center"
                style="width:{labelWidth}px;">
                {label}
            </div>
            <div class="form-item_split flex items-center justify-center">
                :
            </div>
            <div class="form-item_content flex-auto">
                <slot />
            </div>
        {/if}
        {#if layout === 'float'}
            <div class="form-item_label" style="width:{labelWidth}px;">
                {label}:
            </div>
            <div class="form-item_content">
                <slot />
            </div>
        {/if}
    </div>
</template>

<style lang="less">
.layout-inline {
    .form-item_label {
        border-bottom: solid 1px #8d8d8d;
    }

    .form-item_split {
        border-bottom: solid 1px #8d8d8d;
    }
}

.layout-float {
    .form-item_label {
        text-align: left;
        font-size: 12px;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        color: rgba(0, 0, 0, 0.7);
        position: relative;

        &::before {
            content: '';
            height: 12px;
            width: 3px;
            position: absolute;
            left: 4px;
            top: 10px;
            border-radius: 2px;
            background-color: @primary-color;
        }
    }

    .form-item_content {
        text-align: center;
    }
}

:global(.form-item) {
    :global(input) {
        background-color: transparent !important;
    }

    :global(.bx--number__rule-divider) {
        background-color: transparent !important;
    }

    :global(button::before) {
        background-color: transparent;
    }

    :global(textarea) {
        background-color: transparent;
    }
}
</style>

<script lang="ts">
import { getContext } from 'svelte'

export let label: string

const { labelWidth, layout } = getContext('config')
</script>
