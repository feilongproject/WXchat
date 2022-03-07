import { WxCom } from "wecom-msg-manage"

export async function ConverVoice(id: string, wxcom: WxCom): Promise<Response> {

    var HistoryToken: Token = await CHAT.get("Token").then(res => {
        if (res)
            return JSON.parse(res)
    })

    const newToken = await wxcom.GetToken(HistoryToken)
    await CHAT.put("Token", JSON.stringify(newToken))

    const res = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=${newToken.access_token}&media_id=${id}`)



    return new Response(await res.blob(), {
        headers: {
            "Content-Disposition": "inline"
        }
    })
}