import xml2js from 'xml2js'
import { WX } from './var'
import { Prpcrypt } from './MsgCrypt/pkcs7Encoder'

export async function AES_decode(MsgInfo: receInfoDef): Promise<receInfoDef> {
    if (!MsgInfo.Encrypt || !MsgInfo.msg_signature || !MsgInfo.timestamp || !MsgInfo.nonce || !MsgInfo.AgentID) {
        return {}
    }
    let EncryptMsg = MsgInfo.Encrypt;

    let pc = new Prpcrypt(WX.EncodingAESKey);

    //此时返回的是明文XML，需要转换为对象
    let echoStrXml = pc.decrypt(EncryptMsg, parseInt(MsgInfo.AgentID));

    return await xml2js.parseStringPromise(echoStrXml).then((res) => {
        return res.xml
    }).then(res => {
        //console.log(`${JSON.stringify(res)}`)
        console.log(`vml to json: ${JSON.stringify(res)}`)
        var MsgType = res.MsgType[0]
        switch (MsgType) {
            case "text":
                return {
                    ToUserName: res.ToUserName[0],
                    FromUserName: res.FromUserName[0],
                    CreateTime: res.CreateTime[0],
                    MsgType: MsgType,
                    Content: res.Content[0],
                    MsgId: res.MsgId[0],
                    AgentID: res.AgentID[0],
                }
            case "image":
                return {
                    ToUserName: res.ToUserName[0],
                    FromUserName: res.FromUserName[0],
                    CreateTime: res.CreateTime[0],
                    MsgType: res.MsgType[0],
                    PicUrl: res.PicUrl[0],
                    MsgId: res.MsgId[0],
                    MediaId: res.MediaId[0],
                    AgentID: res.AgentID[0],
                }
            default:
                return {}

        }





    })

}


