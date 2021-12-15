import { readPage } from './var'


export async function ReadPage() {
    var page = readPage
    //console.log(CHAT)
    var list = await CHAT.list()
    console.log(list.keys)
    if (list.keys.length == 0) {
        page += `<h1>No Msg</h1>`
    }
    else for (var i = list.keys.length - 1; i >= 0; i--) {

        var key = await CHAT.get(parseInt(list.keys[i].name).toString())

        var keyId: receInfoDef = JSON.parse(key ? key : "{}")

        console.log(keyId)
        var date = new Date(parseInt(list.keys[i].name) * 1000 + 8 * 3600 * 1000)

        var dateStrD = date.getFullYear() + "-" + (date.getMonth() > 8 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()))
        var dateStrT = (date.getHours() > 9 ? date.getHours() : ("0" + date.getHours())) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes())) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : ("0" + date.getSeconds()))
        //console.log(dateStrD + " " + dateStrT)

        switch (keyId.MsgType) {
            case "text":
                page += `
                    <div class="msg-${keyId.MsgUserType}">
                        <span>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            ${keyId.Content}
                        </span>
                    </div>`

                break;
            case "image":
                page += `
                    <div class="msg-${keyId.MsgUserType}">
                        <span>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            <img src="${keyId.PicUrl}" style="width: 20%;"/>
                        </span>
                    </div>`
            case "voice":
                page += `
                    <div class="msg-${keyId.MsgUserType}">
                        <span>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            <a href="/conver?type=voice&id=${keyId.MediaId}">voice</a>
                            <details style="background-color: rgba(255, 255, 255, 0.5);">
                                <summary>voice id</summary>
                                ${keyId.MediaId}
                            </details>
                        </span>
                    </div>`
            default:
                break;
        }
    }


    //console.log(page)
    return new Response(page, {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

