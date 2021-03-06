export const WX = {
    wecomCId: "",
    wecomSecret: "",
    wecomAgentId: "",
    wecomTouid: "",
    EncodingAESKey: "",
    token: "",
    corpId: "",
}

export var readPage = `
<!DOCTYPE html>
<html>
    <head>
        <title>hello world</title>
        <link rel="icon" type="image/x-icon" href="https://cdn.jsdelivr.net/gh/feilongproject/bili-downloader/favicon.ico">
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/BenzLeung/benz-amr-recorder/BenzAMRRecorder.min.js"></script>
        <script type="text/javascript">
            function  sendmsg(){
                var msg = document.getElementById("msg-readying").value;
                console.log(msg);
                if(msg) {
                    fetch(\`/send?msg=\${msg}\`);
                } else {
                    alert("no msg!")
                }
            }
        </script>
        <style type="text/css">
            body{
                margin-right: 10%;
                margin-left: 10%;
                display: flex;
                flex-direction: column;
                background-color: #0af;
            }
            body div{
                margin: 10px 10px 10px 10px;
            }
            .msg-client{
                align-self: flex-end;
            }
            .msg-server{
                align-self: flex-start;
            }
            .msg-send,
            .msg-client,
            .msg-server{
                background-color: #0cf;
                box-shadow: 1px 1px 50px rgb(0 0 0 / 30%);
                border-radius: 5px;
                width: 70%;
                margin-bottom: 10px;
            }
            .msg-undefined{
                background-color: #f0f;
                align-self: flex-end;
            }
            hr{
                margin: 0px 0px 0px 0px;
            }
            .msg-send{
                align-self: center;
            }
            .msg-send-form{
                display: flex;
                justify-content: space-evenly;
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .msg-send-text,
            .msg-send-button{
                background-color: #fff;
                border-radius: 5px;
                border: 5px solid #0000;
            }
            .msg-send-text{
                flex-grow: 0.8;
            }
        </style>
    </head>
    <body>
        <div class="msg-send">
            <dev" class="msg-send-form">
                <input class="msg-send-text" type="text" id="msg-readying" placeholder="????????????">
                <button class="msg-send-button" onclick="sendmsg()">??????</button>
            </div>
        </div>
        <!-- MSG BODY -->

        <div id="player-amr">
        <p>
            <button id="amr-play" disabled>??????</button>
            <button id="amr-stop" disabled>??????</button>
            <input id="amr-progress" type="range" min="0" max="1" step="any" value="0" disabled>
            <label for="amr-progress">
                <span id="amr-cur">0'</span>
                <span>/</span>
                <span id="amr-duration">0'</span>
            </label>
        </p>
        </div>

    <script>
    function E(selector) {
        return document.querySelector(selector);
    }

    /**** ??????????????? ****/

    var amr;


    var playBtn = E('#amr-play');
    var stopBtn = E('#amr-stop');
    var progressCtrl = E('#amr-progress');
    var isDragging = false;
    var cur = E('#amr-cur');
    var duration = E('#amr-duration');

    setInterval(function() {
        if (amr) {
            cur.innerHTML = amr.getCurrentPosition().toFixed(2) + '\\'';
            if (!isDragging) {
                progressCtrl.value = amr.getCurrentPosition().toFixed(2);
            }
        } else {
            cur.innerHTML = '0\\'';
        }
    }, 10);


    playBtn.onclick = function() {
        amr.playOrPauseOrResume();
    };

    stopBtn.onclick = function() {
        amr.stop();
    };

    progressCtrl.onmousedown = function() {
        isDragging = true;
    };
    progressCtrl.onmouseup = function() {
        isDragging = false;
    };
    progressCtrl.onchange = function(e) {
        amr.setPosition(e.target.value);
    };
    function PlayAmr(id) {
        amr = new BenzAMRRecorder();
        playBtn.setAttribute('disabled', true);
        stopBtn.setAttribute('disabled', true);
        progressCtrl.setAttribute('disabled', true);
        amr.initWithUrl('/conver?type=voice&id=' + id).then(function () {
            playBtn.removeAttribute('disabled');
            stopBtn.removeAttribute('disabled');
            progressCtrl.removeAttribute('disabled');
            progressCtrl.setAttribute('max', amr.getDuration());
            duration.innerHTML = amr.getDuration().toFixed(2) + '\\'';
        });

        // ????????????
        amr.onPlay(function () {
            console.log('Event: play');
            playBtn.innerHTML = '??????';
        });
        amr.onStop(function () {
            console.log('Event: stop');
            playBtn.innerHTML = '??????';
        });
        amr.onPause(function () {
            console.log('Event: pause');
            playBtn.innerHTML = '??????';
        });
        amr.onResume(function () {
            console.log('Event: resume');
            playBtn.innerHTML = '??????';
        });
        amr.onEnded(function () {
            console.log('Event: ended');
            playBtn.innerHTML = '??????';
        });
        amr.onAutoEnded(function () {
            console.log('Event: autoEnded');
        });
        amr.onStartRecord(function () {
            console.log('Event: startRecord');
        });
        amr.onFinishRecord(function () {
            console.log('Event: finishRecord');
        });
        amr.onCancelRecord(function () {
            console.log('Event: cancelRecord');
        });
    };
    </script>
`
