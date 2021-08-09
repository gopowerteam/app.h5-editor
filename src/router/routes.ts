import AppIcon from '@/assets/icons/app.svg?component'

export const routes = [
    {
        path: '/',
        component: () => import('@/pages/login/login.svelte'),
        name: 'login',
        auth: false
    },
    // {
    //     path: '/dashboard',
    //     component: () => import('@/pages/dashboard/dashboard.svelte'),
    //     name: 'dashboard',
    //     meta: {
    //         menu: {
    //             title: '仪表盘',
    //             icon: AppIcon
    //         }
    //     }
    // },
    {
        path: '/page-center',
        component: () => import('@/pages/page-center/page-center.svelte'),
        name: 'page-center',
        meta: {
            menu: {
                title: '页面中心',
                icon: AppIcon
            }
        }
    },
    {
        path: '/page-preview',
        component: () => import('@/pages/page-preview/page-preview.svelte'),
        name: 'page-preview'
    },
    {
        path: '/editor',
        component: () => import('@/pages/editor/editor.svelte'),
        name: 'editor'
    }
]
