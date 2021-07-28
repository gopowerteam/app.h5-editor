import App from './app.svelte'
import '@/assets/styles/tailwind.postcss'
import '@/assets/styles/index.less'

const app = new App({
    target: document.getElementById('app')
})

export default app
