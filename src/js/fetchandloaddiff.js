    /**
     * Tìm nạp danh sách các thay đổi gần đây và tải RC patrol
     */
    rcpatrol.fetch = function () {
        if (!rcpatrol.fetchbutton.isDisabled()) {
            $("#rcpatroldiff").fadeOut();
            rcpatrol.setDisabled(true);
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "query",
                "format": "json",
                "list": "recentchanges",
                "rcprop": "title|timestamp|flags|loginfo|parsedcomment|user|ids|tags",
                "rcshow": "!bot" + ((new URL(window.location.href)).searchParams.get("oresreview") ? "|oresreview" : ""),
                "rctoponly": true,
                "rclimit": "max",
                "rctype": "edit|new",
                "uselang": mw.config.get("wgUserLanguage")
            }).done(function (result) {
                rcpatrol.changes = result.query.recentchanges;
                console.log(result.query.recentchanges);
                rcpatrol.setDisabled(false);
                rcpatrol.currentChange = 0;
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            }).fail(function () {
                window.setTimeout(rcpatrol.fetch, 1000);
            });
        }
    };
    /**
     * Nạp một thay đổi và đặt nó vào đầu ra khác biệt của RC patrol.
     * @param {*} thay đổi những bản khác biệt của thay đổi để tải
     */
    rcpatrol.loadChange = function (change) {
        $("#rcpatroldiff").fadeOut();
        $("#rcpatroladmintools").fadeOut();
        $("#rcpatrolpagetools").fadeOut();
        rcpatrol.setDisabled(true);
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "prop": "revisions",
            "titles": change.title,
            "rvlimit": "1",
            "uselang": mw.config.get("wgUserLanguage")
        }).done(function (result) {
            for (var pageid in result.query.pages) {
                change.revid = result.query.pages[pageid].revisions[0].revid;
                change.user = result.query.pages[pageid].revisions[0].user;
                break;
            }
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "query",
                "format": "json",
                "prop": "revisions",
                "titles": change.title,
                "rvexcludeuser": change.user,
                "rvlimit": "1",
                "uselang": mw.config.get("wgUserLanguage")
            }).done(function (result) {
                console.log(result);
                var oldid;
                try {
                    for (var pageid in result.query.pages) {
                        oldid = result.query.pages[pageid].revisions[0].revid;
                        break;
                    }
                } catch (Error) {
                    var temp = oldid;
                    oldid = change.revid;
                    change.revid = "";
                }
                console.log(mw.config.get("wgScriptPath") + "/index.php?oldid=" + oldid + "&diff=" + change.revid);
                var scriptpath = mw.config.get('wgScriptPath');
                var loadurl = mw.config.get("wgScriptPath") + "/index.php?oldid=" + oldid + (change.revid ? "&diff=" + change.revid : "");
                if (location.href.split(".").includes("m")) {
                    loadurl = mw.config.get("wgArticlePath").replace("$1", "Special:MobileDiff/" + oldid + (change.revid ? "..." + change.revid : ""));
                }
                $.get(loadurl, {
                    safemode: "1",
                    uselang: mw.config.get("wgUserLanguage"),
                    useskin: mw.config.get("skin"),
                    useskinversion: "2"
                }).done(function (result) {
                    var contenttextlocation;
                    switch (mw.config.get("skin")) {
                        case "timeless": contenttextlocation = '#mw-wrapper';
                            break;
                        case "vector": contenttextlocation = "#content, .mw-page-container";
                            break;
                        case "monobook": contenttextlocation = "#globalWrapper";
                            break;
                        case "minerva": contenttextlocation = "#mw-mf-viewport"
                            break;
                        case "modern": contenttextlocation = "#mw_main";
                            break;
                    }
                    var $r = $(result);
                    $("#rcpatroldiff").html($r);
                    $("#rcpatroldiff").find(contenttextlocation).html($("#rcpatroldiff").find("#mw-content-text").html());

                    $("#firstHeading, #section_0").html('Tuần tra thay đổi gần đây \"<a target=\"_blank\" href=\"' + scriptpath + '/index.php?title=' + change.title + '\">' + change.title + "</a>\"");
                    $("title").text("Tuần tra thay đổi gần đây \"" + change.title + "\" - " + mw.config.get("wgSiteName"));

                    $("#rcpatroldiff").fadeIn();
                    $("#rcpatroladmintools").fadeIn();
                    $("#rcpatrolpagetools").fadeIn();
                    rcpatrol.rcpatrolbox.setValue("");
                    rcpatrol.rcpatrolbutton.setLabel("Lùi sửa");
                    rcpatrol.setDisabled(false);
                    $("#rcpatroladmintools").html('');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=delete">Xoá</a>');
                    $("#rcpatroladmintools").append(' &bull; ');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=protect">Khoá</a>');
                    $("#rcpatroladmintools").append(' &bull; ');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=Special:Block/' + change.user + '">Cấm</a>');
                    $("#rcpatrolpagetools").html('');
                    $("#rcpatrolpagetools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=history">Xem lịch sử trang</a>');
                    $("#rcpatrolpagetools").append(' &bull; ');
                    $("#rcpatrolpagetools").append('<a target="_blank" href="' + scriptpath + '/index.php?oldid=' + oldid + '&diff=' + change.revid + '">Xem khác biệt</a>');
                }).fail(function () {
                    $("#rcpatroldiff").fadeIn(1000);
                    $("#rcpatroldiff").text("Không thể tải bản khác biệt. Xin vui lòng kiểm tra kết nối Internet của bạn. Bản khác biệt sẽ tự động tải lại khi kết nối Internet được thiết lập.");
                    window.setTimeout(function () {
                        rcpatrol.loadChange(change);
                    }, 1000);
                });
                /*
                $("#rcpatroldiff").load(loadurl, function (response, status, xhr) {
                    if (status == "error") {
                    } else {
                        $("#rcpatroldiff").find("form").hide();
                        $("#rcpatroldiff").find("#firstHeading").hide();
                    }
                });
                */
            }).fail(function (result) {
                $("#rcpatroldiff").fadeIn(1000);
                $("#rcpatroldiff").text("Không thể tải bản khác biệt. Xin vui lòng kiểm tra kết nối Internet của bạn. Bản khác biệt sẽ tự động tải lại khi kết nối Internet được thiết lập.");
                window.setTimeout(function () {
                    rcpatrol.loadChange(change)
                }, 1000);
            });
        }).fail(function (result) {
            $("#rcpatroldiff").fadeIn(1000);
            $("#rcpatroldiff").text("Không thể tải bản khác biệt. Xin vui lòng kiểm tra kết nối Internet của bạn. Bản khác biệt sẽ tự động tải lại khi kết nối Internet được thiết lập.");
            window.setTimeout(function () {
                rcpatrol.loadChange(change)
            }, 1000);
        });
    };
