import { readPage } from './var'


export async function ReadPage() {
    var page = ""
    var pages = readPage

    //console.log(CHAT)
    var list = await CHAT.list()
    //console.log(JSON.stringify(list.keys))
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
                        <div>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            ${keyId.Content}
                        </div>
                    </div>`

                break;
            case "image":
                page += `
                    <div class="msg-${keyId.MsgUserType}">
                        <div>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            <img src="${keyId.PicUrl}" style="width: 20%;"/>
                        </div>
                    </div>`
                break;
            case "voice":
                page += `
                    <div class="msg-${keyId.MsgUserType}">
                        <div>Time: ${dateStrD + " " + dateStrT}<hr>
                            Content:<br>
                            <button onclick="PlayAmr('${keyId.MediaId}')">????????????</button>
                            <details style="background-color: rgba(255, 255, 255, 0.5);">
                                <summary>voice id</summary>
                                ${keyId.MediaId}
                            </details>
                        </div>
                    </div>
                    `
                break;
            default:
                break;
        }
    }


    //console.log(page)

    page = pages.replaceAll("<!-- MSG BODY -->", page)

    return new Response(page, {
        headers: { "Content-Type": "text/html;charset=utf-8" },
    })

}

