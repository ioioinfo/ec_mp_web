$(function() {
    function hengshuping(){
        if(window.orientation==180||window.orientation==0){

            $(".hengPing").hide().siblings().not("script").show();

        }
        if(window.orientation==90||window.orientation==-90){
            $(".hengPing").show().siblings().not("script").hide();
        }
    }

    $("body").append('<div class="hengPing"><span>请勿横屏哦</span></div>');
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
});
