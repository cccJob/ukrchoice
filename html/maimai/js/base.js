function baseFontSize(){
    $("html").css("fontSize",$(window).width()/20+"px");
}
baseFontSize();
$(window).on("resize",function(){
    baseFontSize();
});