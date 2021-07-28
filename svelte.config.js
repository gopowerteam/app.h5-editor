import sveltePreprocess from 'svelte-preprocess'

export default {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            less: {
                globalVars: {
                    'primary-color': '#1890ff'
                }
            }
        })
    ]
}
