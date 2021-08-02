<template>
    <PageContainer title="登录" layout="default" header="{false}">
        <div class="userid">{$userid}</div>
        <Button kind="primary" on:click="{login}" size="field">login</Button>
        <div class=".p-10.text-red-400.text-xl">123</div>
    </PageContainer>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { Button } from 'carbon-components-svelte'
import PageContainer from '@/shared/components/page-container.svelte'
import type Router from '@easyroute/core'

export let router: Router

const { userid, dispatch } = useStore((store) => store.user)

function login() {
    dispatch('login', 'admin')
    router.push('/editor')
}
</script>
