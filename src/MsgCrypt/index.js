const errCode = require('./ErrorCode');
const crypto = require('crypto');
const Prpcrypt = require('./pkcs7Encoder');
const fxp = require('fast-xml-parser');

export class WXBizMsgCrypt {
    /**
     * 构造函数
     * @param {string } token 开发者设置的token
     * @param {string } encodingAesKey 开发者设置的EncodingAESKey
     * @param {string } receiveId 不同应用场景传不同的id
     */
    constructor(token, encodingAesKey, receiveId) {
        this.token = token;
        this.encodingAesKey = encodingAesKey;
        this.receiveId = receiveId;
        return this;
    }


    /**
     * 将公众平台回复用户的消息加密打包.
     * @param {string} sReplyMsg 公众平台待回复用户的消息，xml格式的字符串
     * <xml> //此处sReplyMsg的格式形式如下，其中由于回复的格式不同，MsgType有所不同
            <ToUserName><![CDATA[toUser]]></ToUserName>
            <FromUserName><![CDATA[fromUser]]></FromUserName>
            <CreateTime>1348831860</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[this is a test]]></Content>
        </xml>
     * @param {string} sTimeStamp 时间戳，可以自己生成，也可以用URL参数的timestamp
     * @param {string} sNonce 随机串，可以自己生成，也可以用URL参数的nonce
     * @param {string} sEncryptMsg 加密后的可以直接回复用户的密文，包括msg_signature, timestamp, nonce, encrypt的xml格式的字符串
     * @return {xml} 加密后的微信标准回包的json格式
     * <xml>
            <ToUserName><![CDATA[toUser]]></ToUserName>
            <FromUserName><![CDATA[fromUser]]></FromUserName>
            <CreateTime>1348831860</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[this is a test]]></Content>
        </xml>
     */
    export EncryptMsg({ sReplyMsg, sTimeStamp }) {
        let pc = new Prpcrypt(this.encodingAesKey);
        // 构建微信回复的标准回包
        // <xml>
        //     <Encrypt><![CDATA[msg_encrypt]]></Encrypt>
        //     <MsgSignature><![CDATA[msg_signature]]></MsgSignature>
        //     <TimeStamp>timestamp</TimeStamp>
        //     <Nonce><![CDATA[nonce]]></Nonce>
        // </xml>
        let objStandWechatData = {
            xml: {}
        }
        let result = {
            Encrypt: {
                _cdata: null,
            },
            MsgSignature: {
                _cdata: null,
            },
            TimeStamp: null,
            Nonce: {
                _cdata: null,
            }

        };
        result.Encrypt._cdata = pc.encrypt(sReplyMsg, this.receiveId); //加密消息
        result.Nonce._cdata = parseInt((Math.random() * 100000000000), 10); //生成随机数
        result.TimeStamp = sTimeStamp || Math.floor(new Date().getTime() / 1000); //获取时间戳
        result.MsgSignature._cdata = this.GetSignature(result.TimeStamp, result.Nonce._cdata, result.Encrypt._cdata); //获得签名
        objStandWechatData.xml = result;

        //参考URL：https://www.cnblogs.com/ajanuw/p/9122228.html
        //转换为xml格式
        let XmlParser = fxp.j2xParser;
        let xmlParser = new XmlParser({
            cdataTagName: "_cdata",
        });
        let xmlResult = xmlParser.parse(objStandWechatData);
        // console.log(xmlResult);

        return xmlResult;
    }
    /**
     * 检验消息的真实性，并且获取解密后的明文.
     * <ol>
     *    <li>利用收到的密文生成安全签名，进行签名验证</li>
     *    <li>若验证通过，则提取xml中的加密消息</li>
     *    <li>对消息进行解密</li>
     * </ol>
     * @param {string} sMsgSignature  签名串，对应URL参数的msg_signature
     * @param {string} sTimeStamp string 时间戳 对应URL参数的timestamp
     * @param {string} sNonce 随机串，对应URL参数的nonce
     * @param {string} sPostData 密文，对应POST请求的数据
     * @param {string} sMsg 解密后的原文
     */
    export DecryptMsg(sMsgSignature, sTimeStamp, sNonce, sPostData = null) {

        let PostDataJsonObj = fxp.parse(sPostData);
        PostDataJsonObj = PostDataJsonObj.xml;



        let echoStrObj = fxp.parse(echoStrXml);
        echoStrObj = echoStrObj.xml
        return echoStrObj;



    }
    /**
     * 获取签名
     */
    export GetSignature(sTimeStamp, sNonce, encrypt) {
        let stringSort = [this.token, sTimeStamp, sNonce, encrypt].sort().join('');
        return this.sha1(stringSort);
    }

    sha1(str) {
        let sha1String = crypto.createHash('sha1');
        sha1String.update(str);
        let sign = sha1String.digest('hex');

        return sign;
    }

}


