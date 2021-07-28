<template>
    <PageContainer title="作品中心" layout="workspace">
        <svelte:fragment slot="action">
            <Button size="small">创建海报</Button>
            <Button kind="secondary" size="small">创建H5</Button>
        </svelte:fragment>

        <ContentSwitcher
            bind:selectedIndex="{panelIndex}"
            light="{false}"
            size="sm">
            <Switch text="海报" />
            <Switch text="H5" />
        </ContentSwitcher>

        <div>123</div>
    </PageContainer>
</template>

<script lang="ts">
import { Button, ContentSwitcher, Switch } from 'carbon-components-svelte'
import PageContainer from '@/shared/components/page-container.svelte'
import { useStore } from '@/store'

const { userid, username, dispatch } = useStore((store) => store.user)

let panelIndex = 0
</script>
