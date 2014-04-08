$(function() {
    if (typeof oldIE !== "undefined") {
        $("<img />").load(function(){
            $("#background").append($(this));
        }).attr("src", "images/bg.jpg");    
    } else {
        var width = $(window).width(),
            height = $(window).height(),
            $bgWrapper = $("#background").hide(),
            $bg = [],
            numberOfBg = 5,
            percent = [1.0, 0.6, 0.4, 0.3, 0.1],
            step = 100,
            count = 0;
         
        $(window).resize(function() {
            width = $(window).width();
            height = $(window).height();
            $bgWrapper.css("height", height + step);
        });
         
        for (var i = 0; i < numberOfBg; ++i) {
            $("<img />").attr("id", "bg" + i).load(function() {
                var $this = $(this);
                $bg[parseInt(($this).attr("id").charAt(2))] = $this.appendTo($bgWrapper);
                addBg();
            }).attr("src", "images/bg" + i + ".png");
        }
        
        var addBg = function() {
            ++count;
            if (count === numberOfBg) {
                $bgWrapper.show().animate({height: height + step, top: "-" + step, left: "-" + step}, 1000, function() {
                    $(document).mousemove(function(event) {
                        var x = step * event.pageX / width,
                            y = step *event.pageY / height;
                            
                        for (var i = 0; i < numberOfBg; ++i) {
                            var deltaX = parseInt(x * percent[i]), 
                                deltaY = parseInt(y * percent[i]);
                            $bg[i].css({"left": deltaX, "top": deltaY});        
                        }
                    });        
                });
            }            
        }
    }
});