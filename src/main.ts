import { MsgRece } from './MsgRece'
import { MsgSend } from './MsgSend'
import { readPage } from './ReadPage'


async function Main(request: Request): Promise<Response> {
    console.log(request)
    const url = new URL(request.url)
    console.log(url)

    const { pathname } = url
    console.log(`pathname: ${pathname} ; href: ${url.href}`)

    var returnMsg
    if (pathname.startsWith("/send")) {
        var msgInfo = url.searchParams.get("msg")
        var type = url.searchParams.get("type")
        if (!type) type = "text"
        if (!msgInfo) return new Response("error: msg empty", {
            headers: { "Content-Type": "text/html;charset=utf-8" },
        })
        return await MsgSend(msgInfo, type)

    } else if (pathname.startsWith("/rece")) {
        return await MsgRece(await request.text(), url)

    } else if (pathname.startsWith("/read") || pathname == "/") {
        return await readPage()

    } else {
        return new Response(`<h1>404 not found page</h1>`, {
            headers: { "Content-Type": "text/html;charset=utf-8" },
        })
    }

}


addEventListener("fetch", (event) => {
    event.respondWith(
        Main(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});