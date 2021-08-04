import { Cloudbase } from '@/shared/services/cloudbase.service'

function launchWork1() {
    // replace your launch work
    return Promise.resolve()
}

async function cloudbaseInit() {
    Cloudbase.init()
}

export function launch() {
    return Promise.all([
        // replace your launch work
        launchWork1(),
        cloudbaseInit()
    ])
}
