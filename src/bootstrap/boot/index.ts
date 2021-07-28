import { httpBoot } from './http.boot'
import { launch } from './launch.boot'

export async function boot() {
    // 配置网络请求
    httpBoot()
    // 启动逻辑
    await launch()
}
