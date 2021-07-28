/// <reference types="svelte" />
/// <reference types="vite/client" />

// import type { SvelteComponent } from "svelte";

declare module "*.svg?component" {
    const content: any;
    export default content;
}
