$(function() {
    // 菜单出现
    function menuShow() {
        $("#menu").show();
        var timer = setTimeout(function() {
            $("#menu,.menu-c").addClass("active");
        });
    }
    // 菜单消失
    function menuHid() {
        $("#menu,.menu-c").removeClass("active");
        if (!isIe9() || !isIe8()) {
            var timer = setTimeout(function() {
                $("#menu").hide();
            }, 250);
        }else{
        	 $("#menu").hide();
        }
    }
    // logo按钮操作
    $("#menuBtn").on("click", function() {
        menuShow();
    });
    // 菜单关闭按钮操作
    $(".menuClose").on("click", function() {
        menuHid();
    });
    // 键盘按键操作
    $(window).on("keydown", function(e) {
    	if(e.keyCode != 123 && e.keyCode != 116){//f12 f5
    		console.log(e, e.keyCode);
    		e.preventDefault();
    		if (e.keyCode == 27 && $("#menu").hasClass("active")) { //Esc
    		    menuHid();
    		}
    		if (e.ctrlKey && e.keyCode == 79) {
    		    menuShow();
    		}
    	}
    });

    // 切换菜单按钮操作
    $(".menuChange").on("click",function(){
        var that = $(this);
        var isIcon = (that.attr("data-icon") == "true");//现在状态是icon吗
        if(isIcon){
            $('span',that).eq(1).addClass('active').end().eq(0).removeClass("active");
            that.attr("data-icon","false");
        }else{
            that.find("span").eq(0).addClass("active").end().eq(1).removeClass("active");
            that.attr({"data-icon":"true"});
        }
    });

});
