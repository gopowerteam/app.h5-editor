<template>
    <div class="toast-container flex flex-col items-center">
        {#each $toasts as toast (toast.id)}
            <InlineNotification
                kind="{toast.type}"
                title="{toast.title}:"
                subtitle="{toast.message}"
                timeout="{toast.timeout}"
                hideCloseButton="{toast.hideClose}"
                on:close="{onToastClose(toast)}">
                <div slot="actions">
                    {#if toast.actions}
                        {#each toast.actions as action}
                            <NotificationActionButton
                                on:click="{action.onclick}"
                                >{action.title}</NotificationActionButton>
                        {/each}
                    {/if}
                </div>
            </InlineNotification>
        {/each}
    </div>
</template>

<script lang="ts" context="module">
// 提示列表
const toasts = writable<
    {
        id: string
        type: 'success' | 'warning' | 'error' | 'info'
        title: string
        message: string
        timeout: number
        actions?: any[]
        hideClose?: boolean
    }[]
>([])

// 提示选项
type ToastOption = {
    type?: 'success' | 'warning' | 'error' | 'info'
    message: string
    timeout?: number
    actions?: {
        title: string
    }[]
}

// 提示类型
const ToastType = {
    success: '成功',
    warning: '警告',
    error: '错误',
    info: '确认'
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

/**
 * 创建提示信息
 * @param option
 */
export function openConfirm(option: ToastOption) {
    const closeToast = (id) => {
        toasts.update((data) => data.filter((x) => x.id !== id))
    }
    const id = Math.random().toString(32).slice(2)
    return new Promise((resolve, reject) => {
        toasts.update((value) => [
            ...value,
            {
                id,
                title: ToastType['info'],
                type: 'info',
                message: option.message,
                timeout: 0,
                hideClose: true,
                actions: [
                    {
                        onclick: () => {
                            closeToast(id)
                            resolve(true)
                        },
                        title: '确定'
                    },
                    {
                        onclick: () => {
                            closeToast(id)
                            reject(false)
                        },
                        title: '取消'
                    }
                ]
            }
        ])
    })
}
</script>

<script lang="ts">
import {
    InlineNotification,
    NotificationActionButton
} from 'carbon-components-svelte'
import { writable } from 'svelte/store'

function onToastClose(toast) {
    return () => {
        toasts.update((value) => value.filter((x) => x.id !== toast.id))
    }
}
</script>
