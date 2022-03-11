# WXchat
通过web界面和微信用户聊天

# 使用方法

## 脚本变量设置
> 与部署相关的变量（如 `wrangler` 需自行创建）
### 企业微信
该内容 [src/var.ts](src/var.ts) 中的 `WX` 对象中，具体内容见下方:
```ts
export const WX={ 
    wecomCId: "",       //企业的Cid
    wecomSecret: "",    //企业微信应用的Secret
    wecomAgentId: "",   //企业微信应用的AgentId
    wecomTouid: "",     //企业微信应用发送目标用户(单人使用一般设置为@all)
    EncodingAESKey: "", //企业微信应用接受信息服务器设置时的AESKey
    token: "",          //企业微信应用接受信息服务器设置时的token
    corpId, ""          //暂时缺省
}
```
## 构建
### 只构建不发布
```sh
npm run build
```
构建后文件生成在 `dist` 文件夹中的 `worker.js` ，此时可以手动将文件内容粘贴至 `cloudflare` 的worker中。
### 自动构建并发布(使用wrangler)
```sh
wrangler publish
```
注意:该方法只适用于已经配置好 `wrangler.toml` 文件。