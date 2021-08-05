import Router from '@easyroute/core'
import historyMode from '@easyroute/core/history-mode'
import { routes } from './routes'
import { store } from '@/store'
import { boot } from '@/bootstrap/boot'
import { Cloudbase } from '@/shared/services/cloudbase.service'

const BASE_URL = import.meta.env.BASE_URL

export const router = new Router({
    mode: historyMode,
    omitTrailingSlash: true,
    base: BASE_URL === '/' ? '' : BASE_URL,
    routes
})

/**
 * 系统初始化
 */
router.beforeEach(async (to, from, next) => {
    const { ready } = store.get()

    if (!ready) {
        await boot()
        store.dispatch('ready')
    }
    
    if (to.meta.auth && !Cloudbase.getUser()) {
        next('/login')
        return
    }

    next()
})

export default router
