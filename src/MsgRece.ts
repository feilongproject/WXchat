import CryptoJS from 'crypto-js'
import xml2js from 'xml2js'
import { wxserver } from './var'

var CHAT: KVNamespace

interface receInfoDef {
    MsgUserType: string,
    CreateTime: number,

}

/*
请求方式：POST
请求地址 ：http://api.3dept.com/?msg_signature=ASDFQWEXZCVAQFASDFASDFSS&timestamp=13500001234&nonce=123412323

接收数据格式 ：
<xml> 
   <ToUserName><![CDATA[toUser]]></ToUserName>  企业微信的CorpID，当为第三方套件回调事件时，CorpID的内容为suiteid
   <AgentID><![CDATA[toAgentID]]></AgentID>     接收的应用id，可在应用的设置页面获取
   <Encrypt><![CDATA[msg_encrypt]]></Encrypt>   消息结构体加密后的字符串
</xml>
*/
export async function MsgRece(receBody: string, url: URL) {
    
    CryptoJS

    console.log(`MsgRece Body: ${receBody}`)

    var receInfo: receInfoDef =await xml2js.parseStringPromise(receBody).then((res) => {
        return res
    })



    /*
        var receInfo = await fetch(`${wxserver.decodeurl}${url.search}`, {
            method: "post",
            body: receBody
        }).then(res => {
            return res.text()
        }).then(res => {
            return JSON.parse(res)
        })
    */
    receInfo.MsgUserType = "another"

    console.log(`receInfo:${receInfo}`)
    await CHAT.put(receInfo.CreateTime.toString(), JSON.stringify(receInfo))

    return new Response(JSON.stringify(receInfo), {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })


}

