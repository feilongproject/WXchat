export { }

declare global {
  const CHAT: KVNamespace;


  interface receInfo {
    ToUserName: string,
    AgentID: number,
    Encrypt: string,
  }

  interface receInfoDef {
    ToUserName: string,
    FromUserName: string
    CreateTime: number;
    MsgType: string;
    MsgId: number,
    AgentID: number,

    Content?: string,

    PicUrl?: string,
    MediaId?: string,

    //MediaId?: string;
    Format?: string;

    Event?: string;
    EventKey?: string;


    MsgUserType?: string
  }

}