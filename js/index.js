/*

   :::                                :::
 :::::::                             :::::
:::::::::                          ::::::::
:::::::::::::::::::::::::::::::::::::::::::
::::    :::    ::::::::::::::::   :::  ::::
:::    Smart    :::::cool::::    Crazy  :::
:::::   :::    :::::::::::::::    :::   :::
:::::::::::::::::::::::::::::::::::::::::::

*/
$(function() {
    function singleObj(url,id,name,icon){
        this.url = url;
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    var shortcutArr ;//快捷方式数组,用于存储在localStorage;

    (function() {
        if (ccc.getStorage("isIcon")) {
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
        $.ajax({
            type: "get",
            url: "./js/side.js",
            dataType: "json",
            success: function(data) {
                sideBuild(data);
            },
            error: function(e) {
                console.log(e);
            }
        });
    })();

    var isLogo = true; // 标记是从logo那里进入菜单吗,false为从侧栏添加按钮进入
    var isEditing = false; // 标记侧栏是否在编辑中

    /*
     *  侧栏
     */
    // 侧栏编辑
    function sideEditOut(that) {
        that.removeClass("active");
        $(".shortcut-list").removeClass("move");
    }
    $(".shortcut-edit").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var that = $(this);
        if (!that.hasClass("active")) {
            that.addClass("active");
            $(".shortcut-list").addClass("move");
            isEditing = true;
        } else {
            sideEditOut(that);
            isEditing = false;
        }
    });

    // 侧栏添加
    $(".shortcut-add").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        isLogo = false;
        menuShow();
    });

    // 创建侧栏
    function sideBuild(data) {
        console.log(data);
        for (var i = 0, len = data.length; i < len; i++) {
            sideSingle(data[i]);
        }
    }

    // 侧栏单个
    function sideSingle(data) {
        var tp = $("#tp3").clone().removeAttr("id");
        var icon = data.icon || "default";
        tp.find("a").attr({
            "data-url": data.url,
            "data-icon": icon,
            "data-name": data.name,
            "data-id": data.id,
        });
        tp.find("i").css("background", "url(img/" + icon + "W.png) center / contain no-repeat")
        tp.find("span").html(data.name);
        tp.insertBefore(".edit-add");
    }


    // 侧栏快捷方式点击
    $(".shortcut-list").on("click", ".sBtn", function() {
        if (!isEditing) {
            var that = $(this);
            that.addClass("active").parent().siblings().find(".sBtn").removeClass("active");
            var theUrl = that.attr("data-url");
            $("#ifr").attr("src", theUrl);
        }
    });

    // 侧栏删除
    $(".shortcut-list").on("click", ".shortcutDel", function() {
        var tar = $(this).parent();
        if (isEditing) {
            tar.css("transform","translate3d(-100%,0,0)");
            var timer = setTimeout(function(){
                tar.slideUp(200,"linear",function(){
                    tar.remove();
                });
            },200);
        }
    });























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
        isLogo = true;
        menuShow();
    });

    // 菜单关闭按钮操作
    $(".menuClose").on("click", function() {
        menuHid();
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
        for (var i = 0, len = data.length; i < len; i++) {
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
            for (var j = 0; j < data[i].contain.length; j++) {
                var tp2 = $("#tp2").clone().removeAttr("id");
                var icon = data[i].contain[j].icon || "default";
                tp2.attr({
                    "data-url": data[i].contain[j].url,
                    "data-icon": icon,
                    "data-name": data[i].contain[j].name,
                    "data-id": data[i].contain[j].id
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
            var id = that.attr("data-id");
            var name = that.attr("data-name");
            var icon = that.attr("data-icon");
            if (isLogo) {
                // 让侧栏对应的快捷方式高亮
                $(".l-c [data-id=" + id + "]").addClass("active").parent().siblings().find(".sBtn").removeClass("active");;
                menuHid();
                $("#ifr").attr("src", theUrl);
            } else {
                var obj = new singleObj(theUrl,id,name,icon);
                if($(".l-c [data-id=" + id + "]").length == 0){//没有这个快捷方式
                    sideSingle(obj);
                }
            }
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

    // 键盘按键操作
    $(window).on("keydown", function(e) {
        console.log(e.keyCode);
        if (e.keyCode != 123 && e.keyCode != 116) { //f12 f5
            e.preventDefault();
            if (e.keyCode == 27) { //Esc
                if ($("#menu").hasClass("active")) { //菜单
                    menuHid();
                } else if ($(".move").size() > 0) { //侧栏编辑
                    sideEditOut($(".shortcut-edit"));
                }
            }
            if (e.ctrlKey && e.keyCode == 79) {
                menuShow();
            }
        }
    });

});
