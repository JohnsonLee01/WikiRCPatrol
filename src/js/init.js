    if (!rcpatrol) { // stops multiple instances of RC patrol from running
        //necessary resources
        var rcpatrol = {};
        if (mw.config.get("wgPageName").toLowerCase() == "Special:RecentChanges".toLowerCase()) {
            rcpatrol = true;
            $(document).ready(function () {
                var rcpatrollocation = mw.config.get("wgArticlePath").replace("$1", "Special:BlankPage/RCPatrol")
                $("#mw-content-text").prepend('<a href="' + rcpatrollocation + '">RC patrol</a> (<a href="' + rcpatrollocation + '?oresreview=1">ORES</a>)');
            });
        }
        if ((mw.config.get("wgPageName").toLowerCase() == "Special:BlankPage/RCPatrol".toLowerCase())) {
            /**
             * Khởi tạo các biến liên quan đến RC patrol
             */
            if (mw.config.get("skin") == "vector" && !(new URL(location.href)).searchParams.get("useskinversion")) {
                window.location.replace((function () {
                    var url = (new URL(location.href));
                    url.searchParams.set("useskinversion", "2");
                    return url;
                })());
            }
            rcpatrol.changes = [];
            rcpatrol.currentChange = 0;
            window.setInterval(() => {
                $("#rcpatroldiff").find("a").attr("target", "_blank");
                $(".mw-rollback-link").hide();
                $(".ve-init-mw-diffPage-diffMode").hide();
                $(".mw-revslider-container").hide();
                if (rcpatrol.currentChange == 0) {
                    rcpatrol.previouseditbutton.setDisabled(true);
                } else if (!rcpatrol.isDisabled) {
                    rcpatrol.previouseditbutton.setDisabled(false);
                }
            }, 100);
            $(document).ready(function () {
                rcpatrol.fetch();
                $("#firstHeading, #section_0").html("Tuần tra thay đổi gần đây");
                $("title").text("Tuần tra thay đổi gần đây - " + mw.config.get("wgSiteName"));
                /*
                if (mw.config.get("skin") == "minerva") {
                    $("body").html($("main").html());
                    $("#siteNotice").prepend('<a id="rcpatrolexit" href="/">Exit</a>');
                    $("#rcpatrolexit").click(function () {
                        window.history.back();
                    })
                }
                */
                $("#mw-content-text").html("");
                $("#mw-content-text").append('<div id="rcpatrolbuttons"></div>');
                $("#mw-content-text").append('<div id="rcpatroldiff"></div>');
                $("#rcpatrolbuttons").prepend(rcpatrol.rcpatrolbar.$element);
                $("#rcpatrolbuttons").prepend(rcpatrol.rollbackbar.$element);
                $("#rcpatrolbuttons").prepend(rcpatrol.dropdownmenu.$element);
                $("#rcpatrolbuttons").prepend('<a href="/wiki/Special:BlankPage/RCPatrol?oresreview=1">Chỉ hiển thị các sửa đổi có thể cần được xem xét</a><br>');
                if (mw.config.get('wgUserGroups').includes('sysop')) {
                    $("#rcpatrolbuttons").append('Công cụ quản lý: <span id="rcpatroladmintools"></span>');
                }
                $("#rcpatrolbuttons").append('Công cụ trang: <span id="rcpatrolpagetools"></span>');
                $("#rcpatroldiff").css({
                    overflow: "auto"
                });
            })
        }
    }
