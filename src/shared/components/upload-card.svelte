<template>
    <div class="upload-card">
        <FileUploaderDropContainer
            on:change="{onSelectFile}"
            labelText="拖放文件或者通过单击进行上传" />
    </div>
</template>

<style lang="less">
:global(.upload-card) {
    :global(.bx--file-browse-btn) {
        width: 100%;
        max-width: unset;
    }

    :global(.bx--file__drop-container) {
        justify-content: center;
        align-items: center;
        min-height: 200px;
    }
}
</style>

<script lang="ts">
import { useModal } from '@gopowerteam/svelte-modal'

import { FileUploaderDropContainer } from 'carbon-components-svelte'
import { Cloudbase } from '../services/cloudbase.service'

const modal = useModal()

function onSelectFile({ target: { files } }: any) {
    const [file] = files

    const app = Cloudbase.get()

    app.uploadFile({
        // 云存储的路径
        cloudPath: `images/${file.name}`,
        // 需要上传的文件，File 类型
        filePath: file
    }).then(({ download_url }: any) => {
        modal.close({ url: download_url })
    })
}
</script>
