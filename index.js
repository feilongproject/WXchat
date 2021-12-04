
const wxserver = {
  "SEND_KEY": "aaabbbccc",
  "wecomCId": "wwaaabbbccc",
  "wecomSecret": "aaabbbccc",
  "wecomAgentId": "1000002",
  "wecomTouid": "@all",
  "decodeurl": "apiurl"
}

async function Main(request) {
    console.log(request)
    const url = new URL(request.url)
    console.log(url)

    const { pathname } = url
    console.log(`pathname: ${pathname} ; href: ${url.href}`)

    //await sendToWecom("hello world")

    var returnMsg
    if(pathname.startsWith("/send")) {
        returnMsg=await MsgSend(url.searchParams.get("msg"),url.searchParams.get("type"))
    }else if(pathname.startsWith("/rece")) {
        returnMsg=await MsgRece(await request.text(),url)
    }else if(pathname.startsWith("/read")){
        returnMsg=await readPage()
    }else{
        returnMsg=`<h1>404 not found page</h1>`
    }

    return new Response(returnMsg, {
    headers: { "Content-Type": "text/html;charset=utf-8" },
    })
}

async function readPage(){
    var page=`
    <html>
      <head>
        <link rel="icon" type="image/x-icon" href="//cdn.jsdelivr.net/gh/feilongproject/bili-downloader/favicon.ico">
        <style type="text/css">
            .msg-myself{
                background-color: #0af;
                margin: 5px 5px 5px 30%;
            }
            .msg-another{
                background-color: #0af;
                margin: 5px 30% 5px 5px;
            }
            .msg-undefined{
                background-color: #f0f;
                margin: 5px 30% 5px 5px;
            }
            hr{
                margin: 0px 0px 0px 0px;
            }

        </style>
      </head>
      <body>`
    list = await CHAT.list()
    console.log(list.keys)

    for(i=list.keys.length-1;i>=0;i--){
        key=parseInt(list.keys[i].name)
        key=await CHAT.get(key)
        
        key=JSON.parse(key)
        if(key.errcode==undefined)key=JSON.parse(key)

        console.log(key)
        var date = new Date(list.keys[i].name * 1000 + 8 * 3600 * 1000)

        var dateStrD =date.getFullYear()+ "-" +(date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)))+ "-" +(date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()))
        var dateStrT =(date.getHours() > 9 ? date.getHours() : ("0" + date.getHours()))+ ":" +(date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes()))+ ':' +(date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()))
    //console.log(dateStrD + " " + dateStrT)

        page+=`
        <div class="msg-${key.MsgUserType}">
          <span>Time:${dateStrD+ " " +dateStrT}<hr>
          Content:<br>
          ${key.errcode==0?key.Content:key.errmsg}</span>
        </div>`
    }

    
    console.log(page)
    return page
}

async function MsgRece(receBody,url){

    console.log("body: ", receBody)

    var receInfo = await fetch(`${wxserver.decodeurl}${url.search}`,{
        method:"post",
        body:receBody
    }).then(res => {
        return res.json()
    })
    req.MsgUserType="another"
    console.log(`receInfo:${receInfo}`)
    await CHAT.put(req.CreateTime, JSON.stringify(receInfo))
    return JSON.stringify(receInfo)

}

async function MsgSend(msgInfo,type){
    console.log(`send msg:${msgInfo},type:${type}`)
    if(!type)type="text"
    if(!msgInfo)return "error: msg empty"


    const getTokenRes = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wxserver.wecomCId}&corpsecret=${wxserver.wecomSecret}`)
    
    const accessToken = (await getTokenRes.json()).access_token
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
                content: text,
            },
            duplicate_check_interval: 600,
        })
    })

    res = await sendMsgRes.json()

    //var res=JSON.parse(`{"errcode":0,"errmsg":"ok","msgid":"fcLc6UhB2absSaoEDgOVFPKytt-HIDZeXtI_-55eQiuVLzkX6jsB0s_lvaCaVg30kvOFUhPd5r0FEnI-iXyeSw"}`)
    console.log(`returnMsg: ${JSON.stringify(res)}`)

    res.Content=msgInfo
    res.MsgUserType="myself"

    const d=new Date()
    await CHAT.put(parseInt(d.getTime()/1000), JSON.stringify(res))

    return JSON.stringify(res)

}



addEventListener("fetch", (event) => {
  console.clear()
  event.respondWith(
    Main(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});