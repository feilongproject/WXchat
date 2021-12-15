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
<html>
  <head>
    <link rel="icon" type="image/x-icon" href="//cdn.jsdelivr.net/gh/feilongproject/bili-downloader/favicon.ico">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/BenzLeung/benz-amr-recorder/BenzAMRRecorder.min.js"></script>
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
  <body>
  <!-- MSG BODY -->

  <script>
  function E(selector) {
      return document.querySelector(selector);
  }

  /**** 解码、播放 ****/

  var amr;

  var loadDemoBtn = E('#amr-load');
  var loadAmrFile = E('#amr-file');
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
      loadDemoBtn.setAttribute('disabled', true);
      loadAmrFile.setAttribute('disabled', true);
      amr.initWithUrl('/conver?type=voice&id=' + id).then(function() {
          loadDemoBtn.removeAttribute('disabled');
          loadAmrFile.removeAttribute('disabled');
          playBtn.removeAttribute('disabled');
          playBtn.removeAttribute('disabled');
          duration.innerHTML = amr.getDuration().toFixed(2) + '\\'';
      });

      // 绑定事件
      amr.onPlay(function() {
          console.log('Event: play');
          playBtn.innerHTML = '停止';
      });
      amr.onStop(function() {
          console.log('Event: stop');
          playBtn.innerHTML = '播放';
      });
      amr.onEnded(function() {
          console.log('Event: ended');
          playBtn.innerHTML = '播放';
      });
      amr.onAutoEnded(function() {
          console.log('Event: autoEnded');
      });
      amr.onStartRecord(function() {
          console.log('Event: startRecord');
      });
      amr.onFinishRecord(function() {
          console.log('Event: finishRecord');
      });
      amr.onCancelRecord(function() {
          console.log('Event: cancelRecord');
      });
  };
</script>
`
