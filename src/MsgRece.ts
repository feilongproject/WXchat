import CryptoJS from 'crypto-js'
import {wxserver} from './var'
var CHAT:KVNamespace

export async function MsgRece(receBody:string, url: URL) {
    CryptoJS

    console.log("body: ", receBody)

    var receInfo = await fetch(`${wxserver.decodeurl}${url.search}`, {
        method: "post",
        body: receBody
    }).then(res => {
        return res.text()
    }).then(res => {
        return JSON.parse(res)
    })
    
    receInfo.MsgUserType = "another"

    console.log(`receInfo:${receInfo}`)
    await CHAT.put(receInfo.CreateTime, JSON.stringify(receInfo))

    return new Response(JSON.stringify(receInfo), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })
     

}

