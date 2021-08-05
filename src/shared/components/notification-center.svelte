<template>
    <div class="toast-container flex flex-col items-center">
        {#each $toasts as toast (toast.id)}
            <InlineNotification
                kind="{toast.type}"
                title="{toast.title}:"
                subtitle="{toast.message}"
                timeout="{toast.timeout}"
                on:close="{onToastClose(toast)}" />
        {/each}
    </div>
</template>

<script lang="ts" context="module">
// 提示列表
const toasts = writable([])

// 提示选项
type ToastOption = {
    type: 'success' | 'warning' | 'error'
    message: string
    timeout?: number
}

// 提示类型
const ToastType = {
    success: '成功',
    warning: '警告',
    error: '错误'
}

/**
 * 创建提示信息
 * @param option
 */
export function openToast(option: ToastOption) {
    toasts.update((value) => [
        ...value,
        {
            id: Math.random().toString(32).slice(2),
            title: ToastType[option.type],
            type: option.type,
            message: option.message,
            timeout: option.timeout || 2000
        }
    ])
}
</script>

<script lang="ts">
import { InlineNotification } from 'carbon-components-svelte'
import { writable } from 'svelte/store'

function onToastClose(toast) {
    return () => {
        toasts.update((value) => value.filter((x) => x.id !== toast.id))
    }
}
</script>
