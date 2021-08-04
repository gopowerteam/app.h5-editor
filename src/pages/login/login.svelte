<template>
    <div class="absolute inset-0" bind:this="{background}">
        {#if background}
            <img
                class="image-background absolute inset-0"
                alt=""
                on:load="{onImageLoaded}"
                src="https://source.unsplash.com/random/{background.clientWidth}x{background.clientHeight}" />
        {/if}
        {#if !backgroundReady}
            <div transition:fade class="absolute inset-0 color-background">
            </div>
        {/if}
    </div>

    <PageContainer title="登录" layout="default" header="{false}">
        <div
            class="login-container absolute inset-0 flex items-center justify-end">
            <div class="form-container flex justify-center items-center">
                <div class="welcome">Welcome</div>
                <Button kind="primary" on:click="{login}" size="small"
                    >登录</Button>
            </div>
        </div>
    </PageContainer>
</template>

<style lang="less">
.color-background {
    background: radial-gradient(circle at 12.5% 25%, @primary-color, #dd081e);
    z-index: -1;
}

.image-background {
    z-index: -2;
}

.form-container {
    margin-right: 100px;
    width: 360px;
    height: 250px;
    border-radius: 5px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 10px;
}

.welcome {
    margin-right: 50px;
    font-size: 20px;
}
</style>

<script lang="ts">
import { useStore } from '@/store'
import { Button } from 'carbon-components-svelte'
import PageContainer from '@/shared/components/page-container.svelte'
import type Router from '@easyroute/core'
import { onMount } from 'svelte'
import { fade } from 'svelte/transition'

export let router: Router

let background: HTMLDivElement
let backgroundReady = false

const { userid, dispatch } = useStore((store) => store.user)

function login() {
    dispatch('login', 'admin')
    router.push('/editor')
}

function onImageLoaded() {
    backgroundReady = true
}

onMount(() => {})
</script>
