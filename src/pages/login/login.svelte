<template>
    <div class="absolute inset-0" bind:this="{background}">
        {#if background}
            <img
                class="image-background absolute inset-0 w-full h-full"
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
            <div class="form-container">
                <div class="welcome text-center">H5 Editor</div>
                <div class="form p-5">
                    <Form layout="float">
                        <FormItem label="邮箱">
                            <TextInput bind:value="{formModel.email}" />
                        </FormItem>
                        <FormItem label="密码">
                            <PasswordInput bind:value="{formModel.password}" />
                        </FormItem>
                    </Form>
                </div>
                <div class="flex justify-center pt-10 space-x-10">
                    <Button
                        kind="secondary"
                        on:click="{onRegister}"
                        size="small">注册</Button>
                    <Button kind="primary" on:click="{onLogin}" size="small"
                        >登录</Button>
                </div>
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
    border-radius: 5px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 10px;
}

.welcome {
    font-size: 20px;
}
</style>

<script lang="ts">
import { useStore } from '@/store'
import { Button, PasswordInput, TextInput } from 'carbon-components-svelte'
import PageContainer from '@/shared/components/page-container.svelte'
import type Router from '@easyroute/core'
import { onMount } from 'svelte'
import { fade } from 'svelte/transition'
import Form from '@/shared/components/form.svelte'
import FormItem from '@/shared/components/form-item.svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'
import { openToast } from '@/shared/components/notification-center.svelte'
export let router: Router

let background: HTMLDivElement
let backgroundReady = false

let formModel = {
    email: '2037630@163.com',
    password: 'password123456'
}

const { userid, dispatch } = useStore((store) => store.user)

function onImageLoaded() {
    backgroundReady = true
}

function onRegister() {
    const app = Cloudbase.get()
    const { email, password } = formModel

    app.auth({ persistence: 'local' })
        .signUpWithEmailAndPassword(email, password)
        .then(() => {
            openToast({
                type: 'success',
                message: '验证邮件已发送'
            })
        })
        .catch(() => {
            openToast({
                type: 'error',
                message: '注册失败,请检查邮箱地址或是否已注册'
            })
        })
}

function onLogin() {
    const app = Cloudbase.get()
    const { email, password } = formModel

    app.auth({ persistence: 'local' })
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            openToast({
                type: 'success',
                message: '登录成功'
            })

            dispatch('login', 'admin')
            router.push('/editor')
        })
        .catch(() => {
            openToast({
                type: 'error',
                message: '登录失败'
            })
        })
}

onMount(() => {})
</script>
