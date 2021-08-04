/// <reference types="svelte" />
/// <reference types="vite/client" />

// import type { SvelteComponent } from "svelte";

declare module '*.svg?component' {
    const content: any
    export default content
}

interface ImportMetaEnv {
    VITE_CLOUDBASE_ENV: string
    VITE_CLOUDBASE_REGION: string
}
