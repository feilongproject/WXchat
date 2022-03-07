import { WX } from './var'
import { WxCom } from 'wecom-msg-manage'


//文档：https://work.weixin.qq.com/api/doc/90000/90135/90236
export async function MsgSend(msgInfo: string, type: string, wxcom: WxCom): Promise<Response> {
    console.log(`\nsend msg:${msgInfo}\ntype:${type}`)


    var HistoryToken: Token = await CHAT.get("Token").then(res => {
        if (res)
            return JSON.parse(res)
    })

    const Res = await wxcom.MsgSend(type, msgInfo, WX.Touid)

    var sendMsgRes: any = Res.sendMsgRes
    var newToken = Res.newToken


    sendMsgRes.Content = msgInfo
    sendMsgRes.MsgUserType = "client"
    sendMsgRes.MsgType = "text"


    await CHAT.put("Token", JSON.stringify(newToken))
    await CHAT.put(Math.trunc((new Date()).getTime() / 1000).toString(), JSON.stringify(sendMsgRes))


    return new Response(JSON.stringify(sendMsgRes), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

