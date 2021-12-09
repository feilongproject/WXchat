import {wxserver} from './var'
var CHAT: KVNamespace

export async function MsgSend(msgInfo: string, type: string): Promise<Response> {
    console.log(`send msg:${msgInfo},type:${type}`)

    const getTokenRes = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wxserver.wecomCId}&corpsecret=${wxserver.wecomSecret}`).then(res => res.text())


    const accessToken = JSON.parse(getTokenRes).access_token
    console.log(`accessToken: ${getTokenRes}`)
    if (!accessToken) {
        throw new Error('获取 accessToken 失败')
    }

    const sendMsgRes = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`, {
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

