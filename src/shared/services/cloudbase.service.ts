import { appConfig } from '@/config/app.config'
import cloudbase from '@cloudbase/js-sdk'

export class Cloudbase {
    private static app

    public static init() {
        if (!Cloudbase.app) {
            Cloudbase.app = cloudbase.init({
                env: appConfig.cloudbase.env,
                region: appConfig.cloudbase.region
            })

            console.log('CLOUDBASE SDK 初始化成功')
        }
    }

    public static get() {
        if (!Cloudbase.app) {
            Cloudbase.init()
        }

        return Cloudbase.app
    }
}
