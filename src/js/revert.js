    /**
     * Lùi lại sửa đổi trong bản khác biệt
     * @param {*} trang để lùi lại các sửa đổi 
     * @param {*} thành viên để lùi sửa 
     * @param {*} sau khi thành công phải làm gì sau khi lùi sửa thành công
     * @param {*} sau khi thất bại phải làm gì nếu lùi sửa không thành công
     */
    rcpatrol.revert = function (page, user, afterSuccess, afterFail) {
        if (!rcpatrol.rcpatrolbutton.isDisabled()) {
            var summary = rcpatrol.rcpatrolbox.getValue();
            rcpatrol.rcpatrolbutton.setLabel("Đang lùi sửa...");
            rcpatrol.setDisabled(true);
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "query",
                "format": "json",
                "meta": "tokens",
                "type": "rollback"
            }).done(function (result) {
                if (result.error) {
                    rcpatrol.rcpatrolbutton.setLabel("Lùi sửa thất bại");
                    alert(result.error.info);
                    afterFail();
                } else {
                    $.post(mw.config.get("wgScriptPath") + "/api.php", {
                        "action": "rollback",
                        "format": "json",
                        "title": page,
                        "token": result.query.tokens.rollbacktoken,
                        "user": user,
                        "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] đã lùi lại sửa đổi của [[Special:Contributions/$2|$2]] ([[User_talk:$2|Talk]]); quay trở về phiên bản cuối của [[Special:Contributions/$1|$1]]" + (summary ? ": " + summary : "")
                    }).done(function (result) {
                        if (result.error) {
                            rcpatrol.rcpatrolbutton.setLabel("Lùi sửa thất bại");
                            alert(result.error.info);
                            afterFail();
                        } else {
                            rcpatrol.rcpatrolbutton.setLabel("Lùi sửa thành công");
                            afterSuccess();
                        }
                    }).fail(function () {
                        console.log(result);
                        alert("Lost connection.");
                        rcpatrol.rcpatrolbutton.setLabel("Lùi sửa thất bại");
                        afterFail();
                    });
                }
            });
        }
    };
