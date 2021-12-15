import { MsgRece } from './MsgRece'
import { MsgSend } from './MsgSend'
import { ReadPage } from './ReadPage'
import { ConverVoice } from './ConverVoice'

async function Main(request: Request): Promise<Response> {

    //console.log(request)
    const url = new URL(request.url)
    console.log(url)

    const { pathname } = url
    console.log(`pathname: ${pathname}; href: ${url.href}`)

    var returnMsg
    if (pathname.startsWith("/send")) {
        var msgInfo = url.searchParams.get("msg")
        var type = url.searchParams.get("type")
        if (!type) type = "text"
        if (!msgInfo) {
            console.log(url.searchParams.toString())
            return new Response("error: msg empty", {
                headers: { "Content-Type": "text/html;charset=utf-8" },
            })
        }
        return await MsgSend(msgInfo, type)

    } else if (pathname.startsWith("/rece")) {
        console.log("msg receing")
        return await MsgRece(await request.text(), url)

    } else if (pathname.startsWith("/read") || pathname == "/") {
        return await ReadPage()

    } else if (pathname.startsWith("/conver")) {
        const type = url.searchParams.get("type")
        const id = url.searchParams.get("id")

        console.log(`\nConver page\ntype: ${type}\nid: ${id}`)
        if (type && id) {
            if (type == "voice") {
                return ConverVoice(id)
            } else return new Response(`<h1>error: type unknown</h1>`, {
                headers: { "Content-Type": "text/html;charset=utf-8" },
            })
        } else {
            return new Response(`<h1>error: id or type empty</h1>`, {
                headers: { "Content-Type": "text/html;charset=utf-8" },
            })
        }

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