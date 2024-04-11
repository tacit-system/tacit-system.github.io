enlizt.controller('make_video', function(qualification) {
  var html = '';
  html += '<div class="slide active">';
  html += '  <div class="text" style="margin-top: 3em; min-height: 10em;">';
  html += '    <div class="text"><ul>';
  html += '      <li><%=Agora, conforme as instruções a seguir, você deve enviar um pequeno vídeo.%></li>';
  html += '      <li><%=A duração deve ser entre 10 segundos e 2 minutos.%></li>';
  if (!qualification.recordingRequired) html += '      <li><%=esta etapa é opcional. Escolha <strong>Não quero enviar o video </strong>se não quiser realizar a gravação.%></li>';
  html += '    </ul></div>';
  html += '  </div>';
  html += '  <div class="call-to-action"><button class="button next-slide"><%=Continuar%></button></div>';
  html += '</div>';

  html += '<div class="slide">';
  html += '  <div class="markdown-body">' +
  '    <p>' + $.sanitize(qualification.about).split("\n").join("<br />") + '</p>' +
  '  </div>';
  html += '<div id="input-recording-wrapper"></div>';
  html += '<div class="call-to-action"><button class="button" id="send"><%=Enviar%></button>';
  if (!qualification.recordingRequired) html += '<p style="margin-top:3em"><button class="button ghost" id="button-skip"><%=Pular Recording%></button></p>';
  html += '</div></div>';
  html += '<div class="slide">';
  html += '<div class="info">';
  html += '   <div id="progress"><div/></div>';
  html += '   <p><%=Enviando arquivo. Aguarde...%></p>';
  html += '</div>';
  html += '</div>';
  enlizt.setContent(html);

  var isMockup = window.hasOwnProperty('enliztMockupData');

  var file = null;

  var prepare = function() {
    var user = enlizt.getUser();
    var position = enlizt.getPosition();
    var $content = $('section.frame-content > .text-container');

    var uploadVideo = function() {
      if (!file.type.match('video.*')) return;
      if (file.size > 104857600 && !enlizt.isWebcamSupported) {
        enlizt.showModal('<%=O arquivo não pode ter mais de 100MB%>');
        return;
      }
      $content.find('.slide').removeClass('active').last().addClass('active');
      var $progress = $('#progress div');
      var data = new FormData();
      data.append('file', file);
      
      $.ajax({
          xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    $progress.css('width', percentComplete + '%');
                }
            }, false);
            return xhr;
          },
          type: 'POST',
          url: '/store/videos/' + position,
          headers: {'x-access-token': user.token},
          data: data,
          cache: false,
          dataType: 'json',
          processData: false,
          contentType: false, 
          success: function(data){
            if (data.qualification) {
              enlizt.setBreadcrumb(data.qualification.status);
              enlizt.go(data.qualification);
              if (window.ga) ga('send', 'event', 'enlizt_application', 'next', data.qualification.status);
            }
          }
      });
    };

    enlizt.videoCapture($content.find('#input-recording-wrapper'), function(result) {
      file = result;
      if (result) $('#input-recording-wrapper').css('background-color', '');
    });
  
    $content.find('#button-skip').click(function(e) {
      var content = $('<div style="margin-bottom: 36px" class="text-container"><p><%=Skip Recording Warning%></p><p><%=Skip Confirm%></p></div><div class="call-to-action" style="margin-bottom:-24px"><button class="button ghost close"><%=Voltar%></button><button id="button-confirm-skip" class="close"><%=Confirm%></button></div>');
      content.find('#button-confirm-skip').on('click', function() {
        enlizt.hideModal();
        enlizt.putDetailsandQualification({ skipped: true });
      });
      enlizt.showModal(content, true, true);  
    });

    $content.find('#send').click(function() {
      if (!file) $('#input-recording-wrapper').css('background-color', 'tomato');
      else uploadVideo();
    });

    $content.find('.next-slide').click(function() {
      $content.find('.slide').removeClass('active').eq(1).addClass('active');
    });

    // $.ajax({
    //     url: '/mobilerecord',
    //     type: 'POST',
    //     headers: {'x-access-token': user.token},
    //     data: {position: position, email: user.email},
    //     success: function(data){
    //       if (data.code) {
    //         var smsUrl = window.location.origin + '/mobilerecord/' + data.code;
    //         var qr = qrcode(0, 'L');
    //         qr.addData(smsUrl);
    //         qr.make();
    //         $('#qrcode > div').append(qr.createImgTag(4));          
    //       }
    //     }
    // });
  };

  if (!isMockup) {
    $.when($.getScript('qrcode.js')).done(prepare);
  }
});

