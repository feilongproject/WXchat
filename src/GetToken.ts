import { WX } from './var'
var CHAT: KVNamespace

interface Token {
    "errcode": number,
    "errmsg": string,
    "access_token": string,
    "expires_in": number,
    "add_in": number,
}

export async function GetToken(): Promise<string> {

    var HistoryToken: Token = await CHAT.get("Token").then(res => {
        if (res)
            return JSON.parse(res)
    })

    var d = new Date()

    if (d.getTime() < HistoryToken.expires_in + HistoryToken.add_in) {
        return HistoryToken.access_token
    }

    const NewToken: Token = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${WX.wecomCId}&corpsecret=${WX.wecomSecret}`).then(res => {
        return res.json()
    })


    NewToken.add_in = d.getTime()
    CHAT.put("Token", JSON.stringify(NewToken))

    console.log(`accessToken: ${NewToken}`)

    return NewToken.access_token
}