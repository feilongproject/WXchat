export { }

declare global {
  const CHAT: KVNamespace;

  interface receInfoDef {
    MsgType?: string;
    CreateTime?: number;
    ToUserName?: string,
    Encrypt?: string,
    AgentID?: string,
    msg_signature?: string | null,
    timestamp?: string | null,
    nonce?: string | null,
    AesKey?: string,
    EncodingAESKey?: string
    FromUserName?: string
    MsgUserType?:string
    errcode?:number,
    Content?:string,
    errmsg?:string,

    PicUrl?: string,
    MsgId?: string,
    MediaId?: string,

  }
}