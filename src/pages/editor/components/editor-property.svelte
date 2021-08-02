<template>
    <ContentSwitcher selectedIndex="{1}" size="sm">
        <Switch>
            <div class="text-center w-6/12">属性</div>
        </Switch>
        <Switch text="页面设置" />
    </ContentSwitcher>
</template>

<script lang="ts">
import { ContentSwitcher, Switch } from 'carbon-components-svelte'
</script>
