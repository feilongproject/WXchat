export { }

declare global {
  const CHAT: KVNamespace;
  
  interface receInfoDef {
    CreateTime?: number;
    //CreateTime: number,
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
    errmsg?:string

  }
}