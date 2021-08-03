<template>
    <div
        class="tool-container absolute inset-0 flex flex-col items-center"
        on:keydown="{(e) => e.stopPropagation()}">
        <div class="history mb-10">
            <div
                class:disabled="{$history.backward.length === 0}"
                class="icon-button"
                on:click="{() => dispatch('backward')}">
                <svelte:component this="{BackwardRotate}" />
            </div>
            <div
                class:disabled="{$history.forward.length === 0}"
                class="icon-button"
                on:click="{() => dispatch('forward')}">
                <svelte:component this="{ForwardRotate}" />
            </div>
        </div>
        <div class="zoom">
            <div class="icon-button" on:click="{() => onChangeZoom(1)}">
                <svelte:component this="{Add}" />
            </div>
            <div class="zoom-value">{($zoom * 100).toFixed(0)}%</div>
            <div class="icon-button" on:click="{() => onChangeZoom(-1)}">
                <svelte:component this="{Subtract}" />
            </div>
            <div class="icon-button" on:click="{() => onChangeZoom()}">
                <svelte:component this="{Reset}" />
            </div>
        </div>
    </div>
</template>

<style lang="less">
.tool-container {
    border-right: solid 1px rgba(0, 0, 0, 0.1);

    .icon-button {
        padding: 10px;
        margin: auto;
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        &:active {
            background-color: rgba(0, 0, 0, 0.2);
        }

        &.disabled {
            background-color: rgba(100, 100, 100, 0.1);
        }
    }

    .zoom {
        .zoom-value {
            font-size: 10px;
            text-align: center;
            padding: 5px 0;
            user-select: none;
        }
    }
}
</style>

<script lang="ts">
import Add from 'carbon-icons-svelte/lib/Add16'
import Subtract from 'carbon-icons-svelte/lib/Subtract16'
import Reset from 'carbon-icons-svelte/lib/Reset16'
import BackwardRotate from 'carbon-icons-svelte/lib/Rotate16'
import ForwardRotate from 'carbon-icons-svelte/lib/WatsonHealthRotate_18016'

import { useStore } from '@/store'

const { history, zoom, dispatch } = useStore((state) => state.editor)

const zoomStep = 0.1
const minZoom = 0.5
const maxZoom = 5

function onChangeZoom(vector?: 1 | -1) {
    if (($zoom <= minZoom && vector < 0) || ($zoom >= maxZoom && vector > 0)) {
        return
    }

    const value = vector
        ? parseFloat(($zoom + vector * zoomStep).toFixed(2))
        : 1

    dispatch('updateZoom', value)
}
</script>
