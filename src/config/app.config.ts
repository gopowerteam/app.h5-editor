export const appConfig = {
    cloudbase: {
        env: import.meta.env.VITE_CLOUDBASE_ENV,
        region: import.meta.env.VITE_CLOUDBASE_REGION
    },
    editor: {
        content: {
            width: 360,
            height: 640
        }
    }
}
