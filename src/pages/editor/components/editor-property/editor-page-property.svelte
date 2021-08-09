<template>
    <Form labelWidth="{80}" layout="float">
        <FormItem label="页面标题">
            <TextInput />
        </FormItem>
        <FormItem label="页面背景">
            <UploadContainer on:upload="{onChangeImage}">
                {#if property.background}
                    <img class="w-full" alt="" src="{property.background}" />
                {:else}
                    <div
                        class="image-uploader w-full h-10 flex items-center justify-center">
                        上传背景图片
                    </div>
                {/if}
            </UploadContainer>
        </FormItem>
    </Form>
</template>

<style lang="less">
.image-uploader {
    //     background: red;
    border-radius: 5px;
    border: dashed 1px rgba(0, 0, 0, 0.3);
}
</style>

<script lang="ts">
import Form from '@/shared/components/form.svelte'
import FormItem from '@/shared/components/form-item.svelte'
import UploadContainer from '@/shared/components/upload-container.svelte'
import { TextInput } from 'carbon-components-svelte'
import { Cloudbase } from '@/shared/services/cloudbase.service'
import { useStore } from '@/store'
import { onMount } from 'svelte'
import { keys } from 'ramda'

const { dispatch, page } = useStore((state) => state.editor)

let property = {
    background: $page.background,
    title: $page.title
}

page.subscribe((page) => {
    if (page.background !== property.background) {
        property.background = page.background
    }

    if (page.title !== property.title) {
        property.title = page.title
    }
})

function onChangeImage({ detail: file }) {
    const app = Cloudbase.get()

    app.uploadFile({
        // 云存储的路径
        cloudPath: `images/${file.name}`,
        // 需要上传的文件，File 类型
        filePath: file
    }).then(({ download_url: url }: any) => {
        property.background = url

        dispatch('updateBackground', url)
    })
}

onMount(() => {})
</script>
