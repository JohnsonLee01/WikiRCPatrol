    /**
     * Cảnh báo thành viên bằng bản mẫu cảnh báo cụ thể
     * @param {*} thành viên để cảnh báo
     * @param {*} tạo tiền tố của bản mẫu để sử dụng làm cảnh báo
     * @param {*} trang liên quan
     */
    rcpatrol.warn = function (user, template, page) {
        var date = new Date();
        var months = mw.config.get("wgMonthNames");
        var currentMonth = months[date.getUTCMonth() + 1];
        var year = date.getUTCFullYear();
        var header = currentMonth + " " + year;
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "meta": "tokens",
            "type": "csrf",
            "uselang": mw.config.get("wgUserLanguage")
        }).done(function (result) {
            var token = result.query.tokens.csrftoken;
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "parse",
                "format": "json",
                "prop": "text",
                "page": "User_talk:" + user,
                "uselang": mw.config.get("wgUserLanguage")
            }).done(function (result) {
                if (result.error) {
                    if (result.error.code == "missingtitle") {
                        $.post(mw.config.get("wgScriptPath") + "/api.php", {
                            "action": "edit",
                            "section": "new",
                            "sectiontitle": header,
                            "format": "json",
                            "title": "User_talk:" + user,
                            "text": "{{subst:" + template + "1|1=" + page + "}} ~~" + "~~",
                            "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] gửi cảnh báo tới " + user + " về [[" + page + "]]",
                            "token": token,
                            "uselang": mw.config.get("wgUserLanguage")
                        }).done(function (result) {
                            if (result.error) {
                                mw.notify("Chúng tôi không thể gửi cảnh báo tới " + user + ".");
                            } else {
                                mw.notify("Một cảnh báo đã được tự động gửi đến " + user + ".");
                            }
                        });
                    }
                } else {
                    var section = "new";
                    $(result.parse.text["*"]).find(".mw-headline").each(function (i) {
                        if ($(this).text() == header) {
                            section = i + 1;
                        }
                    });
                    if (section == "new") {
                        $.post(mw.config.get("wgScriptPath") + "/api.php", {
                            "action": "edit",
                            "section": "new",
                            "sectiontitle": header,
                            "format": "json",
                            "title": "User_talk:" + user,
                            "text": "{{subst:" + template + "1|1=" + page + "}} ~~" + "~~",
                            "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] gửi cảnh báo tới " + user + " về [[" + page + "]]",
                            "token": token,
                            "uselang": mw.config.get("wgUserLanguage")
                        }).done(function (result) {
                            if (result.error) {
                                mw.notify("Chúng tôi không thể gửi cảnh báo tới " + user + ".");
                            } else {
                                mw.notify("Một cảnh báo đã được tự động gửi đến " + user + ".");
                            }
                        });
                    } else {
                        $.get(mw.config.get("wgScriptPath") + "/api.php", {
                            "action": "parse",
                            "section": section,
                            "format": "json",
                            "prop": "wikitext",
                            "page": "User_talk:" + user,
                            "uselang": mw.config.get("wgUserLanguage")
                        }).done(function (result) {
                            if (result.error) {
                                console.error(result.error.info);
                            } else {
                                console.log(result.parse.wikitext["*"]);
                                var warninglevelstrings = result.parse.wikitext["*"].match(/<!--( ){0,}Template:.*(1|2|3|4)(im)?( ){0,}-->/g);
                                console.log(warninglevelstrings);
                                var warninglevels = warninglevelstrings[warninglevelstrings.length - 1].match(/[(1|2|3|4)]/);
                                var warninglevel = parseInt(warninglevels[warninglevels.length - 1]) + 1;
                                var oldtimestamp = (new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - 86400000)).toISOString();
                                $.get(mw.config.get("wgScriptPath") + "/api.php", {
                                    "action": "query",
                                    "format": "json",
                                    "prop": "revisions",
                                    "titles": "User_talk:" + user,
                                    "rvsection": section,
                                    "rvend": oldtimestamp,
                                    "uselang": mw.config.get("wgUserLanguage")
                                }).done(function (result) {
                                    var revisions = [];
                                    try {
                                        for (var pageid in result.query.pages) {
                                            revisions = result.query.pages[pageid].revisions;
                                        }
                                    } catch (Error) {

                                    }
                                    if (revisions) {
                                        if (warninglevel > 4) {
                                            rcpatrol.report(user);
                                        } else {
                                            $.post(mw.config.get("wgScriptPath") + "/api.php", {
                                                "action": "edit",
                                                "section": section,
                                                "sectiontitle": header,
                                                "format": "json",
                                                "title": "User_talk:" + user,
                                                "appendtext": "\n\n{{subst:" + template + warninglevel + "|1=" + page + "}} ~~" + "~~",
                                                "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] gửi cảnh báo tới " + user + " về [[" + page + "]]",
                                                "token": token,
                                                "uselang": mw.config.get("wgUserLanguage")
                                            }).done(function (result) {
                                                if (result.error) {
                                                    mw.notify("Chúng tôi không thể gửi cảnh báo tới " + user + ".");
                                                } else {
                                                    mw.notify("Một cảnh báo đã được tự động gửi đến " + user + ".");
                                                }
                                            });
                                        }
                                    } else {
                                        $.post(mw.config.get("wgScriptPath") + "/api.php", {
                                            "action": "edit",
                                            "section": section,
                                            "sectiontitle": header,
                                            "format": "json",
                                            "title": "User_talk:" + user,
                                            "appendtext": "\n\n{{subst:" + template + "1|1=" + page + "}} ~~" + "~~",
                                            "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] gửi cảnh báo tới " + user + " về [[" + page + "]]",
                                            "token": token,
                                            "uselang": mw.config.get("wgUserLanguage")
                                        }).done(function (result) {
                                            if (result.error) {
                                                mw.notify("Chúng tôi không thể gửi cảnh báo tới " + user + ".");
                                            } else {
                                                mw.notify("Một cảnh báo đã được tự động gửi đến " + user + ".");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    };
