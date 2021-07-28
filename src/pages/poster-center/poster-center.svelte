<template>
    <PageContainer title="海报中心" layout="workspace">
        <svelte:fragment slot="action">
            <Button
                size="small"
                on:click="{() => router.push('/editor')}"
                >创建海报</Button>
        </svelte:fragment>
    </PageContainer>
</template>

<script lang="ts">
import PageContainer from '@/shared/components/page-container.svelte'
import { Button } from 'carbon-components-svelte'
import router from '@/router'
</script>
