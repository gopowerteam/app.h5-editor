import 'reflect-metadata'

import App from './app.svelte'
import '@/assets/styles/tailwind.postcss'
import '@/assets/styles/index.less'
import { appConfig } from './config/app.config'

const app = new App({
    target: document.getElementById('app')
})

export default app
