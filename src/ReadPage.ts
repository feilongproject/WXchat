var CHAT: KVNamespace

interface keyDef {
    "errcode": number,
    "MsgUserType": string,
    "errmsg": string,
    "invaliduser": string,
    "invalidparty": string,
    "invalidtag": string,
    "msgid": string,
    "response_code": string,
    Content: string,
}


export async function readPage() {

    var list = await CHAT.list()
    console.log(list.keys)

    for (var i = list.keys.length - 1; i >= 0; i--) {

        var key = await CHAT.get(parseInt(list.keys[i].name).toString())

        var keyId: keyDef = JSON.parse(key ? key : "{}")

        console.log(keyId)
        var date = new Date(parseInt(list.keys[i].name) * 1000 + 8 * 3600 * 1000)

        var dateStrD = date.getFullYear() + "-" + (date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()))
        var dateStrT = (date.getHours() > 9 ? date.getHours() : ("0" + date.getHours())) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes())) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()))
        //console.log(dateStrD + " " + dateStrT)

        page += `
          <div class="msg-${keyId.MsgUserType}">
            <span>Time:${dateStrD + " " + dateStrT}<hr>
            Content:<br>
            ${keyId.errcode == 0 ? keyId.Content : keyId.errmsg}</span>
          </div>`
    }


    console.log(page)
    return new Response(page, {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

var page = `
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