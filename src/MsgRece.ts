
import xml2js from 'xml2js'
import { AES_decode } from './AES'

export async function MsgRece(receBody: string, url: URL) {

    console.log(`MsgRece Body xml: ${receBody}`)

    const receInfo: receInfoDef = await xml2js.parseStringPromise(receBody).then((res) => {
        return res.xml
    }).then(res => {
        return {
            ToUserName: res.ToUserName[0],
            Encrypt: res.Encrypt[0],
            AgentID: res.AgentID[0],
            msg_signature: url.searchParams.get("msg_signature"),
            nonce: url.searchParams.get("nonce"),
            timestamp: url.searchParams.get("timestamp"),
        }
    })


    console.log(`Msgrece Body json: ${JSON.stringify(receInfo)}`)

    var decodeData = await AES_decode(receInfo)
    decodeData.MsgUserType = "another"

    console.log(`AES_encode: ${JSON.stringify(decodeData)}`)

    if (!decodeData.CreateTime) decodeData.CreateTime = Date.now()

    await CHAT.put(decodeData.CreateTime.toString(), JSON.stringify(decodeData))


    return new Response(JSON.stringify(decodeData), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })


}

