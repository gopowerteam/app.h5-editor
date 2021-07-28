// config.ts
import { RequestService } from '@gopowerteam/http-request'
import { TokenService } from '../http/token.service'

export function httpBoot() {
    // 配置服务端信息
    RequestService.setConfig({
        server: 'http://api.test.com/', // 设置请求地址
        timeout: 3000 // 设置请求超时
    })

    RequestService.interceptors.status.use((respone) => {
        return true
    })

    RequestService.interceptors.success.use((respone) => {
        return respone.data
    })

    RequestService.interceptors.error.use((respone) => {
        return respone
    })

    RequestService.requestCatchHandle = (respone) => {
        const defaultError = '服务通讯连接失败'
        const messageList = {
            400: '请求参数错误',
            405: '请求服务方法错误',
            500: '服务器内部错误',
            403: '没有权限，请重新登陆'
        }

        if (respone) {
            const responseMessage = (respone.data || {}).message
            const errorMessage =
                responseMessage || messageList[respone.status] || defaultError

            if (respone.status === 403) {
                console.error(respone.data)
            }
        } else {
        }
    }

    // 全局安装扩展服务
    RequestService.installExtendService(new TokenService())
}
