export const appConfig = {
    cloudbase: {
        env: import.meta.env.VITE_CLOUDBASE_ENV,
        region: import.meta.env.VITE_CLOUDBASE_REGION
    },
    editor: {
        content: {
            scale: 3,
            width: 1080,
            height: 1920
        }
    }
}
