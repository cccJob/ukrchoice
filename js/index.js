$(function() {
    (function() {
    	if(ccc.getStorage("isIcon")){
    		var isIcon = !(ccc.getStorage("isIcon") == "true");
        	menuLayout($(".menuChange"), isIcon);
    	}
        $.ajax({
            type: "get",
            url: "./js/AjaxJson.js",
            dataType: "json",
            success: function(data) {
                menuListBuild(data);
            },
            error: function(e) {
                console.log(e);
            }
        });
    })();

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
        } else {
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
        console.log(e.keyCode);
        if (e.keyCode != 123 && e.keyCode != 116) { //f12 f5
            e.preventDefault();
            if (e.keyCode == 27 && $("#menu").hasClass("active")) { //Esc
                menuHid();
            }
            if (e.ctrlKey && e.keyCode == 79) {
                menuShow();
            }
        }
    });

    // 菜单展示方式
    function menuLayout(that, isIcon) {
        if (isIcon) { //现在状态是icon吗
            $('span', that).eq(1).addClass('active').end().eq(0).removeClass("active");
            that.attr("data-icon", "false");
            $(".menu-c-m").addClass("no-icon");
        } else {
            that.find("span").eq(0).addClass("active").end().eq(1).removeClass("active");
            that.attr({ "data-icon": "true" });
            $(".menu-c-m").removeClass("no-icon");
        }
    }

    // 建立menulist
    function menuListBuild(data) {
        for (var i in data) {
            // 生成菜单左侧栏
            var tp1 = $("#tp1").clone().removeAttr("id"); //一定要remove Id ,不然$("#tp1")有可能获取的是新添加的节点
            if (i == 0) {
                tp1.addClass("active");
            }
            tp1.html(data[i].name).appendTo(".classify-list");

            // 生成菜单右边内容区
            var li = $("<li></li>");
            if (i == 0) {
                li.addClass("active");
            }
            for (var j in data[i].contain) {
                var tp2 = $("#tp2").clone().removeAttr("id");
                var icon = data[i].contain[j].icon || "default";
                tp2.attr({
                    "data-url": data[i].contain[j].url,
                    "data-icon": icon,
                    "data-name": data[i].contain[j].name,
                });
                tp2.find("span").html(data[i].contain[j].name);
                tp2.find("i").css("background", "url(img/" + icon + ".png) center/contain no-repeat")
                tp2.appendTo(li);
            }
            li.appendTo(".menu-c-m-r ul");
        }



        // 生成出来的节点绑定事件可以写在生成后的下面,若要写在外面请用事件委托

        // 菜单分类tab切换
        $(".classify-item").on("click", function(e) {
            e.preventDefault();
            var that = $(this);
            var _index = that.index();
            that.addClass("active").siblings().removeClass("active");
            $(".menu-c-m-r li").eq(_index).show().siblings().hide();
        });

        // 菜单 a标签 点击
        $(".menu-c-m-r a").on("click", function() {
            var that = $(this);
            var theUrl = that.attr("data-url");
            menuHid();
            $("#ifr").attr("src", theUrl);
        });
    }

    // 切换菜单按钮操作
    $(".menuChange").on("click", function() {
        var that = $(this);
        var isIcon = (that.attr("data-icon") == "true"); //现在状态是icon吗
        $(".menu-c-m-r li").attr("style", ""); //清除行内样式 block none
        menuLayout(that, isIcon);
        ccc.setStorage("isIcon", !isIcon); //保存切换后的状态;
    });


});
