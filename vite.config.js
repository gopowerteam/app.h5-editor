import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import svelteSVG from 'vite-plugin-svelte-svg'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        svelteSVG({
            svgoConfig: {} // See https://github.com/svg/svgo#configuration
        })
    ],
    resolve: {
        alias: {
            '@': resolve(process.cwd(), 'src')
        }
    },
    optimizeDeps: {
        // include: ['clipboard-copy'],
        exclude: ['@storeon/svelte']
    }
})
