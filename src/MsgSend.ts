import { WX } from './var'
import { GetToken } from './GetToken'

//文档：https://work.weixin.qq.com/api/doc/90000/90135/90236
export async function MsgSend(msgInfo: string, type: string): Promise<Response> {
    console.log(`\nsend msg:${msgInfo}\ntype:${type}`)



    var sendMsgRes = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${await GetToken()}`, {
        method: "post",
        body: JSON.stringify({
            msgtype: type,
            agentid: WX.AgentId,
            touser: WX.Touid,
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


    //var sendMsgRes: any = { "errcode": 0, "errmsg": "ok", "msgid": "123", "Content": "123456", "MsgUserType": "myself" }
    //var res=JSON.parse(`{"errcode":0,"errmsg":"ok","msgid":"fcLc6UhB2absSaoEDgOVFPKytt-HIDZeXtI_-55eQiuVLzkX6jsB0s_lvaCaVg30kvOFUhPd5r0FEnI-iXyeSw"}`)

    sendMsgRes.Content = msgInfo
    sendMsgRes.MsgUserType = "client"
    sendMsgRes.MsgType = "text"


    const d = new Date()
    const time = Math.trunc(d.getTime() / 1000)


    console.log(`\nput to KV:\nname: ${time.toString()}\nvalue:${JSON.stringify(sendMsgRes)}`)

    await CHAT.put(time.toString(), JSON.stringify(sendMsgRes))

    return new Response(JSON.stringify(sendMsgRes), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

