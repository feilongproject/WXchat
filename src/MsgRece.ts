import { WxCom } from 'wecom-msg-manage'

export async function MsgRece(wxcom: WxCom, request: Request,): Promise<Response> {

    console.log("msg receing");
    const url = new URL(request.url);

    const msg_signature = url.searchParams.get("msg_signature");
    const nonce = url.searchParams.get("nonce");
    const timestamp = url.searchParams.get("timestamp");


    if (msg_signature && nonce && timestamp) {

        switch (request.method) {
            case "POST":
                const decodeData = await wxcom.MsgDecode(
                    await request.text(),
                    msg_signature,
                    parseInt(timestamp),
                    parseInt(nonce)
                );

                const saveData: any = decodeData
                saveData.MsgUserType = "server"
                console.log(`AES_encode: ${JSON.stringify(saveData)}`)


                await CHAT.put(decodeData.CreateTime.toString(), JSON.stringify(saveData))


                return new Response(JSON.stringify(saveData), {
                    headers: { "Content-Type": "text/html;charset=utf-8" },
                })


            case "GET":
                const echostr = url.searchParams.get("echostr");
                if (echostr) {
                    return new Response((await wxcom.MsgTest(echostr)).msg);
                } else throw new Error("not found echostr");
            default:
                throw new Error("unknown method");
        }

    } else throw new Error("msg_signature/nonce/timestamp not found");

}
