import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import svelteSVG from 'vite-plugin-svelte-svg'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        svelteSVG({
            svgoConfig: {} // See https://github.com/svg/svgo#configuration
        }),
        EnvironmentPlugin.default({
            VITE_CLOUDBASE_ENV: process.env.CLOUDBASE_ENV,
            VITE_CLOUDBASE_REGION: process.env.CLOUDBASE_REGION
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
