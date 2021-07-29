<template>
    <div class="tool-container absolute inset-0 flex flex-col items-center">
        <div class="zoom">
            <div class="icon-button" on:click="{() => onChangeZoom(1)}">
                <svelte:component this="{Add}" />
            </div>
            <div class="zoom-value">{($stage.zoom * 100).toFixed(0)}%</div>
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

    .zoom {
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
        }

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

import { getContext } from 'svelte'
import type { IEvent, IStage } from '@/editor/interface'
import { EventType } from '@/editor/enums'
import type { Writable } from 'svelte/store'

const stage = getContext<Writable<IStage>>('stage')
const event = getContext<IEvent>('event')

const zoomStep = 0.1
const minZoom = 0.5
const maxZoom = 5

function onChangeZoom(vector?: 1 | -1) {
    if (
        ($stage.zoom <= minZoom && vector < 0) ||
        ($stage.zoom >= maxZoom && vector > 0)
    ) {
        return
    }

    if (vector) {
        $stage.zoom = parseFloat(($stage.zoom + vector * zoomStep).toFixed(2))
        console.log($stage.zoom)
    } else {
        $stage.zoom = 1
    }

    event.emit(EventType.zoom, $stage.zoom)
}
</script>
