(function($) {
    var time = 0;
    var timer = null;

    var methods = {
      init: function(callback) {
          var $el = this;
          var total = +($el.attr('data-max')) * 60;
          var startDate = new Date();
          var warning = false;

          var updateCountdown = function() {
              var now = new Date();
              time = Math.round((now.getTime() - startDate.getTime()) / 1000);
              if (total) {
                  var totalSecsLeft = total - time;
                  if (totalSecsLeft <= 0) {
                      clearInterval(timer);
                      callback(time);
                  } else {
                      if (totalSecsLeft < 60 && !warning) {
                        $el.addClass('attention');
                        warning = true;
                      }
                      var seconds = totalSecsLeft % 60;
                      var minutes = Math.floor(totalSecsLeft / 60);
                      if (seconds < 10) seconds = '0' + seconds;
                      if (minutes < 10) minutes = '0' + minutes;
                      $el.html('<i class="icon clock"></i>' + minutes + ':' + seconds);
                  }
              }
          };

          timer = setInterval(updateCountdown, 1000);
          updateCountdown();
          return this;
      },
      stop: function() {
        clearInterval(timer);
        return time;
      }
    };

    $.fn.countdown = function(option) {
        if (typeof option == 'string') {
          if (methods[option]) return methods[option].apply(this, Array.prototype.slice.call(arguments, 1));
          else $.error('Method ' +  option + ' does not exist on jQuery.countdown');
        } else {
          return methods.init.apply(this, arguments);
        }
    };
}(jQuery));
