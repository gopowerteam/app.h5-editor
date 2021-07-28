import AppIcon from '@/assets/icons/app.svg?component'

export const routes = [
    {
        path: '/',
        component: () => import('@/pages/login/login.svelte'),
        name: 'login'
    },
    {
        path: '/dashboard',
        component: () => import('@/pages/dashboard/dashboard.svelte'),
        name: 'dashboard',
        meta: {
            menu: {
                title: '仪表盘',
                icon: AppIcon
            }
        }
    },
    {
        path: '/poster',
        component: () => import('@/pages/poster-center/poster-center.svelte'),
        name: 'poster-center',
        meta: {
            menu: {
                title: '海报中心',
                icon: AppIcon
            }
        }
    },
    {
        path: '/editor',
        component: () => import('@/pages/editor/editor.svelte'),
        name: 'editor'
    },
    {
        path: '/h5',
        component: () => import('@/pages/h5-center/h5-center.svelte'),
        name: 'h5-center',
        meta: {
            menu: {
                title: 'H5中心',
                icon: AppIcon
            }
        }
    }
]
