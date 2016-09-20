$(function() {

    function menuShow() {
        $("#menu").show();
        var timer = setTimeout(function() {
            $("#menu,.menu-c").addClass("active");
        });
    }

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
    $("#menuBtn").on("click", function() {
        menuShow();
    });
    $(".menuClose").on("click", function() {
        menuHid();
    });

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

});
