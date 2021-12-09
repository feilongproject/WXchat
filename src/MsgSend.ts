import { wxserver } from './var'
import { GetToken } from './GetToken'
var CHAT: KVNamespace

//文档：https://work.weixin.qq.com/api/doc/90000/90135/90236
export async function MsgSend(msgInfo: string, type: string): Promise<Response> {
    console.log(`send msg:${msgInfo},type:${type}`)



    const sendMsgRes = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${await GetToken()}`, {
        method: "post",
        body: JSON.stringify({
            msgtype: type,
            agentid: wxserver.wecomAgentId,
            touser: wxserver.wecomTouid,
            text: {
                content: msgInfo,
            },
            duplicate_check_interval: 600,
        })
    }).then(res => {
        return res.text()
    }).then(res => {
        return JSON.parse(res)
    })


    //var res=JSON.parse(`{"errcode":0,"errmsg":"ok","msgid":"fcLc6UhB2absSaoEDgOVFPKytt-HIDZeXtI_-55eQiuVLzkX6jsB0s_lvaCaVg30kvOFUhPd5r0FEnI-iXyeSw"}`)
    console.log(`returnMsg: ${JSON.stringify(sendMsgRes)}`)

    sendMsgRes.Content = msgInfo
    sendMsgRes.MsgUserType = "myself"

    const d = new Date()

    await CHAT.put((d.getTime() / 1000).toString(), JSON.stringify(sendMsgRes))


    return new Response(JSON.stringify(sendMsgRes), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

