<template>
    <PageContainer title="页面中心" layout="workspace">
        <svelte:fragment slot="action">
            <Button size="small" on:click="{() => router.push('/editor')}"
                >新建</Button>
        </svelte:fragment>
        <div class="container">
            {#each pagesSource as source}
                <div class="page-item">
                    <div
                        class="image"
                        style="background-image: url({source.page.background})">
                    </div>
                    <div class="title">{source.page.title}</div>
                    <div class="action flex">
                        <Button
                            size="small"
                            kind="ghost"
                            class="flex-1"
                            on:click="{() => onEditPage(source._id)}"
                            >编辑</Button>
                        <Button
                            size="small"
                            kind="ghost"
                            class="flex-1"
                            on:click="{() => onDeletePage(source._id)}"
                            >删除</Button>
                    </div>
                </div>
            {/each}
        </div>
    </PageContainer>
</template>

<style lang="less">
.page-item {
    border: solid 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
    position: relative;

    .image {
        width: 180px;
        height: 200px;

        background-size: 100% auto;
    }

    .title {
        border-top: solid 1px rgba(0, 0, 0, 0.1);
        text-align: center;
        padding: 10px 0;
    }

    .action {
        border-top: solid 1px rgba(0, 0, 0, 0.1);
    }

    &:hover {
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    }
}
</style>

<script lang="ts">
import PageContainer from '@/shared/components/page-container.svelte'
import { Button } from 'carbon-components-svelte'

import { onMount } from 'svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'
import { openConfirm } from '@/shared/components/notification-center.svelte'

export let router

let pagesSource = []

function onLoadPages() {
    const app = Cloudbase.get()
    const db = app.database()
    db.collection('pages')
        .get()
        .then(({ data }) => {
            pagesSource = data
        })
}

function onEditPage(id) {
    router.push(`/editor?id=${id}`)
}

function onDeletePage(id) {
    openConfirm({
        type: 'success',
        message: '是否确定删除该项目'
    }).then((data) => {
        const app = Cloudbase.get()
        const db = app.database()
        db.collection('pages')
            .doc(id)
            .remove()
            .then(() => {
                onLoadPages()
            })
    })
}

onMount(() => {
    onLoadPages()
})
</script>
