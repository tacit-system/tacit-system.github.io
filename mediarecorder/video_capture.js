enlizt.videoCapture = function($dest, onChange) {
  var addVideoCapture = function(isWebcamSupported) {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var mimeType = null;
    if (isWebcamSupported) {
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        mimeType = 'video/webm; codecs=vp9';
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        mimeType = 'video/webm';
      } else if (MediaRecorder.isTypeSupported('video/mpeg4')) {
        mimeType = 'video/mpeg4';
      }  else if (MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4';
      } else {
        isWebcamSupported = false;
      }  
    }
    var buttonId = Math.random().toString(36).substring(2, length+2);
  
    var html = '<div class="file-input" style="padding-top: 30px;"><label for="' + buttonId + '"><%=Adicione um vídeo para prosseguir%></label><video class="videocapture-preview" playsinline controls></video>';
    if (isWebcamSupported) {
      html += '<div class="preview"><button id="' + buttonId + '" class="videocapture-button-webcam add-data-list"><i style="margin-right: 0.5em" class="icon camera"></i> <%=Gravar vídeo%></button></div>';
      html += '</div><div class="call-to-action">';
      html += '<div class="data-list-form videocapture-modal-webcam">';
      html += '  <div class="data-list-form-content">';
      html += '    <div class="videocapture-webcam-container text-container align-center" style="position: relative">';
      html += '      <video class="videocapture-video" style="width: 100%" autoplay muted playsInline></video>';
      html += '      <div style="text-align: center; position: absolute; left: 0; right: 0; bottom: 30px;">';
      html += '        <button class="videocapture-button-start button"><%=Gravar%></button>';
      html += '        <button class="videocapture-button-stop button" style="background-color: #c33"><%=Parar%></button>';
      html += '        <button class="videocapture-button-config button" style="position: absolute; right: 30px; padding: 0 1em;"><i class="icon setting"></i></button>';
      html += '      </div>';
      html += '    </div>';
      html += '    <div class="call-to-action" data-title="<%=Gravar vídeo%>"><button class="cancel ghost"><%=Cancelar%></button></div>';
      html += '  </div>';
      html += '</div>';
      html += '<div class="overlay"></div>';
    } else {
      html += '<div class="preview">';
      if (isMobile) {
        html += '<button class="videocapture-button-upload add-data-list" style="margin:5px"><i style="margin-right: 0.5em" class="icon camera"></i> <%=Gravar vídeo%></button>';  
      } else {
        html += '<button class="videocapture-button-upload add-data-list" style="margin:5px"><i style="margin-right: 0.5em" class="icon upload"></i> <%=Escolher um arquivo%></button>';  
        html += '<button class="videocapture-button-qrcode add-data-list" style="margin:5px"><i style="margin-right: 0.5em"  class="icon mobile"></i> <%=Continuar no smartphone%></button>';
      }
      html += '<div class="videocapture-info"><%=ATENÇÃO: o vídeo deve ter no máximo 2 minutos de duração e até 100MB. Grave em baixa resolução.%></div>';
      html += '</div>';
    }
    html += '<input class="videocapture-input-file" type="file" accept="video/*" style="display:none" hidden capture="user">';
    html += '</div>'
    $dest.html(html);

    var stream, recorder;
    var $countdown = null;
    var $startBtn = $dest.find('.videocapture-button-start');
    var $stopBtn = $dest.find('.videocapture-button-stop');
    var $configBtn = $dest.find('.videocapture-button-config');
    var $modal = $dest.find('.videocapture-modal-webcam');
    var $preview = $dest.find('.videocapture-preview');
    var chunks = [];
    var result = null;
    var videodevice = null;
    var audiodevice = null;
    var mediadevices = {
      audio: [],
      video: []
    };
  
    var getBlobDuration = function(blob) {
      var tempVideoEl = document.createElement('video');
    
      var durationP = new Promise(function(resolve) {
        tempVideoEl.addEventListener('loadedmetadata', function() {
          // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
          if (tempVideoEl.duration === Infinity) {
            tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
            tempVideoEl.ontimeupdate = function() {
              tempVideoEl.ontimeupdate = null;
              resolve(tempVideoEl.duration);
              tempVideoEl.currentTime = 0;
            }
          } else resolve(tempVideoEl.duration);
        })
      });
    
      tempVideoEl.src = typeof blob === 'string' || blob instanceof String 
        ? blob
        : window.URL.createObjectURL(blob);
    
      return durationP;
    };

    var resetWebCam = function() {
      stream.getAudioTracks().forEach(function(track) {
        track.stop();
      });
      stream.getVideoTracks().forEach(function(track) {
        track.stop();
      });
      stream = null;
      recorder = null;
      if ($countdown) {
        $countdown.countdown('stop');
        $countdown.remove();
        $countdown = null;  
      }
    };
  
    var stopRecording = function() {
      recorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };
      recorder.onstop = function(e) {
        setTimeout(function() {
          result = new Blob(chunks, {'type' : mimeType});
          getBlobDuration(result).then(function(duration) {
            if (duration < 10) {
              chunks = [];
              result = null;
              $startBtn.css('display', 'inline-block');
              $configBtn.css('display', 'inline-block');
              $stopBtn.css('display', 'none');
              if ($countdown) {
                $countdown.countdown('stop');
                $countdown.remove();
                $countdown = null;  
              }
            } else {
              $preview.attr('src', window.URL.createObjectURL(result)).css('display', 'block');
              $modal.removeClass('active');
              if (onChange) onChange(result);
              resetWebCam();
            }
          });
        }, 0);
      }
      recorder.stop();
    };
  
    var initWebCam = function() {
      $stopBtn.css('display', 'none');
      $startBtn.css('display', 'inline-block');
      $configBtn.css('display', 'inline-block');
    
      var mediaoptions = {
        audio: {echoCancellation: {exact: true}},
        video: {width: 640, height: 480}
      };
      if (videodevice !== null) mediaoptions.video.deviceId = {exact: mediadevices.video[videodevice].deviceId};
      if (audiodevice !== null) mediaoptions.audio.deviceId = {exact: mediadevices.audio[audiodevice].deviceId};
  
      navigator.mediaDevices.getUserMedia(mediaoptions).then(function(stm) {
        stream = stm;
        $dest.find('.videocapture-video')[0].srcObject = stream;
  
        navigator.mediaDevices.enumerateDevices().then(function(devices) {
          mediadevices = {
            audio: [],
            video: []
          };
          devices.forEach(function(device) {
            if (device.kind == 'audioinput') mediadevices.audio.push({
              deviceId: device.deviceId,
              label: device.label
            });
            else if (device.kind == 'videoinput') mediadevices.video.push({
              deviceId: device.deviceId,
              label: device.label
            });
          });
        });  
      }).catch(function(e) {
        enlizt.showModal('<%=Dispositivo não encontrado%>');
        $modal.removeClass('active');
        return console.error(e)
      });    
    };
  
    $startBtn.click(function() {
      chunks = [];
      $dest.find('.videocapture-video').css('display', 'inline');
      recorder = new MediaRecorder(stream, {mimeType: mimeType});
      recorder.start();
      $stopBtn.css('display', 'inline-block');
      $startBtn.css('display', 'none');
      $configBtn.css('display', 'none');
      $countdown = $('<div id="video-countdown" data-max="2" style="position: absolute; right: 20px; font-size: 25.6px; background-color: rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; top: 20px;"></div>');
      $dest.find('.videocapture-webcam-container').prepend($countdown);
      $countdown.countdown(stopRecording);
    });
  
    $stopBtn.click(stopRecording);
  
    $configBtn.click(function() {
      var createSelect = function(name, values) {
        var options = '';
        values.forEach(function(value, i) {
          var index = name == 'video' ? videodevice : audiodevice;
          options += '<option value="' + i + '" ' + (index === i ? 'selected="selected"' : '') + '>' + value.label + '</option>';
        });
        return '<select class="device-recording-select device-recording-select-' + name + '" style="width: 100%;">' + options + '</select>';  
      };
      enlizt.showModal('<h3><%=Câmera%>:</h3>' + createSelect('video', mediadevices.video) + '<h3 style="margin-top: 2em;"><%=Microfone%>:</h3>' + createSelect('audio', mediadevices.audio), true);
      $('.device-recording-select').change(function(e) {
        if (e.target.className.indexOf('device-recording-select-video') != -1) {
          videodevice = e.target.selectedIndex;
        } else {
          audiodevice = e.target.selectedIndex;
        }
        resetWebCam();
        initWebCam();
      })
    });
  
    $dest.find('.videocapture-button-webcam').click(function() {
      $preview[0].pause();
      $modal.addClass('active');
      initWebCam();
    });
  
    $modal.find('.cancel').click(function() {
      $modal.removeClass('active');
      if (stream) resetWebCam();
    });
  
    $dest.find('.videocapture-button-upload').click(function() {
      $dest.find('.videocapture-input-file').click();
    });
    $dest.find('.videocapture-input-file').on('change', function(evt) {
      if (evt && evt.currentTarget && evt.currentTarget.files.length) {
        var file = evt.currentTarget.files[0];
        if (!file.type.match('video.*')) {
          enlizt.showModal('<%=O arquivo precisa ser um vídeo%>');
          return;
        }
        if (file.size > 104857600) {
          enlizt.showModal('<%=O arquivo não pode ter mais de 100MB%>');
          return;
        }
        var dataURL = URL.createObjectURL(file);
        var el = document.createElement('video');
        el.src = dataURL;
        el.onloadedmetadata = function() {
          if (el.duration < 10) {
            enlizt.showModal('<%=O arquivo não pode ter menos de 10 segundos%>');
            return;
          } else if (el.duration > 120) {
            enlizt.showModal('<%=O arquivo não pode ter mais de 2 minutos%>');
            return;
          } else {
            $preview.attr('src', dataURL).css('display', 'block');
            if (onChange) onChange(file);
          }
        };
      }
    });

    $dest.find('.videocapture-button-qrcode').click(function() {
      var qr = qrcode(0, 'L');
      qr.addData(location.href);
      qr.make();
      var $content = $('<div class="text-container"><p><%=Leia o código abaixo com seu celular e faça o processo no telefone.%></p><div class="qrcode" style="text-align:center">' + qr.createImgTag(4) + '</div>');
      enlizt.showModal($content, true);
    });
  };

  if (!enlizt.hasOwnProperty('isWebcamSupported')) {
    console.log(navigator.mediaDevices)
    console.log(window.MediaRecorder)
    enlizt.isWebcamSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    if (!enlizt.isWebcamSupported) {
      addVideoCapture(enlizt.isWebcamSupported);
    } else {
      navigator.mediaDevices.getUserMedia({
        audio: {echoCancellation: {exact: true}},
        video: {width: 640, height: 480}
      }).then(function(stream) {
        navigator.mediaDevices.enumerateDevices().then(function(devices) {
          var video = false;
          var audio = false;
          devices.forEach(function(device) {
            if (device.kind == 'audioinput') audio = true;
            else if (device.kind == 'videoinput') video = true;
          });
          enlizt.isWebcamSupported = video && audio;
          addVideoCapture(enlizt.isWebcamSupported);

          stream.getAudioTracks().forEach(function(track) {
            track.stop();
          });
          stream.getVideoTracks().forEach(function(track) {
            track.stop();
          });
        }).catch(function(e) {
          enlizt.isWebcamSupported = false;
          addVideoCapture(enlizt.isWebcamSupported);

          stream.getAudioTracks().forEach(function(track) {
            track.stop();
          });
          stream.getVideoTracks().forEach(function(track) {
            track.stop();
          });
        }); 
      }).catch(function(e) {
        enlizt.isWebcamSupported = false;
        addVideoCapture(enlizt.isWebcamSupported);
      }); 
    }
  } else addVideoCapture(enlizt.isWebcamSupported);
};
