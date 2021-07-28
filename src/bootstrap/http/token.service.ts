import { ExtendService } from '@gopowerteam/http-request'

export class TokenService extends ExtendService {
    public before = (params: any) => {
        const userid = '001'

        if (userid) {
            params.options.header = params.options.header || {}
            params.options.header['X-UserID'] = userid
        }
    }

    public after = (data: any, params) => {
        //
    }
}
