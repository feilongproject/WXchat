
import { GetToken } from './GetToken'

export async function ConverVoice(id: string): Promise<Response> {

    const res = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=${await GetToken()}&media_id=${id}`)

    console.log(res)
    return res
}