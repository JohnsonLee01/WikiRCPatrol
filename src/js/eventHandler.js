    /**
     * Xử lý các sự kiện toàn cục, bao gồm nhấp chuột, nhấn phím, v.v...
     */
    rcpatrol.fetchbutton.$element.click(rcpatrol.fetch);
    rcpatrol.rcpatrolbutton.$element.click(function (e) {
        rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
            rcpatrol.currentChange++;
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        },
            function () {
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            });
    });
    rcpatrol.nexteditbutton.$element.click(function (e) {
        if (!rcpatrol.nexteditbutton.isDisabled()) {
            e.preventDefault();
            rcpatrol.currentChange++;
            if (rcpatrol.currentChange >= rcpatrol.changes.length) {
                mw.notify("Đã đến cuối danh sách. Đang tải các danh sách tiếp theo...")
                rcpatrol.fetch();
            } else {
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            }
        }
    });
    rcpatrol.previouseditbutton.$element.click(function (e) {
        if (!rcpatrol.previouseditbutton.isDisabled()) {
            e.preventDefault();
            rcpatrol.currentChange--;
            if (rcpatrol.currentChange < 0) {
                rcpatrol.currentChange = 0;
            }
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        }
    });
    rcpatrol.thankbutton.$element.click(function (e) {
        if (!rcpatrol.thankbutton.isDisabled()) {
            e.preventDefault();
            rcpatrol.thankbutton.setDisabled(true);
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "query",
                "format": "json",
                "meta": "tokens",
                "type": "csrf"
            }).done(function (result) {
                $.post(mw.config.get("wgScriptPath") + "/api.php", {
                    "action": "thank",
                    "format": "json",
                    "rev": rcpatrol.changes[rcpatrol.currentChange].revid,
                    "token": result.query.tokens.csrftoken
                }).done(function (result) {
                    if (result.error) {
                        alert(result.error.info);
                    } else {
                        mw.notify("Đã gửi lời cảm ơn!");
                    }
                })
            })
        }
    })
    rcpatrol.rcpatrolbox.$element.keypress(function (e) {

        if (e.which == 13) {
            rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
                rcpatrol.currentChange++;
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            },
                function () {
                    rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                });
        }
    });

    rcpatrol.dropdownmenu.getMenu().on('select', function () {
        var val = rcpatrol.dropdownmenu.getLabel();
        for (var option of rcpatrol.dropdown) {
            if (option.val == val) {
                rcpatrol.rcpatrolbox.setValue(option.summary);
                rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
                    rcpatrol.warn(rcpatrol.changes[rcpatrol.currentChange].user, option.template, rcpatrol.changes[rcpatrol.currentChange].title);
                    rcpatrol.currentChange++;
                    rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                    rcpatrol.dropdownmenu.getMenu().unselectItem();
                    rcpatrol.dropdownmenu.setLabel("Lùi sửa và cảnh báo...");
                }, function () {
                    rcpatrol.dropdownmenu.getMenu().unselectItem();
                    rcpatrol.dropdownmenu.setLabel("Lùi sửa và cảnh báo...");
                    rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                });
                break;
            } else {
                continue;
            }
        }
    });
