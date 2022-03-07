import { WxCom } from 'wecom-msg-manage'
import { MsgSend } from './MsgSend'
import { ReadPage } from './ReadPage'
import { ConverVoice } from './ConverVoice'
import { WX } from './var'
import { MsgRece } from './MsgRece'

async function Main(request: Request): Promise<Response> {

    const url = new URL(request.url)
    console.log(url)

    const { pathname } = url
    console.log(`pathname: ${pathname}\nhref: ${url.href}`)


    const wxcom = new WxCom(WX.AgentId, WX.Secret, WX.CId, WX.token, WX.EncodingAESKey)

    if (pathname.startsWith("/send")) {
        var msgInfo = url.searchParams.get("msg")
        var type = url.searchParams.get("type")
        if (!type) type = "text"
        if (!msgInfo) throw new Error("msg empty");

        return await MsgSend(msgInfo, type, wxcom)

    } else if (pathname.startsWith("/rece")) {
        return await MsgRece(wxcom, request,)

    } else if (pathname.startsWith("/read") || pathname == "/") {
        return await ReadPage()

    } else if (pathname.startsWith("/conver")) {
        const type = url.searchParams.get("type")
        const id = url.searchParams.get("id")

        console.log(`\nConver page\ntype: ${type}\nid: ${id}`)
        if (type && id) {
            if (type == "voice") {
                return ConverVoice(id,wxcom)
            } else throw new Error("error: type unknown");

        } else throw new Error("error: id or type empty");


    } else {
        return new Response(`<h1>404 not found page</h1>`, {
            headers: { "Content-Type": "text/html;charset=utf-8" },
        })
    }

}


addEventListener("fetch", (event) => {
    console.log(`\n\n\nlog start,d=${Date.now()}`)
    event.respondWith(
        Main(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});